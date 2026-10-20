export type PortableBlock = Record<string, unknown>

export type Post = {
  slug: string; title: string; tag: string; date: string; excerpt: string
  image?: string; imageAlt?: string; imageW?: number; imageH?: number
  body: PortableBlock[]
}
export type Player = { name: string; number: number; role: 'Portiere' | 'Difensore' | 'Centrocampista' | 'Attaccante'; photo?: string }
export type Staff = { name: string; role: string; photo?: string }
export type OrgGroup = 'presidenza' | 'direttori' | 'segreteria' | 'consiglieri' | 'collaboratori'
export type OrgMember = { name: string; role: string; group: OrgGroup }
export type Sponsor = { name: string; tier: 'principale' | 'partner'; description?: string; url?: string; logo?: string }
export type Match = { date: string; opponent: string; home: boolean; competition?: string; goalsFor?: number; goalsAgainst?: number }
export type Settings = {
  foundedYear: string; statAthletes: string; statCategories: string; statLeague: string
  address: string; postalCode: string; city: string; province: string
  phone: string; email: string; hours: string
  lat: number; lng: number
  instagram?: string; facebook?: string; youtube?: string
}
