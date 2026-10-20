import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'staffMember',
  title: 'Staff tecnico',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nome e cognome', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Ruolo', type: 'string', description: 'Es. Allenatore, Preparatore atletico', validation: (r) => r.required() }),
    defineField({ name: 'photo', title: 'Foto (quadrata)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Ordine di visualizzazione', type: 'number', description: 'Numeri più bassi compaiono prima', initialValue: 10 }),
  ],
  orderings: [{ title: 'Ordine', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
})
