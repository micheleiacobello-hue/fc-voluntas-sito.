import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Dati della società',
  type: 'document',
  fields: [
    defineField({ name: 'foundedYear', title: 'Anno di fondazione', type: 'string', description: 'Es. 1928' }),
    defineField({ name: 'statAthletes', title: 'Numero atleti tesserati', type: 'string', description: 'Es. 600+' }),
    defineField({ name: 'statCategories', title: 'Numero categorie giovanili', type: 'string', description: 'Es. 8' }),
    defineField({ name: 'statLeague', title: 'Categoria della prima squadra', type: 'string', description: 'Es. 1ª' }),
    defineField({ name: 'address', title: 'Indirizzo (via e numero)', type: 'string' }),
    defineField({ name: 'postalCode', title: 'CAP', type: 'string' }),
    defineField({ name: 'city', title: 'Città', type: 'string' }),
    defineField({ name: 'province', title: 'Provincia (sigla)', type: 'string' }),
    defineField({ name: 'phone', title: 'Telefono', type: 'string', description: 'Es. +39 030 1234567' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'hours', title: 'Orari segreteria', type: 'string', description: 'Es. Lun – Ven, 17:00 – 19:30' }),
    defineField({ name: 'mapLocation', title: 'Posizione sulla mappa', type: 'geopoint', description: 'Cerca l\'indirizzo del campo/sede' }),
    defineField({ name: 'instagram', title: 'Link Instagram', type: 'url' }),
    defineField({ name: 'facebook', title: 'Link Facebook', type: 'url' }),
    defineField({ name: 'youtube', title: 'Link YouTube', type: 'url' }),
  ],
  preview: { prepare: () => ({ title: 'Dati della società' }) },
})
