import Link from 'next/link'
import './styles'
import SiteShell from '@/components/SiteShell'
import PageHero from '@/components/PageHero'

export const metadata = { title: 'Pagina non trovata' }

export default function NotFound() {
  return (
    <SiteShell>
      <PageHero title="Pagina non trovata" lead="Il link potrebbe essere errato o la pagina spostata." eyebrow="Errore 404" />
      <section className="section"><div className="wrap"><Link className="btn btn-primary" href="/">Torna alla home</Link></div></section>
    </SiteShell>
  )
}
