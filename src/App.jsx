import { useEffect, useState } from 'react'
import Loader from './components/Loader'
import Grain from './components/Grain'
import SmoothScroll from './components/SmoothScroll'
import MotionDirector from './components/MotionDirector'
import Header from './components/Header'
import ScrollRail from './components/ScrollRail'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Projects from './components/Projects'
import Archive from './components/Archive'
import Capabilities from './components/Capabilities'
import Contact from './components/Contact'

export default function App() {
  const [booted, setBooted] = useState(false)
  const [loaderGone, setLoaderGone] = useState(false)
  const [activeSection, setActiveSection] = useState('profile')

  useEffect(() => {
    const bootTimer = window.setTimeout(() => setBooted(true), 1900)
    return () => window.clearTimeout(bootTimer)
  }, [])

  useEffect(() => {
    if (loaderGone) return

    const root = document.documentElement
    const body = document.body
    const previousBodyOverflow = body.style.overflow
    const previousRootOverflow = root.style.overflow
    const scrollKeys = new Set([
      ' ',
      'Spacebar',
      'ArrowDown',
      'ArrowUp',
      'PageDown',
      'PageUp',
      'Home',
      'End',
    ])

    const preventScroll = (event) => event.preventDefault()
    const preventScrollKey = (event) => {
      if (scrollKeys.has(event.key)) event.preventDefault()
    }
    const keepAtTop = () => {
      if (window.scrollY !== 0) window.scrollTo(0, 0)
    }

    body.style.overflow = 'hidden'
    root.style.overflow = 'hidden'
    root.classList.add('is-booting')
    keepAtTop()

    window.addEventListener('wheel', preventScroll, {
      passive: false,
      capture: true,
    })
    window.addEventListener('touchmove', preventScroll, {
      passive: false,
      capture: true,
    })
    window.addEventListener('keydown', preventScrollKey, true)
    window.addEventListener('scroll', keepAtTop, { passive: true })

    return () => {
      body.style.overflow = previousBodyOverflow
      root.style.overflow = previousRootOverflow
      root.classList.remove('is-booting')
      window.removeEventListener('wheel', preventScroll, true)
      window.removeEventListener('touchmove', preventScroll, true)
      window.removeEventListener('keydown', preventScrollKey, true)
      window.removeEventListener('scroll', keepAtTop)
    }
  }, [loaderGone])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section[id]'))
    if (!sections.length || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-42% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {!loaderGone && <Loader onComplete={() => setLoaderGone(true)} />}

      <div
        className={`site ${booted ? 'is-ready' : ''}`}
        inert={loaderGone ? undefined : ''}
      >
        <a className="skip-link" href="#profile">
          跳至主要内容
        </a>

        <SmoothScroll enabled={loaderGone} />
        <MotionDirector enabled={loaderGone} />
        <Grain />
        <div className="scroll-aura" aria-hidden="true" />
        <div className="scroll-progress" aria-hidden="true" />
        <ScrollRail active={activeSection} />
        <Header active={activeSection} />

        <main>
          <Hero ready={loaderGone} />
          <Marquee />
          <About />
          <Projects />
          <Archive />
          <Capabilities />
          <Contact />
        </main>
      </div>
    </>
  )
}
