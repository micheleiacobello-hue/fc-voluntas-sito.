import { hasSanity } from '@/lib/content'
import Studio from './Studio'

export const dynamic = 'force-static'
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  if (!hasSanity) {
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 640, margin: '12vh auto', padding: 24, lineHeight: 1.6 }}>
        <h1>Sanity non è ancora collegato</h1>
        <p>Imposta le variabili d’ambiente <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> e <code>NEXT_PUBLIC_SANITY_DATASET</code> (su Vercel: Settings → Environment Variables) e rifai il deploy.</p>
        <p>Le istruzioni complete sono nel file <code>README.md</code> del progetto.</p>
      </div>
    )
  }
  return <Studio />
}
