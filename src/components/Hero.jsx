import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site'
import { ArrowUpRight, PlayMark } from './Icons'
import { useReducedMotion } from '../hooks/useInView'
import { useMagnetic } from '../hooks/useMotion'

const timelineSegments = [
  { width: 14, tone: 'strong' },
  { width: 7, tone: '' },
  { width: 5, tone: '' },
  { width: 18, tone: 'accent' },
  { width: 9, tone: '' },
  { width: 4, tone: '' },
  { width: 12, tone: 'strong' },
  { width: 6, tone: '' },
  { width: 9, tone: '' },
  { width: 16, tone: '' },
]

const titleLineOne = [
  { char: '一' },
  { char: '镜' },
  { char: '入' },
  { char: '戏' },
]

const titleLineTwo = [
  { char: '一' },
  { char: '秒' },
  { char: '入', serif: true },
  { char: '钩', serif: true },
  { char: '。', dot: true },
]

export default function Hero({ ready }) {
  const heroRef = useRef(null)
  const mediaRef = useRef(null)
  const videoRef = useRef(null)
  const [videoReady, setVideoReady] = useState(false)
  const reducedMotion = useReducedMotion()
  const magnetic = useMagnetic(0.16)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (reducedMotion) {
      video.pause()
      return
    }

    video.play().catch(() => {})
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    let frame = 0

    const update = () => {
      const y = window.scrollY
      if (mediaRef.current && y < window.innerHeight * 1.25) {
        mediaRef.current.style.transform = `translate3d(0, ${y * 0.2}px, 0)`
      }
      frame = 0
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let frame = 0
    let running = false

    const render = () => {
      currentX += (targetX - currentX) * 0.055
      currentY += (targetY - currentY) * 0.055
      hero.style.setProperty('--mouse-x', `${currentX.toFixed(2)}px`)
      hero.style.setProperty('--mouse-y', `${currentY.toFixed(2)}px`)

      if (Math.abs(targetX - currentX) > 0.03 || Math.abs(targetY - currentY) > 0.03) {
        frame = requestAnimationFrame(render)
      } else {
        currentX = targetX
        currentY = targetY
        running = false
      }
    }

    const start = () => {
      if (running) return
      running = true
      frame = requestAnimationFrame(render)
    }

    const onPointerMove = (event) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 16
      targetY = (event.clientY / window.innerHeight - 0.5) * 12
      start()
    }

    const onPointerLeave = () => {
      targetX = 0
      targetY = 0
      start()
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('mouseleave', onPointerLeave)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('mouseleave', onPointerLeave)
      cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  return (
    <section
      id="top"
      ref={heroRef}
      className={`hero ${ready ? 'is-ready' : ''}`}
    >
      <div className="hero__media" ref={mediaRef} aria-hidden="true">
        <video
          ref={videoRef}
          className={videoReady ? 'is-ready' : ''}
          src="/media/hero.mp4"
          poster="/images/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
        />
        <div className="hero__scrim" />
        <div className="hero__scanlines" />
      </div>

      <div className="hero__side" aria-hidden="true">
        <span>SHORT-DRAMA EDITOR</span>
        <i />
        <span>{site.brand} / {site.brandCn}</span>
      </div>

      <div className="hero__content container">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-text">SHORT-DRAMA EDITOR / 竖屏叙事</span>
        </div>

        <h1 className="hero__title" aria-label="一镜入戏，一秒入钩">
          <span className="hero__line">
            <span className="hero__chars">
              {titleLineOne.map((item, index) => (
                <span
                  className="hero__char"
                  aria-hidden="true"
                  key={`${item.char}-${index}`}
                  style={{ '--char-delay': `${100 + index * 72}ms` }}
                >
                  <span>{item.char}</span>
                </span>
              ))}
            </span>
          </span>
          <span className="hero__line hero__line--second">
            <span className="hero__chars">
              {titleLineTwo.map((item, index) => (
                <span
                  className={`hero__char ${item.serif ? 'hero__char--serif' : ''} ${
                    item.dot ? 'hero__char--dot' : ''
                  }`}
                  aria-hidden="true"
                  key={`${item.char}-${index}`}
                  style={{ '--char-delay': `${260 + index * 72}ms` }}
                >
                  <span>{item.char}</span>
                </span>
              ))}
            </span>
          </span>
        </h1>

        <div className="hero__lower">
          <div className="hero__intro">
            <span className="hero__intro-label">FROM SCRIPT TO FINAL CUT</span>
            <p>
              从第一帧到最后一秒，
              <br />
              把故事剪成观众舍不得划走的样子。
            </p>
          </div>

          <div className="hero__actions">
            <a
              className="button button--solid"
              href="#projects"
              data-cursor="查看"
              {...magnetic}
            >
              浏览精选项目
              <ArrowUpRight size={18} />
            </a>
            <a className="hero__text-link" href="#contact">
              <PlayMark size={9} />
              聊聊下一部
            </a>
          </div>
        </div>
      </div>

      <div className="hero__timeline container" aria-hidden="true">
        <div className="timeline__meta">
          <span>
            <i />
            SEQUENCE / MASTER
          </span>
          <span>V1 / 1080 × 1920</span>
          <span className="timeline__time">00:00:12:08</span>
        </div>
        <div className="timeline__track">
          {timelineSegments.map((segment, index) => (
            <span
              key={`${segment.width}-${index}`}
              className={`timeline__clip ${segment.tone}`}
              style={{ width: `${segment.width}%`, '--clip-index': index }}
            />
          ))}
          <span className="timeline__playhead">
            <i />
          </span>
        </div>
        <div className="timeline__ticks">
          <span>00:00</span>
          <span>00:15</span>
          <span>00:30</span>
          <span>00:45</span>
          <span>01:00</span>
        </div>
      </div>

      <div className="hero__meta container">
        <div className="hero__meta-item">
          <span>BASE</span>
          <strong>{site.city} · 中国</strong>
        </div>
        <div className="hero__meta-item">
          <span>FOCUS</span>
          <strong>竖屏短剧 / 强情节叙事</strong>
        </div>
        <div className="hero__meta-item">
          <span>EXPERIENCE</span>
          <strong>2+ YEARS · 80+ TITLES</strong>
        </div>
        <a className="hero__scroll" href="#profile">
          <span>SCROLL TO CUT</span>
          <i>
            <span />
          </i>
        </a>
      </div>
    </section>
  )
}
