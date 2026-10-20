import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'match',
  title: 'Partite',
  type: 'document',
  fields: [
    defineField({ name: 'date', title: 'Data e ora', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'opponent', title: 'Avversario', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'home', title: 'Dove si gioca', type: 'string',
      options: { list: [{ title: 'In casa', value: 'casa' }, { title: 'In trasferta', value: 'trasferta' }], layout: 'radio' },
      initialValue: 'casa',
    }),
    defineField({ name: 'competition', title: 'Competizione', type: 'string', initialValue: 'Campionato' }),
    defineField({ name: 'goalsFor', title: 'Gol F.C. Voluntas', type: 'number', description: 'Lascia vuoto se la partita non è ancora giocata' }),
    defineField({ name: 'goalsAgainst', title: 'Gol avversario', type: 'number' }),
  ],
  orderings: [{ title: 'Data', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { opponent: 'opponent', date: 'date', gf: 'goalsFor', ga: 'goalsAgainst' },
    prepare: ({ opponent, date, gf, ga }) => ({
      title: `vs ${opponent}`,
      subtitle: `${date ? new Date(date).toLocaleDateString('it-IT') : ''}${gf != null && ga != null ? ` — ${gf}-${ga}` : ''}`,
    }),
  },
})
