import { useEffect, useState } from 'react'
import { site } from '../data/site'

export default function ScrollRail({ active }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <aside className="scroll-rail" aria-hidden="true">
      <span className="scroll-rail__label">INDEX</span>
      <div className="scroll-rail__line">
        <span style={{ transform: `scaleY(${Math.max(progress, 0.02)})` }} />
      </div>
      <div className="scroll-rail__sections">
        {site.nav.map((item) => (
          <span key={item.id} className={active === item.id ? 'is-active' : ''}>
            {item.index}
          </span>
        ))}
      </div>
      <span className="scroll-rail__percent">{String(Math.round(progress * 100)).padStart(2, '0')}</span>
    </aside>
  )
}
