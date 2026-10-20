// Contenuti di esempio: vengono mostrati finché Sanity non è collegato
// (o finché una sezione non contiene ancora nulla). Dati NON reali.
import type { Match, OrgMember, Player, Post, Settings, Sponsor, Staff } from './types'

let k = 0
const key = () => `k${k++}`
const block = (text: string, style = 'normal') => ({
  _type: 'block', _key: key(), style, markDefs: [], children: [{ _type: 'span', _key: key(), text, marks: [] }],
})
const p = (t: string) => block(t)
const h = (t: string) => block(t, 'h2')
const q = (t: string) => block(t, 'blockquote')

export const fallbackSettings: Settings = {
  foundedYear: '1928', // DA CONFERMARE
  statAthletes: '600+', // DA CONFERMARE
  statCategories: '8', // DA CONFERMARE
  statLeague: '1ª', // DA CONFERMARE
  address: 'Via dello Stadio, 12', // ESEMPIO
  postalCode: '25100',
  city: 'Brescia',
  province: 'BS',
  phone: '+39 030 000 0000', // ESEMPIO
  email: 'info@fcvoluntas.it', // ESEMPIO
  hours: 'Lun – Ven, 17:00 – 19:30',
  lat: 45.5416,
  lng: 10.2118,
  instagram: '',
  facebook: '',
  youtube: '',
}

export const fallbackPosts: Post[] = [
  {
    slug: 'prima-squadra-tre-punti-pesanti', tag: 'Prima Squadra', date: '2026-10-18T12:00:00Z',
    title: 'Tre punti pesanti in trasferta',
    excerpt: 'La prima squadra conquista una vittoria importante e guarda con fiducia alla parte alta della classifica.',
    image: '/img/partita-campo.jpg', imageAlt: 'Giocatore del F.C. Voluntas in campo con la maglia rossoblù', imageW: 1600, imageH: 1067,
    body: [
      p('Una prestazione di carattere, costruita sulla compattezza del gruppo e sulla voglia di non mollare mai. La prima squadra del F.C. Voluntas porta a casa tre punti preziosi lontano dal proprio campo e dà continuità al lavoro svolto nelle ultime settimane.'),
      h('La partita'),
      p('Fin dai primi minuti la squadra ha mostrato ordine e determinazione, gestendo con intelligenza i momenti più delicati dell’incontro. Il risultato premia l’impegno di tutti: chi è sceso in campo dal primo minuto e chi ha dato il proprio contributo dalla panchina.'),
      q('Una maglia, una comunità.'),
      p('Un ringraziamento speciale va ai tifosi che hanno accompagnato la squadra anche in trasferta: il loro sostegno è parte integrante di questo gruppo.'),
    ],
  },
  {
    slug: 'open-day-settore-giovanile', tag: 'Settore Giovanile', date: '2026-10-02T12:00:00Z',
    title: 'Open day: porte aperte al vivaio Voluntas',
    excerpt: 'Prove gratuite per bambini e ragazzi che vogliono scoprire il calcio con i nostri istruttori.',
    image: '/img/camp-gruppo.jpg', imageAlt: 'Quattro ragazzi del settore giovanile F.C. Voluntas abbracciati a bordo campo', imageW: 1200, imageH: 675,
    body: [
      p('Il settore giovanile del F.C. Voluntas apre le porte a tutti i bambini e ragazzi che desiderano provare l’emozione di giocare a calcio in un ambiente sano, serio e accogliente.'),
      h('Come funziona'),
      p('Durante le giornate di prova i partecipanti si allenano insieme ai nostri istruttori, divisi per fasce d’età, con esercizi e partitelle pensati per divertirsi e imparare. Non serve alcuna esperienza precedente.'),
      p('Per informazioni sulle date e sulle modalità di iscrizione è possibile contattare la segreteria tramite la pagina Contatti.'),
    ],
  },
  {
    slug: 'voluntas-football-camp', tag: 'Settore Giovanile', date: '2026-09-05T12:00:00Z',
    title: 'Voluntas Football Camp: una settimana da ricordare',
    excerpt: 'Sport, amicizia e crescita: il camp estivo ha riempito il campo di entusiasmo e sorrisi.',
    image: '/img/camp-gruppo.jpg', imageAlt: 'Ragazzi del Voluntas Football Camp con la maglia ufficiale', imageW: 1200, imageH: 675,
    body: [
      p('Allenamenti, giochi e tanto divertimento: il Voluntas Football Camp ha accolto i ragazzi del vivaio per una settimana intensa, all’insegna dello sport e dello stare insieme.'),
      h('Più di un allenamento'),
      p('Oltre alla parte tecnica, il camp è stato un’occasione per creare nuove amicizie e rafforzare il senso di appartenenza alla società.'),
      p('Grazie a istruttori, volontari e famiglie che hanno reso possibile tutto questo. L’appuntamento è già fissato per la prossima edizione.'),
    ],
  },
]

