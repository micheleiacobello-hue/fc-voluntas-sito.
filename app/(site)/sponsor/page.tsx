import type { Metadata } from 'next'
import Link from 'next/link'
import { getSponsors, img } from '@/lib/content'
import PageHero from '@/components/PageHero'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Sponsor',
  description: 'Le aziende che sostengono il F.C. Voluntas. Scopri i nostri sponsor e come diventare partner della società.',
  alternates: { canonical: '/sponsor' },
}

export default async function SponsorPage() {
  const sponsors = await getSponsors()
  const main = sponsors.filter((s) => s.tier === 'principale')
  const partners = sponsors.filter((s) => s.tier !== 'principale')
  return (
    <>
      <PageHero title="Sponsor" lead="Grazie alle aziende che credono nel nostro progetto sportivo ed educativo." crumbs={[{ label: 'Il Club' }, { label: 'Sponsor' }]} eyebrow="Partner" />
      <section className="section">
        <div className="wrap">
          {main.length > 0 && (
            <div className="org-group">
              <h2 className="tier-title">Sponsor principali</h2>
              <div className="sponsor-list">
                {main.map((s) => (
                  <article className="sponsor-card reveal" key={s.name}>
                    <div className="logo-slot">{s.logo ? <img src={img(s.logo, 500)} alt={s.name} loading="lazy" /> : 'Logo sponsor'}</div>
                    <h3>{s.name}</h3>
                    {s.description && <p>{s.description}</p>}
                    {s.url && <a className="site-link" href={s.url} target="_blank" rel="noopener sponsored">Visita il sito →</a>}
                  </article>
                ))}
              </div>
            </div>
          )}
          {partners.length > 0 && (
            <div className="org-group">
              <h2 className="tier-title">Partner</h2>
              <div className="sponsor-grid reveal">
                {partners.map((s) =>
                  s.url ? (
                    <a className="sponsor-box" key={s.name} href={s.url} target="_blank" rel="noopener sponsored" title={s.name}>
                      {s.logo ? <img src={img(s.logo, 400)} alt={s.name} loading="lazy" /> : s.name}
                    </a>
                  ) : (
                    <div className="sponsor-box" key={s.name} title={s.name}>{s.logo ? <img src={img(s.logo, 400)} alt={s.name} loading="lazy" /> : s.name}</div>
                  ),
                )}
              </div>
            </div>
          )}
          <div className="sponsor-cta reveal">
            <div><h3>Vuoi diventare sponsor?</h3><p>Dai visibilità alla tua attività e sostieni lo sport nel tuo territorio. Contattaci per conoscere le formule di partnership.</p></div>
            <Link href="/contatti" className="btn btn-primary">Contattaci</Link>
          </div>
        </div>
      </section>
    </>
  )
}
