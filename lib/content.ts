import { createClient } from 'next-sanity'
import {
  fallbackMatches, fallbackOrg, fallbackPlayers, fallbackPosts, fallbackSettings, fallbackSponsors, fallbackStaff,
} from './fallback'
import type { Match, OrgMember, Player, Post, Settings, Sponsor, Staff } from './types'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fcvoluntas.it').replace(/\/$/, '')
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const hasSanity = Boolean(projectId)
export const REVALIDATE = 60 // i contenuti modificati in Sanity compaiono sul sito entro ~1 minuto

const client = hasSanity
  ? createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: true, perspective: 'published' })
  : null

async function query<T>(groq: string, fallback: T, params: Record<string, unknown> = {}): Promise<T> {
  if (!client) return fallback
  try {
    const res = await client.fetch<T | null>(groq, params, { next: { revalidate: REVALIDATE } })
    if (res == null || (Array.isArray(res) && res.length === 0)) return fallback
    return res
  } catch (e) {
    console.error('Sanity fetch error', e)
    return fallback
  }
}

/** Ridimensiona/ottimizza le immagini ospitate su Sanity; lascia invariate quelle locali. */
export function img(url: string | undefined, width = 1200): string | undefined {
  if (!url) return undefined
  return url.includes('cdn.sanity.io') ? `${url}?w=${width}&auto=format&q=75` : url
}

const IMG = (f: string) => `"${f}": ${f}.asset->url`

export async function getSettings(): Promise<Settings> {
  const r = await query<Partial<Settings> & { mapLocation?: { lat: number; lng: number } } | null>(
    `*[_type=="siteSettings"][0]{foundedYear,statAthletes,statCategories,statLeague,address,postalCode,city,province,phone,email,hours,mapLocation,instagram,facebook,youtube}`,
    null,
  )
  if (!r) return fallbackSettings
  const { mapLocation, ...rest } = r
  const clean = Object.fromEntries(Object.entries(rest).filter(([, v]) => v != null && v !== ''))
  return { ...fallbackSettings, ...clean, lat: mapLocation?.lat ?? fallbackSettings.lat, lng: mapLocation?.lng ?? fallbackSettings.lng }
}

export async function getPosts(): Promise<Post[]> {
  return query<Post[]>(
    `*[_type=="post" && defined(slug.current)] | order(date desc){
      "slug": slug.current, title, "tag": coalesce(tag, "Società"), date, excerpt,
      "image": image.asset->url, "imageAlt": coalesce(image.alt, title),
      "imageW": image.asset->metadata.dimensions.width, "imageH": image.asset->metadata.dimensions.height,
      body[]{..., _type == "image" => { "url": asset->url }}
    }`,
    fallbackPosts,
  )
}
export async function getPost(slug: string): Promise<{ post: Post; prev?: Post; next?: Post } | null> {
  const posts = await getPosts()
  const i = posts.findIndex((p) => p.slug === slug)
  if (i < 0) return null
  return { post: posts[i], prev: posts[i - 1], next: posts[i + 1] }
}

const ROLE_ORDER = ['Portiere', 'Difensore', 'Centrocampista', 'Attaccante']
export async function getPlayers(): Promise<Player[]> {
  const list = await query<Player[]>(`*[_type=="player"] | order(number asc){name, number, role, ${IMG('photo')}}`, fallbackPlayers)
  return [...list].sort((a, b) => ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role) || a.number - b.number)
}
export async function getStaff(): Promise<Staff[]> {
  return query<Staff[]>(`*[_type=="staffMember"] | order(order asc, name asc){name, role, ${IMG('photo')}}`, fallbackStaff)
}
export async function getOrg(): Promise<OrgMember[]> {
  return query<OrgMember[]>(`*[_type=="orgMember"] | order(order asc, name asc){name, role, group}`, fallbackOrg)
}
export async function getSponsors(): Promise<Sponsor[]> {
  return query<Sponsor[]>(
    `*[_type=="sponsor"] | order(order asc, name asc){name, "tier": coalesce(tier, "partner"), description, url, ${IMG('logo')}}`,
    fallbackSponsors,
  )
}
export async function getMatches(): Promise<{ upcoming: Match[]; results: Match[] }> {
  const all = await query<Match[]>(
    `*[_type=="match"] | order(date asc){date, opponent, "home": coalesce(home, "casa") == "casa", competition, goalsFor, goalsAgainst}`,
    fallbackMatches,
  )
  const played = (m: Match) => m.goalsFor != null && m.goalsAgainst != null
  const upcoming = all.filter((m) => !played(m)).sort((a, b) => +new Date(a.date) - +new Date(b.date)).slice(0, 5)
  const results = all.filter(played).sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 5)
  return { upcoming, results }
}

// ---- formattazione date (fuso Europe/Rome) ----
const TZ = 'Europe/Rome'
export const fmtShort = (iso: string) => {
  const d = new Date(iso)
  const part = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('it-IT', { timeZone: TZ, ...o }).format(d)
  return `${part({ day: '2-digit' })} · ${part({ month: '2-digit' })} · ${part({ year: 'numeric' })}`
}
export const fmtLong = (iso: string) =>
  new Intl.DateTimeFormat('it-IT', { timeZone: TZ, day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
export const fmtMatchDay = (iso: string) =>
  new Intl.DateTimeFormat('it-IT', { timeZone: TZ, weekday: 'short', day: '2-digit', month: 'short' }).format(new Date(iso)).replace('.', '')
export const fmtTime = (iso: string) =>
  new Intl.DateTimeFormat('it-IT', { timeZone: TZ, hour: '2-digit', minute: '2-digit' }).format(new Date(iso))
