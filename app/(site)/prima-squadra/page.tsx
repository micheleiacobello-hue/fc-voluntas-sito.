import type { Metadata } from 'next'
import { fmtMatchDay, fmtTime, getMatches, getPlayers, img } from '@/lib/content'
import type { Match } from '@/lib/types'
import PageHero from '@/components/PageHero'
import CtaBand from '@/components/CtaBand'
import RosterGrid from '@/components/RosterGrid'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Prima Squadra',
  description: 'La rosa della prima squadra del F.C. Voluntas: portieri, difensori, centrocampisti e attaccanti, con calendario e risultati.',
  alternates: { canonical: '/prima-squadra' },
}

const title = (m: Match) => (m.home ? `F.C. Voluntas – ${m.opponent}` : `${m.opponent} – F.C. Voluntas`)

export default async function PrimaSquadra() {
  const [players, { upcoming, results }] = await Promise.all([getPlayers(), getMatches()])
  const roster = players.map((p) => ({ ...p, photoUrl: img(p.photo, 600) }))
  return (
    <>
      <PageHero title="Prima Squadra" lead="La rosa 2026 / 2027: il gruppo che porta in campo i colori e i valori del Voluntas." crumbs={[{ label: 'Prima Squadra' }]} bg="/img/partita-campo.jpg" bgSize={[1600, 1067]} eyebrow="Stagione 2026 / 2027" />
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">La rosa</div>
            <h2 className="section-title">I nostri giocatori</h2>
            <p>Un gruppo unito, tra giovani di talento ed elementi d’esperienza, con un obiettivo comune: onorare la maglia.</p>
          </div>
          <RosterGrid players={roster} />
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Calendario e risultati</div>
            <h2 className="section-title">Prossime gare e ultimi risultati</h2>
          </div>
          <div className="fixtures reveal">
            <div className="fixture-list">
              <h3>Prossime partite</h3>
              {upcoming.length === 0 && <div className="fixture"><div className="match">Calendario in aggiornamento</div></div>}
              {upcoming.map((m, i) => (
                <div className="fixture" key={i}>
                  <div className="when">{fmtMatchDay(m.date)}<br />{fmtTime(m.date)}</div>
                  <div className="match">{title(m)}<small>{m.competition}</small></div>
                  <span className="ha">{m.home ? 'CASA' : 'TRASFERTA'}</span>
                </div>
              ))}
            </div>
            <div className="fixture-list">
              <h3>Ultimi risultati</h3>
              {results.length === 0 && <div className="fixture"><div className="match">Nessun risultato disponibile</div></div>}
              {results.map((m, i) => {
                const gf = m.goalsFor ?? 0, ga = m.goalsAgainst ?? 0
                return (
                  <div className="fixture" key={i}>
                    <div className="when">{fmtMatchDay(m.date)}</div>
                    <div className="match">{title(m)}<small>{m.competition}</small></div>
                    <span className={`score${gf > ga ? ' win' : ''}`}>{m.home ? `${gf} – ${ga}` : `${ga} – ${gf}`}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <CtaBand title="Vieni a tifare Voluntas." text="Segui la squadra in casa e in trasferta: ogni domenica è una festa di comunità." />
    </>
  )
}
