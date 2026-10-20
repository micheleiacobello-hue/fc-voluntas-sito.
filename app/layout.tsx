import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'F.C. Voluntas — Società calcistica dilettantistica', template: '%s — F.C. Voluntas' },
  description: 'Sito ufficiale del F.C. Voluntas: prima squadra, settore giovanile, news, staff e sponsor. Una maglia, una comunità.',
  openGraph: {
    type: 'website', locale: 'it_IT', siteName: 'F.C. Voluntas',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}
export const viewport: Viewport = { themeColor: '#0A0A0B' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}
