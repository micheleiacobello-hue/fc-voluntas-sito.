import type { Metadata } from 'next'
import { SITE_URL, getSettings } from '@/lib/content'
import PageHero from '@/components/PageHero'
import ContactForm from '@/components/ContactForm'
import { IconClock, IconMail, IconPhone, IconPin } from '@/components/icons'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Contatta il F.C. Voluntas: indirizzo, telefono, email, mappa e form di contatto per la segreteria.',
  alternates: { canonical: '/contatti' },
}

export default async function Contatti() {
  const s = await getSettings()
  const dLng = 0.02, dLat = 0.012
  const map = `https://www.openstreetmap.org/export/embed.html?bbox=${s.lng - dLng}%2C${s.lat - dLat}%2C${s.lng + dLng}%2C${s.lat + dLat}&layer=mapnik&marker=${s.lat}%2C${s.lng}`
  const ld = { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contatti F.C. Voluntas', url: `${SITE_URL}/contatti` }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero title="Contatti" lead="Scrivici o vieni a trovarci: la segreteria è a tua disposizione." crumbs={[{ label: 'Contatti' }]} eyebrow="Parliamone" />
      <section className="section">
        <div className="wrap contact-grid">
          <div className="reveal">
            <div className="eyebrow">La società</div>
            <h2 className="section-title">F.C. Voluntas A.S.D.</h2>
            <div className="info-list">
              <div className="info-item"><span className="ico"><IconPin /></span><div><h3>Indirizzo</h3><p>{s.address}<br />{s.postalCode} {s.city} ({s.province})</p></div></div>
              <div className="info-item"><span className="ico"><IconPhone /></span><div><h3>Telefono</h3><a href={`tel:${s.phone.replace(/[^+\d]/g, '')}`}>{s.phone}</a></div></div>
              <div className="info-item"><span className="ico"><IconMail /></span><div><h3>Email</h3><a href={`mailto:${s.email}`}>{s.email}</a></div></div>
              <div className="info-item"><span className="ico"><IconClock /></span><div><h3>Segreteria</h3><p>{s.hours}</p></div></div>
            </div>
            <div className="map-frame"><iframe title="Mappa con la sede del F.C. Voluntas" src={map} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
