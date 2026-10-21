import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { gsap } from 'gsap'
import { site } from '../data/site'
import AnimatedHeading from './AnimatedHeading'
import Reveal from './Reveal'
import { ArrowUpRight } from './Icons'

export default function Archive() {
  const [archiveOpen, setArchiveOpen] = useState(false)
  const overlayRef = useRef(null)
  const transitionRef = useRef(null)
  const overlayCloseRef = useRef(null)
  const openButtonRef = useRef(null)
  const lastTriggerRef = useRef(null)

  const openArchive = useCallback((trigger) => {
    lastTriggerRef.current = trigger || document.activeElement
    setArchiveOpen(true)
  }, [])

  const closeOverlay = useCallback(() => {
    if (!archiveOpen) return

    const finish = () => {
      setArchiveOpen(false)
      const trigger = lastTriggerRef.current
      window.setTimeout(() => {
        if (trigger && document.contains(trigger)) {
          trigger.focus()
        } else {
          openButtonRef.current?.focus()
        }
      }, 0)
    }

    if (!overlayRef.current) {
      finish()
      return
    }

    gsap.to(overlayRef.current, {
      autoAlpha: 0,
      duration: 0.32,
      ease: 'power2.in',
      onComplete: finish,
    })
  }, [archiveOpen])

  useEffect(() => {
    if (!archiveOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('archive-open')
    window.__lenis?.stop()

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.classList.remove('archive-open')
      window.__lenis?.start()
    }
  }, [archiveOpen])

  useEffect(() => {
    if (!archiveOpen) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeOverlay()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [archiveOpen, closeOverlay])

  useEffect(() => {
    if (archiveOpen) {
      window.setTimeout(() => overlayCloseRef.current?.focus(), 0)
    }
  }, [archiveOpen])

  useEffect(() => {
    const onArchiveLink = (event) => {
      const link = event.target.closest?.('a[href="#archive"]')
      if (!link) return

      event.preventDefault()
      if (!archiveOpen) openArchive(link)
    }

    document.addEventListener('click', onArchiveLink, true)
    return () => document.removeEventListener('click', onArchiveLink, true)
  }, [archiveOpen, openArchive])

  useLayoutEffect(() => {
    if (!archiveOpen || !overlayRef.current) return

    const ctx = gsap.context(() => {
      const overlay = overlayRef.current
      const transition = transitionRef.current
      if (!transition) return

      const curtain = transition.querySelector('.archive-transition__panel')
      const meta = transition.querySelector('.archive-transition__meta')
      const title = transition.querySelector('.archive-transition__title')
      const line = transition.querySelector('.archive-transition__line')
      const headItems = gsap.utils.toArray('.archive-overlay__head > *')
      const linkContent = overlay.querySelector('.archive-link')

      gsap.set(overlay, { autoAlpha: 0 })
      gsap.set(transition, { autoAlpha: 1 })
      gsap.set([meta, title], { autoAlpha: 0, y: 18 })
      gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(headItems, { autoAlpha: 0, y: -14 })
      gsap.set(linkContent, { autoAlpha: 0, y: 28 })

      const tl = gsap.timeline({
        onComplete: () => gsap.set(transition, { autoAlpha: 0 }),
      })

      tl.fromTo(
        curtain,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.72, ease: 'power4.inOut' },
        0,
      )
        .to(meta, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.2)
        .to(
          title,
          { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power4.out' },
          0.24,
        )
        .to(line, { scaleX: 1, duration: 0.65, ease: 'power3.inOut' }, 0.38)
        .set(overlay, { autoAlpha: 1 }, 0.7)
        .to(
          [meta, title, line],
          { autoAlpha: 0, y: -14, duration: 0.3, stagger: 0.03 },
          1.02,
        )
        .to(
          curtain,
          { yPercent: -100, duration: 0.82, ease: 'power4.inOut' },
          1.12,
        )
        .to(
          headItems,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.06,
            ease: 'power3.out',
          },
          1.28,
        )
        .to(
          linkContent,
          { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out' },
          1.3,
        )
        .set(transition, { autoAlpha: 0 }, 1.98)
    }, overlayRef)

    return () => ctx.revert()
  }, [archiveOpen])

  return (
    <section id="archive" className="section archive">
      <div className="container">
        <div className="section-head">
          <Reveal className="section-head__meta">
            <span className="section-head__index">03</span>
            <span>FULL ARCHIVE / 全部作品</span>
            <span className="section-head__line" />
          </Reveal>
          <div className="section-head__row">
            <AnimatedHeading
              en="ARCHIVE"
              lines={[
                <>全部作品，</>,
                <>
                  一次<em>看完</em>。
                </>,
              ]}
              className="section-title"
            />
            <Reveal className="section-head__aside" delay={120}>
              <span className="eyebrow">AI DRAMA / LIVE ACTION</span>
              <p>
                完整片库已移至百度网盘，点击下方入口即可跳转查看。
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal className="archive-invite">
          <div className="archive-invite__head">
            <span>FULL ARCHIVE / 全部作品</span>
          </div>

          <button
            type="button"
            className="archive-invite__action"
            onClick={(event) => openArchive(event.currentTarget)}
            ref={openButtonRef}
            aria-haspopup="dialog"
          >
            <span className="archive-invite__copy">
              <span className="archive-invite__hint">
                CLICK TO OPEN / BAIDU NETDISK
              </span>
              <strong>展开完整作品集</strong>
              <span>百度网盘 · 一键跳转</span>
            </span>

            <span className="archive-invite__arrow">
              <ArrowUpRight size={30} />
            </span>
          </button>

          <div className="archive-invite__strip" aria-hidden="true">
            {Array.from({ length: site.archive.series }, (_, index) => (
              <i key={index} style={{ '--i': index }} />
            ))}
          </div>
        </Reveal>

        <Reveal className="archive__note">
          <span>FULL ARCHIVE / BAIDU NETDISK</span>
          <p>
            作品视频不再存储在站内，展开后通过百度网盘查看。
            分享链接已附带提取码，点击按钮即可打开。
          </p>
        </Reveal>
      </div>

      {archiveOpen && (
        <div
          className="archive-overlay"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="archive-overlay-title"
        >
          <button
            type="button"
            className="archive-overlay__backdrop"
            onClick={closeOverlay}
            aria-label="关闭作品集"
          />

          <div className="archive-overlay__panel">
            <header className="archive-overlay__head">
              <div className="archive-overlay__title">
                <span className="archive-overlay__eyebrow">
                  FULL ARCHIVE / 全部作品
                </span>
                <h3 id="archive-overlay-title">作品集</h3>
              </div>

              <button
                type="button"
                className="archive-overlay__close"
                onClick={closeOverlay}
                ref={overlayCloseRef}
                aria-label="关闭作品集"
              >
                <span>CLOSE</span>
                <i>×</i>
              </button>
            </header>

            <div className="archive-link">
              <span className="archive-link__eyebrow">
                BAIDU NETDISK / 百度网盘
              </span>
              <h4>
                完整作品集
                <br />
                已移至百度网盘
              </h4>
              <p className="archive-link__desc">
                点击下方按钮打开分享页面，提取码：
                <strong>{site.archive.code}</strong>
              </p>

              <div className="archive-link__action">
                <a
                  href={site.archive.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="archive-link__cta"
                >
                  打开百度网盘
                  <ArrowUpRight size={22} />
                </a>
                <span className="archive-link__code">
                  提取码 <strong>{site.archive.code}</strong>
                </span>
              </div>

              <a
                href={site.archive.url}
                target="_blank"
                rel="noopener noreferrer"
                className="archive-link__url"
              >
                {site.archive.url}
              </a>

              <p className="archive-link__hint">
                如链接失效，请通过页面底部的邮箱联系我。
              </p>
            </div>
          </div>
        </div>
      )}

      {archiveOpen && (
        <div className="archive-transition" ref={transitionRef} aria-hidden="true">
          <div className="archive-transition__panel">
            <span className="archive-transition__meta">
              OPENING / FULL ARCHIVE
            </span>
            <strong className="archive-transition__title">作品集</strong>
            <i className="archive-transition__line" />
          </div>
        </div>
      )}
    </section>
  )
}
