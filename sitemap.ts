import type { MetadataRoute } from 'next'
import { SITE_URL, getPosts } from '@/lib/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ['', '/news', '/prima-squadra', '/settore-giovanile', '/staff', '/organigramma', '/sponsor', '/contatti', '/privacy']
  const posts = await getPosts()
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.7 })),
    ...posts.map((p) => ({ url: `${SITE_URL}/news/${p.slug}`, lastModified: new Date(p.date), priority: 0.6 })),
  ]
}
