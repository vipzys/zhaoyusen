import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ enabled = true }) {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      lerp: 0.06,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      syncTouch: window.matchMedia('(pointer: coarse)').matches,
      syncTouchLerp: 0.075,
    })

    window.__lenis = lenis
    const root = document.documentElement
    let frame = 0

    const onScroll = ({ progress, velocity }) => {
      root.style.setProperty('--scroll-progress', (progress || 0).toFixed(4))
      const skew = Math.min(Math.abs(velocity || 0) / 60, 1) * 0.45
      root.style.setProperty('--scroll-skew', `${skew.toFixed(3)}deg`)
    }

    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    lenis.on('scroll', onScroll)
    onScroll({ progress: 0 })

    const onAnchorClick = (event) => {
      if (event.defaultPrevented) return
      const link = event.target.closest('a[href^="#"]')
      if (!link) return

      const hash = link.getAttribute('href')
      if (!hash || hash === '#') return

      const target = document.querySelector(hash)
      if (!target) return

      event.preventDefault()
      lenis.start()
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.5,
      })

      if (window.location.hash !== hash) {
        window.history.pushState(null, '', hash)
      }
    }

    document.addEventListener('click', onAnchorClick)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      lenis.off('scroll', onScroll)
      cancelAnimationFrame(frame)
      lenis.destroy()
      delete window.__lenis
    }
  }, [enabled])

  return null
}
