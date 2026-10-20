import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'

export default function PageHero({
  title, lead, crumbs = [], bg, bgSize, eyebrow,
}: {
  title: string; lead: string; crumbs?: { label: string; href?: string }[]
  bg?: string; bgSize?: [number, number]; eyebrow?: ReactNode
}) {
  return (
    <section className="page-hero">
      {bg && <img className="bg" src={bg} width={bgSize?.[0]} height={bgSize?.[1]} alt="" fetchPriority="high" />}
      <div className="wrap">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          {crumbs.map((c) => (
            <Fragment key={c.label}><span>/</span>{c.href ? <Link href={c.href}>{c.label}</Link> : c.label}</Fragment>
          ))}
        </div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>
    </section>
  )
}
