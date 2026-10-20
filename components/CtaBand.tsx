import Link from 'next/link'

export default function CtaBand({
  title = 'Vuoi far parte della famiglia Voluntas?',
  text = 'Scrivici: la segreteria ti risponde con tutte le informazioni su squadre, iscrizioni e attività.',
}: { title?: string; text?: string }) {
  return (
    <section className="section-tight dark-band">
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 620 }}>
          <h2 className="section-title" style={{ marginBottom: 8 }}>{title}</h2>
          <p style={{ color: 'rgba(255,255,255,.65)' }}>{text}</p>
        </div>
        <Link className="btn btn-primary" href="/contatti">Contattaci</Link>
      </div>
    </section>
  )
}
