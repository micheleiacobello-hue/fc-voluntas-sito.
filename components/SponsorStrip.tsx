import Link from 'next/link'
import { img } from '@/lib/content'
import type { Sponsor } from '@/lib/types'

export default function SponsorStrip({ sponsors }: { sponsors: Sponsor[] }) {
  const list = sponsors.slice(0, 5)
  return (
    <section className="section" id="sponsor">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Partner</div>
          <h2 className="section-title">I nostri sponsor</h2>
          <p>Le aziende che sostengono il progetto sportivo ed educativo di F.C. Voluntas.</p>
        </div>
        <div className="sponsor-grid reveal">
          {list.map((s) => (
            <div className="sponsor-box" key={s.name}>
              {s.logo ? <img src={img(s.logo, 400)} alt={s.name} loading="lazy" /> : s.name}
            </div>
          ))}
        </div>
        <div className="sponsor-cta reveal">
          <div><h3>Vuoi diventare sponsor?</h3><p>Sostieni il club e dai visibilità alla tua attività in tutte le categorie della società.</p></div>
          <Link href="/sponsor" className="btn btn-primary">Scopri come</Link>
        </div>
      </div>
    </section>
  )
}
