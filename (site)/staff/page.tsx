import type { Metadata } from 'next'
import { getStaff, img } from '@/lib/content'
import PageHero from '@/components/PageHero'
import CtaBand from '@/components/CtaBand'
import Silhouette from '@/components/Silhouette'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Staff tecnico',
  description: 'Lo staff tecnico del F.C. Voluntas: allenatori, preparatori e collaboratori che seguono la prima squadra.',
  alternates: { canonical: '/staff' },
}

export default async function StaffPage() {
  const staff = await getStaff()
  return (
    <>
      <PageHero title="Staff tecnico" lead="Competenza, passione e dedizione: le persone che guidano la squadra ogni giorno." crumbs={[{ label: 'Il Club' }, { label: 'Staff tecnico' }]} bg="/img/camp-coppia-dx.jpg" bgSize={[800, 810]} eyebrow="Il Club" />
      <section className="section">
        <div className="wrap">
          <div className="people-grid">
            {staff.map((p, i) => (
              <article className="person reveal" key={`${p.name}-${i}`}>
                <div className="person-photo">{p.photo ? <img src={img(p.photo, 600)} alt={p.name} loading="lazy" /> : <Silhouette />}</div>
                <div className="person-info"><h3>{p.name}</h3><span className="role">{p.role}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
