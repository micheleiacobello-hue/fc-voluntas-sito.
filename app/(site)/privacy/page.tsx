import type { Metadata } from 'next'
import { getSettings } from '@/lib/content'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = { title: 'Privacy', description: 'Informativa sulla privacy del sito del F.C. Voluntas.', alternates: { canonical: '/privacy' } }

// SEGNAPOSTO: far redigere l'informativa privacy definitiva (GDPR) prima della pubblicazione.
export default async function Privacy() {
  const s = await getSettings()
  return (
    <>
      <PageHero title="Privacy" lead="Informativa sul trattamento dei dati personali." crumbs={[{ label: 'Privacy' }]} eyebrow="Informativa" />
      <section className="section"><div className="wrap"><article className="article">
        <p>L’informativa sul trattamento dei dati personali è in fase di redazione e sarà pubblicata prima della messa online definitiva del sito.</p>
        <p>Per qualsiasi richiesta sui tuoi dati puoi scrivere a <a href={`mailto:${s.email}`} style={{ textDecoration: 'underline' }}>{s.email}</a>.</p>
      </article></div></section>
    </>
  )
}
