'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const MAIN = [
  { href: '/', label: 'Home' },
  { href: '/news', label: 'News' },
  { href: '/prima-squadra', label: 'Prima Squadra' },
  { href: '/settore-giovanile', label: 'Settore Giovanile' },
]
const CLUB = [
  { href: '/organigramma', label: 'Organigramma' },
  { href: '/staff', label: 'Staff tecnico' },
  { href: '/sponsor', label: 'Sponsor' },
]

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [dd, setDd] = useState(false)

  const is = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/'))
  const cur = (href: string) => (is(href) ? ('page' as const) : undefined)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { setMenu(false); setDd(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu(false); setDd(false) } }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [menu])
  useEffect(() => {
    if (!dd) return
    const close = () => setDd(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [dd])

  const clubCurrent = CLUB.some((l) => is(l.href))

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="nav">
          <Link className="brand" href="/" aria-label="F.C. Voluntas — Home">
            <span className="crest"><img src="/img/logo-96.png" width={96} height={96} alt="Stemma F.C. Voluntas" /></span>
            <span className="brand-name">F.C. Voluntas<small>Società calcistica dilettantistica</small></span>
          </Link>
          <nav className="nav-links" aria-label="Navigazione principale">
            {MAIN.map((l) => <Link key={l.href} href={l.href} aria-current={cur(l.href)}>{l.label}</Link>)}
            <div className={`dropdown${clubCurrent ? ' is-current' : ''}${dd ? ' open' : ''}`}>
              <button className="dd-btn" type="button" aria-expanded={dd} aria-haspopup="true"
                onClick={(e) => { e.stopPropagation(); setDd((v) => !v) }}>
                Il Club <span aria-hidden="true">▾</span>
              </button>
              <div className="dd-menu">
                {CLUB.map((l) => <Link key={l.href} href={l.href} aria-current={cur(l.href)}>{l.label}</Link>)}
              </div>
            </div>
            <Link className="nav-cta" href="/contatti" aria-current={cur('/contatti')}>Contatti</Link>
          </nav>
          <button className="burger" type="button" aria-label="Apri il menu" aria-expanded={menu} aria-controls="mobileMenu" onClick={() => setMenu(true)}>
            <span /><span /><span />
          </button>
        </div>
      </header>
      <div className={`menu-overlay${menu ? ' open' : ''}`} onClick={() => setMenu(false)} />
      <nav className={`mobile-menu${menu ? ' open' : ''}`} id="mobileMenu" aria-label="Menu mobile">
        <button className="close-menu" type="button" aria-label="Chiudi il menu" onClick={() => setMenu(false)}>&times;</button>
        {[...MAIN, ...CLUB, { href: '/contatti', label: 'Contatti' }].map((l) => (
          <Link key={l.href} href={l.href} aria-current={cur(l.href)}>{l.label}</Link>
        ))}
      </nav>
    </>
  )
}
