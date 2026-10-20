import Link from 'next/link'
import { fmtShort, img } from '@/lib/content'
import type { Post } from '@/lib/types'

export default function NewsCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <article className="card reveal">
      <div className="card-media">
        {post.image && (
          <img src={img(post.image, 800)} alt={post.imageAlt || post.title} loading={priority ? 'eager' : 'lazy'} />
        )}
        <span className="tag">{post.tag}</span>
      </div>
      <div className="card-body">
        <time className="card-date" dateTime={post.date}>{fmtShort(post.date)}</time>
        <h3><Link href={`/news/${post.slug}`} className="stretch-link">{post.title}</Link></h3>
        <p>{post.excerpt}</p>
        <span className="card-link">Leggi l’articolo</span>
      </div>
    </article>
  )
}
