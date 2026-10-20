'use client'
import { useState } from 'react'
import Silhouette from './Silhouette'
import type { Player } from '@/lib/types'

const FILTERS = [
  { key: 'all', label: 'Tutti' },
  { key: 'Portiere', label: 'Portieri' },
  { key: 'Difensore', label: 'Difensori' },
  { key: 'Centrocampista', label: 'Centrocampisti' },
  { key: 'Attaccante', label: 'Attaccanti' },
]

export default function RosterGrid({ players }: { players: (Player & { photoUrl?: string })[] }) {
  const [role, setRole] = useState('all')
  return (
    <>
      <div className="role-filter" role="group" aria-label="Filtra per ruolo">
        {FILTERS.map((f) => (
          <button key={f.key} type="button" className={role === f.key ? 'active' : ''} aria-pressed={role === f.key} onClick={() => setRole(f.key)}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="roster-grid">
        {players.filter((p) => role === 'all' || p.role === role).map((p, i) => (
          <article className="player" key={`${p.number}-${p.name}-${i}`}>
            <div className="player-photo">
              {p.photoUrl ? <img src={p.photoUrl} alt={p.name} loading="lazy" /> : <Silhouette />}
              <span className="player-num">{p.number}</span>
            </div>
            <div className="player-info"><h3>{p.name}</h3><span className="role">{p.role}</span></div>
          </article>
        ))}
      </div>
    </>
  )
}
