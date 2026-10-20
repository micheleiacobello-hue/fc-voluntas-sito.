import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { SITE_URL, fmtLong, getPost, getPosts, img } from '@/lib/content'
import PageHero from '@/components/PageHero'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const r = await getPost(slug)
  if (!r) return {}
  const { post } = r
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: { type: 'article', title: post.title, description: post.excerpt, publishedTime: post.date, images: post.image ? [img(post.image, 1200)!] : undefined },
  }
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const r = await getPost(slug)
  if (!r) notFound()
  const { post, prev, next } = r
  const ld = {
    '@context': 'https://schema.org', '@type': 'NewsArticle', headline: post.title, datePublished: post.date,
    image: post.image ? [post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`] : undefined,
    author: { '@type': 'Organization', name: 'F.C. Voluntas' },
    publisher: { '@type': 'Organization', name: 'F.C. Voluntas', logo: { '@type': 'ImageObject', url: `${SITE_URL}/img/logo-240.png` } },
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero title={post.title} lead={post.excerpt} crumbs={[{ label: 'News', href: '/news' }, { label: post.title }]} eyebrow={post.tag} />
      <section className="section">
        <div className="wrap">
          <article className="article">
            <div className="meta"><span className="tag">{post.tag}</span><time className="date" dateTime={post.date}>{fmtLong(post.date)}</time></div>
            {post.image && (
              <figure className="cover"><img src={img(post.image, 1400)} width={post.imageW} height={post.imageH} alt={post.imageAlt || post.title} /></figure>
            )}
            <PortableText
              value={post.body as never}
              components={{
                types: {
                  image: ({ value }: { value: { url?: string; alt?: string } }) =>
                    value.url ? <figure className="cover" style={{ margin: '28px 0' }}><img src={img(value.url, 1200)} alt={value.alt || ''} loading="lazy" /></figure> : null,
                },
              }}
            />
          </article>
          <div className="article-nav">
            {prev ? <Link className="btn btn-outline" href={`/news/${prev.slug}`}>← Più recente</Link> : <span />}
            <Link className="btn btn-primary" href="/news">Tutte le news</Link>
            {next ? <Link className="btn btn-outline" href={`/news/${next.slug}`}>Meno recente →</Link> : <span />}
          </div>
        </div>
      </section>
    </>
  )
}
