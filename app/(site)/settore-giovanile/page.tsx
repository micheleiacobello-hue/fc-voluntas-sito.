import type { Metadata } from 'next'
import Link from 'next/link'
import {} from '@/lib/content'
import PageHero from '@/components/PageHero'
import CtaBand from '@/components/CtaBand'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Settore Giovanile',
  description: 'Il vivaio del F.C. Voluntas: categorie dai Piccoli Amici agli Juniores, attività e Football Camp estivo.',
  alternates: { canonical: '/settore-giovanile' },
  openGraph: { images: ['/img/camp-gruppo.jpg'] },
}

// Le categorie cambiano raramente: si modificano qui. (Fasce d'età da confermare con la società.)
const CATS = [
  ['5 – 7 anni', 'Piccoli Amici', 'Il primo contatto con il pallone: gioco, coordinazione e tanto divertimento.'],
  ['8 anni', 'Primi Calci', 'Si impara a stare in gruppo e a divertirsi con il calcio in piccoli spazi.'],
  ['9 – 10 anni', 'Pulcini', 'Prime partite e primi fondamentali tecnici, sempre con il sorriso.'],
  ['11 – 12 anni', 'Esordienti', 'Cresce l’attenzione alla tecnica e alla comprensione del gioco.'],
  ['13 – 14 anni', 'Giovanissimi', 'Tattica, ritmo e responsabilità: il calcio si fa più strutturato.'],
  ['15 – 16 anni', 'Allievi', 'Un percorso competitivo che prepara al salto verso il calcio dei grandi.'],
  ['17 – 18 anni', 'Juniores', 'Il ponte verso la prima squadra, tra impegno e ambizione.'],
  ['Estate', 'Football Camp', 'Una settimana di sport, amicizia e crescita, aperta a tutti i ragazzi.'],
]

export default function SettoreGiovanile() {
  return (
    <>
      <PageHero title="Settore Giovanile" lead="Il vivaio Voluntas: un percorso di crescita sportiva e umana per bambini e ragazzi." crumbs={[{ label: 'Settore Giovanile' }]} bg="/img/hero-camp.jpg" bgSize={[1920, 1280]} eyebrow="Il vivaio" />

      <section className="section">
        <div className="wrap two-col">
          <div className="copy reveal">
            <div className="eyebrow">Presentazione</div>
            <h2 className="section-title">Dove il calcio comincia a diventare passione.</h2>
            <p className="lead-strong">Il settore giovanile è il cuore del progetto F.C. Voluntas.</p>
            <p>Accogliamo bambini e ragazzi di ogni livello con un obiettivo semplice: farli crescere divertendosi, imparando il valore del gruppo, del rispetto e dell’impegno.</p>
            <p>Istruttori qualificati e dirigenti attenti accompagnano ogni categoria, mettendo la persona prima del risultato.</p>
            <Link href="/contatti" className="btn btn-primary" style={{ marginTop: 8 }}>Richiedi informazioni</Link>
          </div>
          <div className="photo-frame portrait reveal">
            <img src="/img/partita-ritratto.jpg" width={900} height={1372} alt="Giovane giocatore del F.C. Voluntas in campo con la maglia rossoblù" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Le categorie</div>
            <h2 className="section-title">Un percorso per ogni età</h2>
            <p>Dai primi calci al pallone fino alla soglia della prima squadra.</p>
          </div>
          <div className="cat-grid">
            {CATS.map(([age, name, desc]) => (
              <article className="cat reveal" key={name}><span className="age">{age}</span><h3>{name}</h3><p>{desc}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-band">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow" style={{ color: '#ff6b7f' }}>Le attività</div>
            <h2 className="section-title">Allenarsi, giocare, crescere</h2>
          </div>
          <div className="activities">
            <div className="activity reveal"><h3>Allenamenti</h3><p>Sedute settimanali guidate da istruttori qualificati, con programmi adatti a ogni fascia d’età e livello.</p></div>
            <div className="activity reveal"><h3>Partite e tornei</h3><p>Campionati, amichevoli e tornei per mettersi alla prova e vivere il calcio in un clima sano e leale.</p></div>
            <div className="activity reveal"><h3>Football Camp</h3><p>Una settimana estiva di sport e amicizia, con giochi, allenamenti e la maglia ufficiale del camp.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal"><div className="eyebrow">Gallery</div><h2 className="section-title">Momenti Voluntas</h2></div>
          <div className="gallery reveal">
            <figure className="tall"><img src="/img/camp-coppia-sx.jpg" width={800} height={970} alt="Due ragazzi del camp abbracciati, con la maglietta Voluntas Football Camp" loading="lazy" /></figure>
            <figure><img src="/img/camp-gruppo.jpg" width={1200} height={675} alt="Quattro ragazzi del settore giovanile sorridenti a bordo campo" loading="lazy" /></figure>
            <figure><img src="/img/camp-coppia-dx.jpg" width={800} height={810} alt="Ragazzi del Voluntas Football Camp abbracciati" loading="lazy" /></figure>
            <figure><img src="/img/partita-campo.jpg" width={1600} height={1067} alt="Un giovane giocatore del Voluntas in campo durante una partita" loading="lazy" /></figure>
            <figure><img src="/img/partita-ritratto.jpg" width={900} height={1372} alt="Ritratto di un giocatore del settore giovanile F.C. Voluntas" loading="lazy" style={{ objectPosition: 'center 25%' }} /></figure>
          </div>
        </div>
      </section>

      <CtaBand title="Tuo figlio vuole giocare con noi?" text="Contatta la segreteria per una prova gratuita e per conoscere gli orari di allenamento di ogni categoria." />
    </>
  )
}
