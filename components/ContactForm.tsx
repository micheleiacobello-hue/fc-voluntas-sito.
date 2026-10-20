'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return
    setState('sending')
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: new FormData(form) })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setState('ok'); setMsg('Grazie! Il tuo messaggio è stato inviato: ti risponderemo il prima possibile.'); form.reset()
      } else {
        setState('error'); setMsg(data.error || 'Si è verificato un errore. Riprova oppure scrivici via email.')
      }
    } catch {
      setState('error'); setMsg('Connessione non riuscita. Riprova oppure scrivici via email.')
    }
  }

  return (
    <form className="form reveal" onSubmit={onSubmit} noValidate={false}>
      <h2>Scrivici</h2>
      <p>Compila il modulo: ti risponderemo il prima possibile.</p>
      <div className="field-row">
        <div className="field"><label htmlFor="nome">Nome e cognome</label><input id="nome" name="nome" type="text" autoComplete="name" required /></div>
        <div className="field"><label htmlFor="telefono">Telefono (facoltativo)</label><input id="telefono" name="telefono" type="tel" autoComplete="tel" /></div>
      </div>
      <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
      <div className="field">
        <label htmlFor="argomento">Argomento</label>
        <select id="argomento" name="argomento">
          <option>Informazioni generali</option><option>Settore giovanile / iscrizioni</option><option>Sponsorizzazioni</option><option>Altro</option>
        </select>
      </div>
      <div className="field"><label htmlFor="messaggio">Messaggio</label><textarea id="messaggio" name="messaggio" required minLength={10} /></div>
      <div className="hp" aria-hidden="true"><label>Non compilare<input type="text" name="sito" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="consent">
        <input type="checkbox" name="privacy" required />
        <span>Ho letto l’<Link href="/privacy" style={{ textDecoration: 'underline' }}>informativa sulla privacy</Link> e acconsento al trattamento dei dati.</span>
      </label>
      <button className="btn btn-primary" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Invio in corso…' : 'Invia messaggio'}</button>
      <div className={`form-msg${state === 'ok' || state === 'error' ? ' show' : ''}`} role="status" aria-live="polite"
        style={state === 'error' ? { borderLeftColor: 'var(--red)', background: '#fdeff1' } : undefined}>{msg}</div>
    </form>
  )
}
