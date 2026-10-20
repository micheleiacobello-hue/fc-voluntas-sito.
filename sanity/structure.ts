import type { StructureResolver } from 'sanity/structure'

// "Dati della società" è un documento unico (non una lista).
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenuti')
    .items([
      S.listItem()
        .title('Dati della società')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('post').title('News'),
      S.documentTypeListItem('player').title('Giocatori'),
      S.documentTypeListItem('staffMember').title('Staff tecnico'),
      S.documentTypeListItem('orgMember').title('Organigramma'),
      S.documentTypeListItem('match').title('Partite'),
      S.documentTypeListItem('sponsor').title('Sponsor'),
    ])
