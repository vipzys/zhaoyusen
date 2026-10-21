import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EASE = 'power4.out'
const SILK = 'power3.out'

export default function MotionDirector({ enabled }) {
  useEffect(() => {
    if (!enabled) return

    const root = document.documentElement
    root.classList.add('motion-gsap')
    ScrollTrigger.config({ ignoreMobileResize: true })

    const custom = new Set()
    const markCustom = (element) => {
      if (element) custom.add(element)
    }

    const ctx = gsap.context(() => {
      /* -------------------------------------------------------
         Section heads: English display first, then Chinese mask
      ------------------------------------------------------- */
      gsap.utils
        .toArray('main section[id]:not(#contact) .section-head')
        .forEach((head) => {
          const section = head.closest('section')
          const meta = head.querySelector('.section-head__meta')
          const aside = head.querySelector('.section-head__aside')
          const en = head.querySelector('.heading-block__en')
          const lines = head.querySelectorAll('.animated-heading__inner')

          markCustom(meta)
          markCustom(aside)

          if (meta) gsap.set(meta, { autoAlpha: 0, y: 38 })
          if (aside) gsap.set(aside, { autoAlpha: 0, y: 36 })
          if (en) {
            gsap.set(en, {
              autoAlpha: 0,
              xPercent: -9,
              scaleX: 1.12,
              clipPath: 'inset(0% 100% 0% 0%)',
            })
          }
          if (lines.length) {
            gsap.set(lines, {
              autoAlpha: 0,
              y: 132,
              rotate: 1.8,
              scaleY: 1.14,
              transformOrigin: '50% 100%',
            })
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: head,
              start: 'top 74%',
              once: true,
            },
          })

          if (meta) {
            tl.to(meta, { autoAlpha: 1, y: 0, duration: 0.9, ease: SILK }, 0)
          }
          if (en) {
            tl.set(en, { visibility: 'visible' }, 0.06)
              .to(
                en,
                {
                  opacity: 0.13,
                  xPercent: 0,
                  scaleX: 1,
                  clipPath: 'inset(0% 0% 0% 0%)',
                  duration: 1.25,
                  ease: EASE,
                },
                0.06,
              )
          }
          if (lines.length) {
            tl.to(
              lines,
              {
                autoAlpha: 1,
                y: 0,
                rotate: 0,
                scaleY: 1,
                duration: 1.25,
                stagger: 0.12,
                ease: EASE,
              },
              0.3,
            )
          }
          if (aside) {
            tl.to(
              aside,
              { autoAlpha: 1, y: 0, duration: 1, ease: SILK },
              0.72,
            )

            gsap.fromTo(
              aside.querySelectorAll('.eyebrow, p'),
              { x: 0 },
              {
                x: -14,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.15,
                },
              },
            )
          }

          const headingBlock = head.querySelector('.heading-block')
          if (headingBlock) {
            gsap.fromTo(
              headingBlock,
              { y: 38 },
              {
                y: -82,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.15,
                },
              },
            )
          }

          const metaLine = head.querySelector('.section-head__line')
          if (metaLine) {
            gsap.fromTo(
              metaLine,
              { scaleX: 0.18, transformOrigin: 'left center' },
              {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'top 45%',
                  scrub: 1.1,
                },
              },
            )
          }

          const enInner = head.querySelector('.heading-block__en > span')
          if (enInner) {
            gsap.fromTo(
              enInner,
              { xPercent: 0 },
              {
                xPercent: -7,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.2,
                },
              },
            )
          }

          section.dataset.motionHead = 'true'
        })

      /* -------------------------------------------------------
         Project cards
      ------------------------------------------------------- */
      const projectCards = gsap.utils.toArray('.projects__grid .project')
      const projectMedias = gsap.utils.toArray('.projects__grid .project__media')
      projectCards.forEach(markCustom)
      if (projectCards.length) {
        gsap.set(projectCards, { autoAlpha: 0, y: 92 })
        gsap.set(projectMedias, { clipPath: 'inset(0% 0% 100% 0%)' })

        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.projects__grid',
              start: 'top 78%',
              once: true,
            },
          })
          .to(projectCards, {
            autoAlpha: 1,
            y: 0,
            duration: 1.25,
            stagger: 0.18,
            ease: EASE,
          })
          .to(
            projectMedias,
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.6,
              stagger: 0.18,
              ease: 'power4.inOut',
            },
            0,
          )

        projectMedias.forEach((media) => {
          gsap.fromTo(
            media,
            { scale: 0.975 },
            {
              scale: 1.012,
              ease: 'none',
              scrollTrigger: {
                trigger: media,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            },
          )
        })
      }

      /* -------------------------------------------------------
         Capability cards
      ------------------------------------------------------- */
      const capCards = gsap.utils.toArray('.cap__grid .cap')
      capCards.forEach(markCustom)
      if (capCards.length) {
        gsap.set(capCards, { autoAlpha: 0, y: 82, scale: 0.98 })
        gsap.timeline({
          scrollTrigger: {
            trigger: '.cap__grid',
            start: 'top 80%',
            once: true,
          },
        }).to(capCards, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.11,
          ease: SILK,
        })
      }

      /* -------------------------------------------------------
         Archive invitation block
      ------------------------------------------------------- */
      const invite = document.querySelector('.archive-invite')
      if (invite) {
        const count = invite.querySelector('.archive-invite__count')
        const bars = gsap.utils.toArray(
          '.archive-invite__strip i',
        )

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: invite,
            start: 'top 82%',
            once: true,
          },
        })

        if (count) {
          tl.fromTo(
            count,
            { autoAlpha: 0, y: 34 },
            { autoAlpha: 1, y: 0, duration: 1.15, ease: EASE },
            0,
          )
        }
        if (bars.length) {
          tl.fromTo(
            bars,
            { scaleX: 0, opacity: 0.15, transformOrigin: 'left center' },
            {
              scaleX: 1,
              opacity: 1,
              duration: 1.05,
              stagger: 0.05,
              ease: SILK,
            },
            0.08,
          )
        }
      }

      /* -------------------------------------------------------
         Portrait reveal + closing section
      ------------------------------------------------------- */
      const portrait = document.querySelector('.portrait')
      if (portrait) {
        gsap.set(portrait, { clipPath: 'inset(0% 0% 100% 0%)' })
        ScrollTrigger.create({
          trigger: '.about__visual',
          start: 'top 76%',
          once: true,
          onEnter: () =>
            gsap.to(portrait, {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.5,
              ease: 'power4.inOut',
            }),
        })
      }

      const contact = document.querySelector('#contact')
      if (contact) {
        const top = contact.querySelector('.contact__top')
        const eyebrow = contact.querySelector('.contact__headline > .reveal')
        const en = contact.querySelector('.heading-block__en')
        const enInner = contact.querySelector('.heading-block__en > span')
        const lines = contact.querySelectorAll(
          '.contact__title .animated-heading__inner',
        )
        const action = contact.querySelector('.contact__action')
        const details = contact.querySelector('.contact__details')
        const footer = contact.querySelector('.footer')

        markCustom(top)
        markCustom(eyebrow)
        markCustom(action)
        markCustom(details)

        if (top) gsap.set(top, { autoAlpha: 0, y: 28 })
        if (eyebrow) gsap.set(eyebrow, { autoAlpha: 0, y: 24 })
        if (en) {
          gsap.set(en, {
            autoAlpha: 0,
            xPercent: -8,
            scaleX: 1.12,
            clipPath: 'inset(0% 100% 0% 0%)',
          })
        }
        if (enInner) {
          gsap.fromTo(
            enInner,
            { xPercent: 0 },
            {
              xPercent: -6,
              ease: 'none',
              scrollTrigger: {
                trigger: contact,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            },
          )
        }
        if (lines.length) {
          gsap.set(lines, {
            autoAlpha: 0,
            y: 150,
            rotate: 1.6,
            scaleY: 1.14,
            transformOrigin: '50% 100%',
          })
        }
        if (action) gsap.set(action, { autoAlpha: 0, y: 34 })
        if (details) gsap.set(details, { autoAlpha: 0, y: 28 })
        if (footer) gsap.set(footer, { autoAlpha: 0, y: 22 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: contact,
            start: 'top 62%',
            once: true,
          },
        })

        if (top) tl.to(top, { autoAlpha: 1, y: 0, duration: 0.85, ease: SILK }, 0)
        if (eyebrow) {
          tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.9, ease: SILK }, 0.1)
        }
        if (en) {
          tl.set(en, { visibility: 'visible' }, 0.18).to(
            en,
            {
              opacity: 0.13,
              xPercent: 0,
              scaleX: 1,
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.2,
              ease: EASE,
            },
            0.18,
          )
        }
        if (lines.length) {
          tl.to(
            lines,
            {
              autoAlpha: 1,
              y: 0,
              rotate: 0,
              scaleY: 1,
              duration: 1.25,
              stagger: 0.12,
              ease: EASE,
            },
            0.42,
          )
        }
        if (action) {
          tl.to(action, { autoAlpha: 1, y: 0, duration: 1, ease: SILK }, 0.86)
        }
        if (details) {
          tl.to(details, { autoAlpha: 1, y: 0, duration: 0.9, ease: SILK }, 1.02)
        }
        if (footer) {
          tl.to(footer, { autoAlpha: 1, y: 0, duration: 0.9, ease: SILK }, 1.1)
        }
      }

      /* -------------------------------------------------------
         Remaining small reveals, batched in document order
      ------------------------------------------------------- */
      const generic = gsap.utils
        .toArray('.reveal')
        .filter((element) => !custom.has(element))

      if (generic.length) {
        gsap.set(generic, { autoAlpha: 0, y: 48 })
        ScrollTrigger.batch(generic, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 1.1,
              stagger: 0.08,
              ease: SILK,
              overwrite: true,
            }),
        })
      }
    })

    const lenis = window.__lenis
    lenis?.on('scroll', ScrollTrigger.update)

    const refresh = () => ScrollTrigger.refresh()
    window.__refreshScrollTrigger = refresh
    const refreshTimer = window.setTimeout(refresh, 550)
    window.addEventListener('load', refresh)

    return () => {
      window.clearTimeout(refreshTimer)
      window.removeEventListener('load', refresh)
      lenis?.off('scroll', ScrollTrigger.update)
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      delete window.__refreshScrollTrigger
      root.classList.remove('motion-gsap')
    }
  }, [enabled])

  return null
}

