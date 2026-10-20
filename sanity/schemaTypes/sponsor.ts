import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sponsor',
  title: 'Sponsor',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nome azienda', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'tier', title: 'Livello', type: 'string',
      options: { list: [{ title: 'Sponsor principale', value: 'principale' }, { title: 'Partner', value: 'partner' }], layout: 'radio' },
      initialValue: 'partner',
    }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'description', title: 'Breve descrizione', type: 'text', rows: 3 }),
    defineField({ name: 'url', title: 'Sito web', type: 'url' }),
    defineField({ name: 'order', title: 'Ordine di visualizzazione', type: 'number', initialValue: 10 }),
  ],
  orderings: [{ title: 'Ordine', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'tier', media: 'logo' } },
})
