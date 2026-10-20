import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, getPosts, getSettings, getSponsors } from '@/lib/content'
import NewsCard from '@/components/NewsCard'
import SponsorStrip from '@/components/SponsorStrip'
import { IconBoard, IconHeart, IconShield, IconUsers } from '@/components/icons'

export const revalidate = 60
export const metadata: Metadata = {
  title: { absolute: 'F.C. Voluntas — Società calcistica dilettantistica' },
  alternates: { canonical: '/' },
}

export default async function Home() {
  const [s, posts, sponsors] = await Promise.all([getSettings(), getPosts(), getSponsors()])
  const ld = {
    '@context': 'https://schema.org', '@type': 'SportsClub', name: 'F.C. Voluntas', sport: 'Calcio',
    url: SITE_URL, logo: `${SITE_URL}/img/logo-240.png`,
    address: { '@type': 'PostalAddress', streetAddress: s.address, addressLocality: s.city, postalCode: s.postalCode, addressCountry: 'IT' },
    telephone: s.phone, email: s.email,
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="hero" id="home">
        <img className="hero-bg" src="/img/hero-camp.jpg" width={1920} height={1280} alt="Ragazzi del settore giovanile F.C. Voluntas sorridenti a bordo campo" fetchPriority="high" />
        <div className="hero-overlay" />
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <div className="eyebrow">Stagione 2026 / 2027</div>
            <h1>Una maglia,<br />una <span className="accent">comunità</span>.</h1>
            <p className="lead">F.C. Voluntas è la casa di chi vive il calcio come valore prima ancora che come risultato: prima squadra, settore giovanile e una società costruita su fiducia e appartenenza.</p>
            <div className="hero-ctas">
              <a href="#chi-siamo" className="btn btn-primary">Scopri la società</a>
              <Link href="/prima-squadra" className="btn btn-ghost">Prima squadra</Link>
            </div>
          </div>
        </div>
        <div className="hero-seal">
          <div className="seal-ring"><div className="seal-crest"><img src="/img/logo-96.png" width={96} height={96} alt="Stemma F.C. Voluntas" /></div></div>
          {s.foundedYear && <span className="seal-label">Dal {s.foundedYear}</span>}
        </div>
        <div className="scroll-cue" aria-hidden="true"><span>SCOPRI</span><span className="line" /></div>
      </section>

      <section className="scoreboard" aria-label="La società in numeri">
        <div className="scoreboard-grid">
          <div className="stat"><div className="num">{s.statAthletes}</div><div className="lbl">Atleti tesserati</div></div>
          <div className="stat"><div className="num">{s.statCategories}</div><div className="lbl">Categorie giovanili</div></div>
          <div className="stat"><div className="num">{s.foundedYear}</div><div className="lbl">Anno di fondazione</div></div>
          <div className="stat"><div className="num">{s.statLeague}</div><div className="lbl">Categoria</div></div>
        </div>
      </section>

      <section className="section" id="chi-siamo">
        <div className="wrap two-col">
          <div className="copy reveal">
            <div className="eyebrow">Chi siamo</div>
            <h2 className="section-title">Radici solide, ambizione condivisa.</h2>
            <p className="lead-strong">Una società dilettantistica che unisce prima squadra e vivaio sotto un unico progetto sportivo ed educativo.</p>
            <p>F.C. Voluntas nasce dall’incontro di più generazioni di calcio locale, con l’obiettivo di offrire un percorso serio e accessibile a chiunque voglia vivere lo sport, dal settore giovanile fino alla prima squadra.</p>
            <p>Ogni categoria, ogni allenatore e ogni dirigente lavora secondo gli stessi principi: rispetto, crescita personale e senso di appartenenza al club.</p>
            <Link href="/organigramma" className="btn btn-outline" style={{ marginTop: 8 }}>Scopri l’organigramma</Link>
          </div>
          <div className="photo-frame reveal">
            <img src="/img/partita-campo.jpg" width={1600} height={1067} alt="Giocatore del F.C. Voluntas in campo durante una partita" loading="lazy" />
            <span className="stamp"><img src="/img/logo-96.png" width={96} height={96} alt="Stemma F.C. Voluntas" loading="lazy" /></span>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section" id="news">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Dal club</div>
            <h2 className="section-title">Ultime news</h2>
            <p>Risultati, comunicati e vita di società.</p>
          </div>
          <div className="news-grid">{posts.slice(0, 3).map((p) => <NewsCard key={p.slug} post={p} />)}</div>
          <div className="section-foot reveal"><Link href="/news" className="btn btn-outline">Vedi tutte le news</Link></div>
        </div>
      </section>

      <section className="dark-band" style={{ padding: '100px 0 0' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow" style={{ color: '#ff6b7f' }}>Naviga il club</div>
            <h2 className="section-title">Tutto a portata di due click.</h2>
            <p>Prima squadra, staff, settore giovanile e organigramma: ogni area della società, semplice da trovare.</p>
          </div>
        </div>
        <div className="explore-grid">
          <Link className="explore-item" href="/prima-squadra"><IconUsers /><h3>Prima Squadra</h3><p>Rosa completa, ruoli, numeri di maglia e calendario.</p><span className="go">Vai alla rosa →</span></Link>
          <Link className="explore-item" href="/staff"><IconBoard /><h3>Staff Tecnico</h3><p>Allenatori, preparatori e collaboratori.</p><span className="go">Scopri lo staff →</span></Link>
          <Link className="explore-item" href="/organigramma"><IconShield /><h3>Organigramma</h3><p>Presidenza, direttivo, segreteria e consiglieri.</p><span className="go">Vedi la struttura →</span></Link>
          <Link className="explore-item" href="/settore-giovanile"><IconHeart /><h3>Settore Giovanile</h3><p>Il vivaio Voluntas: categorie, attività e crescita.</p><span className="go">Scopri il vivaio →</span></Link>
        </div>
      </section>

      <SponsorStrip sponsors={sponsors} />
    </>
  )
}
