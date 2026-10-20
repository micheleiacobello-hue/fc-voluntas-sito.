import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const TOPICS = ['Informazioni generali', 'Settore giovanile / iscrizioni', 'Sponsorizzazioni', 'Altro']
const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? '').replace(/\r/g, '').trim().slice(0, max)

export async function POST(req: Request) {
  const f = await req.formData()

  // anti-spam: il campo "sito" è nascosto, se compilato è un bot
  if (clean(f.get('sito'), 100)) return NextResponse.json({ ok: true })

  const nome = clean(f.get('nome'), 100)
  const email = clean(f.get('email'), 150)
  const telefono = clean(f.get('telefono'), 40)
  const argomento = TOPICS.includes(clean(f.get('argomento'), 60)) ? clean(f.get('argomento'), 60) : 'Altro'
  const messaggio = clean(f.get('messaggio'), 4000)

  if (!nome || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || messaggio.length < 10) {
    return NextResponse.json({ error: 'Controlla i campi: nome, email valida e messaggio sono obbligatori.' }, { status: 400 })
  }
  if (!f.get('privacy')) {
    return NextResponse.json({ error: 'Per inviare il messaggio devi accettare l’informativa sulla privacy.' }, { status: 400 })
  }

  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  if (!key || !to) {
    return NextResponse.json({ error: 'Il servizio di invio non è ancora attivo. Scrivici direttamente via email.' }, { status: 503 })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'Sito F.C. Voluntas <onboarding@resend.dev>',
      to: to.split(',').map((x) => x.trim()),
      reply_to: email,
      subject: `[Sito] ${argomento} — ${nome}`,
      text: `Nome: ${nome}\nEmail: ${email}\nTelefono: ${telefono || '—'}\nArgomento: ${argomento}\n\n${messaggio}`,
    }),
  })
  if (!res.ok) {
    console.error('Resend error', res.status, await res.text().catch(() => ''))
    return NextResponse.json({ error: 'Invio non riuscito. Riprova tra poco oppure scrivici via email.' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
