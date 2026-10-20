import Link from 'next/link'
import type { Settings } from '@/lib/types'
import { IconFacebook, IconInstagram, IconYoutube } from './icons'

export default function Footer({ s }: { s: Settings }) {
  const social = [
    { href: s.instagram, label: 'Instagram', icon: <IconInstagram /> },
    { href: s.facebook, label: 'Facebook', icon: <IconFacebook /> },
    { href: s.youtube, label: 'YouTube', icon: <IconYoutube /> },
  ].filter((x) => x.href)
  const tel = s.phone.replace(/[^+\d]/g, '')
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <Link className="brand" href="/" aria-label="F.C. Voluntas">
              <span className="crest"><img src="/img/logo-96.png" width={96} height={96} alt="" loading="lazy" /></span>
              <span className="brand-name">F.C. Voluntas</span>
            </Link>
            <p>Società calcistica dilettantistica. Prima squadra e settore giovanile, uniti da un unico progetto sportivo ed educativo.</p>
            {social.length > 0 && (
              <div className="social-row">
                {social.map((x) => <a key={x.label} href={x.href} aria-label={x.label} target="_blank" rel="noopener noreferrer">{x.icon}</a>)}
              </div>
            )}
          </div>
          <div className="footer-col">
            <h4>Il Club</h4>
            <ul>
              <li><Link href="/#chi-siamo">Chi siamo</Link></li>
              <li><Link href="/organigramma">Organigramma</Link></li>
              <li><Link href="/staff">Staff tecnico</Link></li>
              <li><Link href="/sponsor">Sponsor</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Calcio</h4>
            <ul>
              <li><Link href="/prima-squadra">Prima Squadra</Link></li>
              <li><Link href="/settore-giovanile">Settore Giovanile</Link></li>
              <li><Link href="/news">News</Link></li>
              <li><Link href="/contatti">Contatti</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contatti</h4>
            <ul>
              <li>{s.address}<br />{s.postalCode} {s.city} ({s.province})</li>
              <li><a href={`tel:${tel}`}>{s.phone}</a></li>
              <li><a href={`mailto:${s.email}`}>{s.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} F.C. Voluntas A.S.D. — Tutti i diritti riservati</span>
          <span><Link href="/privacy">Privacy</Link></span>
        </div>
      </div>
    </footer>
  )
}
