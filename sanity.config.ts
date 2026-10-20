import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

// Se le variabili non sono ancora impostate, il sito funziona comunque con i contenuti di esempio
// e la pagina /studio mostra le istruzioni di configurazione.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'unconfigured'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'F.C. Voluntas — Gestione sito',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
})
