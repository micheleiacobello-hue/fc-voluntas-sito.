import type { Metadata } from 'next'
import { getPosts } from '@/lib/content'
import NewsCard from '@/components/NewsCard'
import PageHero from '@/components/PageHero'
import CtaBand from '@/components/CtaBand'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'News',
  description: 'Tutte le notizie del F.C. Voluntas: prima squadra, settore giovanile e vita di società.',
  alternates: { canonical: '/news' },
}

export default async function NewsPage() {
  const posts = await getPosts()
  return (
    <>
      <PageHero title="News" lead="Risultati, comunicati e vita di società: tutto quello che succede in casa Voluntas." crumbs={[{ label: 'News' }]} bg="/img/camp-gruppo.jpg" bgSize={[1200, 675]} eyebrow="Dal club" />
      <section className="section">
        <div className="wrap"><div className="news-grid">{posts.map((p, i) => <NewsCard key={p.slug} post={p} priority={i < 3} />)}</div></div>
      </section>
      <CtaBand />
    </>
  )
}