const roster: [Player['role'], number[]][] = [
  ['Portiere', [1, 12, 22]],
  ['Difensore', [2, 3, 4, 5, 13, 15, 23]],
  ['Centrocampista', [6, 8, 10, 14, 16, 18, 20]],
  ['Attaccante', [7, 9, 11, 17, 19]],
]
export const fallbackPlayers: Player[] = roster.flatMap(([role, nums]) =>
  nums.map((number) => ({ name: 'Nome Cognome', number, role })),
)

export const fallbackStaff: Staff[] = [
  'Allenatore', 'Vice allenatore', 'Preparatore atletico', 'Allenatore dei portieri',
  'Dirigente accompagnatore', 'Team manager', 'Medico sociale', 'Fisioterapista',
].map((role) => ({ name: 'Nome Cognome', role }))

const o = (group: OrgMember['group'], roles: string[]): OrgMember[] => roles.map((role) => ({ name: 'Nome Cognome', role, group }))
export const fallbackOrg: OrgMember[] = [
  ...o('presidenza', ['Presidente', 'Vicepresidente']),
  ...o('direttori', ['Direttore generale', 'Direttore sportivo', 'Direttore settore giovanile']),
  ...o('segreteria', ['Segretario', 'Addetta alla segreteria', 'Amministrazione']),
  ...o('consiglieri', ['Consigliere', 'Consigliere', 'Consigliere', 'Consigliere']),
  ...o('collaboratori', ['Addetto stampa e social', 'Responsabile impianti', 'Responsabile eventi', 'Volontari']),
]

export const fallbackSponsors: Sponsor[] = [
  ...[1, 2, 3].map((i) => ({ name: `Nome Sponsor ${i}`, tier: 'principale' as const, description: 'Breve descrizione dell’azienda e del suo legame con il club.', url: '' })),
  ...[4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => ({ name: `Sponsor ${String(i).padStart(2, '0')}`, tier: 'partner' as const, description: '', url: '' })),
]

export const fallbackMatches: Match[] = [
  { date: '2026-10-25T15:00:00+01:00', opponent: 'Squadra A', home: true, competition: 'Campionato' },
  { date: '2026-11-01T14:30:00+01:00', opponent: 'Squadra B', home: false, competition: 'Campionato' },
  { date: '2026-11-08T15:00:00+01:00', opponent: 'Squadra C', home: true, competition: 'Campionato' },
  { date: '2026-10-18T15:00:00+02:00', opponent: 'Squadra D', home: false, competition: 'Campionato', goalsFor: 2, goalsAgainst: 0 },
  { date: '2026-10-11T15:00:00+02:00', opponent: 'Squadra E', home: true, competition: 'Campionato', goalsFor: 1, goalsAgainst: 1 },
  { date: '2026-10-04T15:00:00+02:00', opponent: 'Squadra F', home: false, competition: 'Campionato', goalsFor: 3, goalsAgainst: 1 },
]
