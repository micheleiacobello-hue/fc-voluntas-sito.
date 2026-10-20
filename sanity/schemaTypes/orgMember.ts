import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'orgMember',
  title: 'Organigramma',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nome e cognome', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Carica', type: 'string', description: 'Es. Presidente, Segretario', validation: (r) => r.required() }),
    defineField({
      name: 'group', title: 'Gruppo', type: 'string',
      options: {
        list: [
          { title: 'Presidenza', value: 'presidenza' },
          { title: 'Direttori', value: 'direttori' },
          { title: 'Segreteria', value: 'segreteria' },
          { title: 'Consiglieri', value: 'consiglieri' },
          { title: 'Collaboratori', value: 'collaboratori' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'order', title: 'Ordine di visualizzazione', type: 'number', initialValue: 10 }),
  ],
  orderings: [{ title: 'Ordine', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'role' } },
})
