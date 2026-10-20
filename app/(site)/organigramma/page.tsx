import type { Metadata } from 'next'
import { getOrg } from '@/lib/content'
import type { OrgGroup } from '@/lib/types'
import PageHero from '@/components/PageHero'
import CtaBand from '@/components/CtaBand'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Organigramma',
  description: 'L’organigramma del F.C. Voluntas: presidente, vicepresidente, direttori, segreteria, consiglieri e collaboratori.',
  alternates: { canonical: '/organigramma' },
}

const GROUPS: { key: OrgGroup; title: string; cls: string; lead?: boolean }[] = [
  { key: 'presidenza', title: 'Presidenza', cls: 'two', lead: true },
  { key: 'direttori', title: 'Direttori', cls: 'three' },
  { key: 'segreteria', title: 'Segreteria', cls: 'three' },
  { key: 'consiglieri', title: 'Consiglieri', cls: '' },
  { key: 'collaboratori', title: 'Collaboratori', cls: '' },
]

export default async function Organigramma() {
  const org = await getOrg()
  return (
    <>
      <PageHero title="Organigramma" lead="La struttura societaria: chi guida, organizza e rende possibile ogni giorno la vita del club." crumbs={[{ label: 'Il Club' }, { label: 'Organigramma' }]} eyebrow="Il Club" />
      <section className="section">
        <div className="wrap">
          {GROUPS.map((g) => {
            const members = org.filter((m) => m.group === g.key)
            if (!members.length) return null
            return (
              <div className="org-group" key={g.key}>
                <h2 className="tier-title">{g.title}</h2>
                <div className={`people-grid ${g.cls}`.trim()}>
                  {members.map((m, i) => (
                    <div className={`org-card${g.lead ? ' lead' : ''} reveal`} key={`${m.name}-${m.role}-${i}`}>
                      <h3>{m.name}</h3><span className="role">{m.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
      <CtaBand />
    </>
  )
}
