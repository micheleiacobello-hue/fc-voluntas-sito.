import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'News',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titolo', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Indirizzo web (slug)', type: 'slug', options: { source: 'title', maxLength: 80 }, validation: (r) => r.required() }),
    defineField({
      name: 'tag', title: 'Categoria', type: 'string',
      options: { list: ['Prima Squadra', 'Settore Giovanile', 'Società', 'Eventi'] },
      initialValue: 'Società',
    }),
    defineField({ name: 'date', title: 'Data di pubblicazione', type: 'datetime', initialValue: () => new Date().toISOString(), validation: (r) => r.required() }),
    defineField({ name: 'excerpt', title: 'Breve anteprima', type: 'text', rows: 3, validation: (r) => r.required().max(220) }),
    defineField({
      name: 'image', title: 'Immagine di copertina', type: 'image', options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Descrizione dell\'immagine', type: 'string' })],
    }),
    defineField({
      name: 'body', title: 'Testo', type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normale', value: 'normal' }, { title: 'Titolo', value: 'h2' }, { title: 'Citazione', value: 'blockquote' }],
          lists: [{ title: 'Elenco puntato', value: 'bullet' }],
        },
        { type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Descrizione', type: 'string' })] },
      ],
    }),
  ],
  orderings: [{ title: 'Più recenti', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'tag', media: 'image' } },
})
