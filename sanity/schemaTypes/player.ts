import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'player',
  title: 'Giocatori',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nome e cognome', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'number', title: 'Numero di maglia', type: 'number', validation: (r) => r.required().integer().min(1).max(99) }),
    defineField({
      name: 'role', title: 'Ruolo', type: 'string',
      options: { list: ['Portiere', 'Difensore', 'Centrocampista', 'Attaccante'], layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'photo', title: 'Foto (verticale, 4:5)', type: 'image', options: { hotspot: true } }),
  ],
  orderings: [{ title: 'Numero di maglia', name: 'numberAsc', by: [{ field: 'number', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
})
