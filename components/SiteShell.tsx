import type { ReactNode } from 'react'
import { getSettings } from '@/lib/content'
import Header from './Header'
import Footer from './Footer'
import PageEffects from './PageEffects'

export default async function SiteShell({ children }: { children: ReactNode }) {
  const settings = await getSettings()
  return (
    <>
      <a className="skip-link" href="#contenuto">Vai al contenuto</a>
      <Header />
      <main id="contenuto">{children}</main>
      <Footer s={settings} />
      <PageEffects />
    </>
  )
}
