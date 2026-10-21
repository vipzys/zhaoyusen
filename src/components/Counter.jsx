import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'

export default function Counter({ value, suffix = '', duration = 1500 }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 4)
      setDisplay(Math.round(value * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}
