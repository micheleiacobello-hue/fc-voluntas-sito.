# F.C. Voluntas — sito ufficiale (Next.js + Sanity + Vercel)

- **Sito**: Next.js (App Router), pagine statiche rigenerate ogni ~60 secondi → veloce e ottimo per la SEO.
- **Contenuti**: Sanity (CMS). Il club modifica news, rosa, staff, organigramma, sponsor, partite e dati di contatto da `https://<dominio>/studio`.
- **Hosting**: Vercel, deploy automatico a ogni push su GitHub.
- Finché Sanity non è collegato (o una sezione è vuota) il sito mostra contenuti di esempio: non resta mai vuoto.

## 1. Avvio in locale

```bash
npm install
cp .env.example .env.local      # poi compila i valori
npm run dev                     # http://localhost:3000   (CMS su /studio)
```

## 2. Creare il progetto Sanity (una volta sola)

1. Vai su https://www.sanity.io/manage → **Create new project** → nome "F.C. Voluntas" → dataset **production** (pubblico, va bene così).
2. Copia il **Project ID** e mettilo in `NEXT_PUBLIC_SANITY_PROJECT_ID` (in `.env.local` e poi su Vercel).
3. Nel pannello del progetto → **API → CORS origins** → aggiungi, con "Allow credentials" attivo:
   - `http://localhost:3000`
   - l'indirizzo Vercel (es. `https://fc-voluntas.vercel.app`) e il dominio vero (`https://www.fcvoluntas.it`)
4. Invita chi gestirà i contenuti: **Members → Invite** (basta l'email).

## 3. Pubblicare su Vercel

1. Carica il progetto su un repository GitHub.
2. Su https://vercel.com → **Add New → Project** → importa il repository (preset Next.js, nessuna altra impostazione).
3. **Settings → Environment Variables** (vedi `.env.example`):
   | Variabile | Valore |
   |---|---|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | Project ID di Sanity |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
   | `NEXT_PUBLIC_SITE_URL` | `https://www.fcvoluntas.it` (dominio reale) |
   | `RESEND_API_KEY` | chiave API di Resend (form contatti) |
   | `CONTACT_TO_EMAIL` | email che riceve i messaggi (più indirizzi separati da virgola) |
   | `CONTACT_FROM_EMAIL` | mittente verificato su Resend (es. `Sito F.C. Voluntas <sito@fcvoluntas.it>`) |
4. **Deploy**. Dominio: **Settings → Domains** → aggiungi `www.fcvoluntas.it` e imposta i record DNS indicati da Vercel.

> Dopo aver cambiato le variabili d'ambiente serve un nuovo deploy (Deployments → ⋯ → Redeploy).

## 4. Form contatti

Il form invia l'email tramite [Resend](https://resend.com) (piano gratuito sufficiente). Senza `RESEND_API_KEY` mostra un messaggio "servizio non ancora attivo" e non invia nulla. Per usare un mittente `@fcvoluntas.it` va verificato il dominio su Resend (record DNS). In prova si può usare il mittente predefinito `onboarding@resend.dev`.

## 5. Cosa gestisce il club da /studio

| Sezione Studio | Dove compare sul sito |
|---|---|
| Dati della società | Indirizzo, telefono, email, orari, mappa, social, anno di fondazione e numeri della home |
| News | Home, /news e pagina di ogni articolo |
| Giocatori | /prima-squadra (foto 4:5, numero, ruolo) |
| Staff tecnico | /staff |
| Organigramma | /organigramma (per gruppo: presidenza, direttori, segreteria, consiglieri, collaboratori) |
| Partite | Calendario e risultati in /prima-squadra (se inserisci i gol, la partita passa ai "risultati") |
| Sponsor | /sponsor e striscia nella home (livello: principale / partner) |

Le modifiche pubblicate compaiono sul sito entro circa 1 minuto.

## 6. Cose che restano nel codice

- Testi della home e del settore giovanile (categorie in `app/(site)/settore-giovanile/page.tsx`), foto di testata (`public/img`).
- Colori: variabili `:root` in `app/globals.css`.
- Informativa privacy: `app/(site)/privacy/page.tsx` è un **segnaposto** da sostituire con quella definitiva (GDPR).
- I font sono self-hosted (nessuna chiamata a Google).

## 7. Da sistemare prima del lancio

- Confermare i dati "di esempio" in *Dati della società* (anno di fondazione, numeri, indirizzo, telefono, email, orari, posizione mappa).
- Inserire giocatori, staff, organigramma, sponsor reali e le prime news (finché sono vuoti si vedono i segnaposto).
- Liberatorie dei genitori per le foto di minori.
- Informativa privacy definitiva; aggiungere un banner cookie solo se si inseriscono statistiche o servizi di terze parti.
