import type { ReactNode } from 'react'
const S = (children: ReactNode, cls?: string) => (
  <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{children}</svg>
)
export const IconPhone = () => S(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />)
export const IconMail = () => S(<><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M3 7l9 6 9-6" /></>)
export const IconPin = () => S(<><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>)
export const IconClock = () => S(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>)
export const IconUsers = () => S(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-5.5 6.5-5.5s6.5 1.9 6.5 5.5" /><circle cx="17.5" cy="9" r="2.5" /><path d="M17 14.5c2.6.2 4.5 1.8 4.5 4.5" /></>, 'ico')
export const IconBoard = () => S(<><rect x="3" y="4" width="18" height="13" rx="1" /><path d="M8 21l4-4 4 4M7 9h6M7 12h10" /></>, 'ico')
export const IconShield = () => S(<path d="M12 3L4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3z" />, 'ico')
export const IconHeart = () => S(<path d="M12 21s-8-5-9.5-10C1.3 7.3 3.8 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.2 0 5.7 3.3 4.5 7-1.5 5-9.5 10-9.5 10z" />, 'ico')
export const IconInstagram = () => S(<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></>)
export const IconFacebook = () => (<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z" /></svg>)
export const IconYoutube = () => S(<><rect x="2" y="6" width="20" height="12" rx="3" /><path d="M10 9.5L15 12l-5 2.5z" fill="currentColor" /></>)
