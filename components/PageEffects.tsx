'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/** Animazione di comparsa allo scroll. Se non supportata, i contenuti restano semplicemente visibili. */
export default function PageEffects() {
  const pathname = usePathname()
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    document.documentElement.classList.add('js-anim')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
  return null
}
