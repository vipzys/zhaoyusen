import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

const mediaItems = [
  ['A001', 'C001', '12:04'],
  ['A001', 'C002', '08:16'],
  ['A002', 'C001', '21:09'],
  ['A002', 'C003', '14:22'],
  ['B001', 'C002', '09:11'],
  ['B002', 'C004', '17:06'],
]

const tracks = [
  {
    label: 'V2',
    clips: [
      [16, 'accent'],
      [9, ''],
      [24, 'strong'],
      [7, ''],
      [18, 'accent'],
      [12, ''],
      [14, 'strong'],
    ],
  },
  {
    label: 'V1',
    clips: [
      [22, 'strong'],
      [6, ''],
      [18, 'accent'],
      [5, ''],
      [26, 'strong'],
      [8, ''],
      [15, ''],
    ],
  },
  {
    label: 'A1',
    clips: [
      [30, 'audio'],
      [12, ''],
      [24, 'audio'],
      [8, ''],
      [18, 'audio'],
      [8, ''],
    ],
  },
  {
    label: 'A2',
    clips: [
      [14, 'audio'],
      [22, ''],
      [9, 'audio'],
      [30, ''],
      [6, 'audio'],
      [19, ''],
    ],
  },
]

export default function Loader({ onComplete }) {
  const rootRef = useRef(null)
  const progressRef = useRef(null)
  const screenProgressRef = useRef(null)
  const timecodeRef = useRef(null)
  const completeRef = useRef(onComplete)

  useEffect(() => {
    completeRef.current = onComplete
  }, [onComplete])

  useLayoutEffect(() => {
    let finished = false

    const finish = () => {
      if (finished) return
      finished = true
      completeRef.current?.()
    }

    const fallback = window.setTimeout(finish, 6500)
    const progressValue = { value: 0 }
    const totalFrames = 12 * 25 + 8

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: finish,
      })

      gsap.set('.intro__bar, .intro__bin, .intro__monitor, .intro__inspector', {
        autoAlpha: 0,
        y: 12,
      })
      gsap.set('.intro__clip', { scaleX: 0, transformOrigin: 'left center' })
      gsap.set('.intro__media', { autoAlpha: 0, x: -12 })
      gsap.set('.intro__play', { autoAlpha: 0, scale: 0.72 })
      gsap.set('.intro__progress span', {
        scaleX: 0,
        transformOrigin: 'left center',
      })

      tl.to('.intro__bar', { autoAlpha: 1, y: 0, duration: 0.5 }, 0)
        .to(
          '.intro__bin, .intro__monitor, .intro__inspector',
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06 },
          0.12,
        )
        .to(
          '.intro__media',
          { autoAlpha: 1, x: 0, duration: 0.42, stagger: 0.055 },
          0.34,
        )
        .to(
          '.intro__clip',
          {
            scaleX: 1,
            duration: 0.42,
            stagger: 0.05,
            ease: 'power2.out',
          },
          0.5,
        )
        .to(
          progressValue,
          {
            value: 100,
            duration: 2.15,
            ease: 'power1.inOut',
            onUpdate: () => {
              const percent = Math.round(progressValue.value)
              if (progressRef.current) {
                progressRef.current.textContent = `${String(percent).padStart(3, '0')}%`
              }
              if (screenProgressRef.current) {
                screenProgressRef.current.textContent = `${String(percent).padStart(3, '0')}%`
              }
              if (timecodeRef.current) {
                const frames = Math.round((percent / 100) * totalFrames)
                const seconds = Math.floor(frames / 25)
                const frame = frames % 25
                timecodeRef.current.textContent = `00:00:${String(seconds).padStart(2, '0')}:${String(frame).padStart(2, '0')}`
              }
            },
          },
          0.35,
        )
        .to(
          '.intro__playhead',
          { left: '100%', duration: 2.15, ease: 'power1.inOut' },
          0.35,
        )
        .to(
          '.intro__progress span',
          { scaleX: 1, duration: 2.15, ease: 'power1.inOut' },
          0.35,
        )
        .to(
          '.intro__meter i',
          {
            scaleY: 0.7,
            duration: 0.45,
            stagger: 0.05,
            repeat: 2,
            yoyo: true,
            ease: 'sine.inOut',
          },
          0.45,
        )
        .to(
          '.intro__editor',
          {
            autoAlpha: 0,
            scale: 0.97,
            filter: 'blur(5px)',
            duration: 0.5,
            ease: 'power2.inOut',
          },
          2.7,
        )
        .to(
          '.intro__play',
          { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'power4.out' },
          2.92,
        )
        .to(
          '.intro__play',
          { scale: 1.04, duration: 0.24, ease: 'power2.inOut' },
          3.58,
        )
        .to(
          rootRef.current,
          { autoAlpha: 0, duration: 0.55, ease: 'power2.inOut' },
          3.72,
        )
        .call(finish, [], 4.25)
    }, rootRef)

    return () => {
      window.clearTimeout(fallback)
      ctx.revert()
    }
  }, [])

  return (
    <div className="intro" ref={rootRef} aria-hidden="true">
      <div className="intro__editor">
        <header className="intro__bar">
          <div className="intro__brand">
            <strong>赵渝森</strong>
            <span>EDIT / DESK</span>
          </div>
          <div className="intro__project">
            <span>SEQ_01</span>
            <strong>SHORT_DRAMA_MASTER</strong>
            <i>1080 × 1920</i>
          </div>
          <div className="intro__status">
            <i />
            RENDER / <span ref={progressRef}>000%</span>
          </div>
        </header>

        <div className="intro__body">
          <aside className="intro__bin intro__panel">
            <div className="intro__panel-head">
              <span>PROJECT</span>
              <span>MEDIA</span>
            </div>
            <div className="intro__bin-list">
              {mediaItems.map(([reel, clip, duration]) => (
                <div className="intro__media" key={`${reel}-${clip}`}>
                  <span className="intro__thumb">
                    <i />
                  </span>
                  <span className="intro__media-name">
                    <strong>
                      {reel} / {clip}
                    </strong>
                    <span>MP4 · 25 FPS</span>
                  </span>
                  <span className="intro__media-time">{duration}</span>
                </div>
              ))}
            </div>
            <div className="intro__bin-foot">
              <span>06 CLIPS</span>
              <span>9.4 GB</span>
            </div>
          </aside>

          <main className="intro__monitor intro__panel">
            <div className="intro__panel-head">
              <span>PROGRAM / V1</span>
              <span>PREVIEW</span>
            </div>
            <div className="intro__screen">
              <div className="intro__screen-grid" />
              <div className="intro__screen-corners" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
              <span className="intro__screen-label">
                ZHAOYUSEN / CUT_001
              </span>
              <span className="intro__screen-render">
                <strong ref={screenProgressRef}>000%</strong>
                <span>RENDERING</span>
              </span>
            </div>
            <div className="intro__monitor-foot">
              <span>
                TC <strong ref={timecodeRef}>00:00:00:00</strong>
              </span>
              <span>1920 × 1080 / 25</span>
              <span>COLOR / REC.709</span>
            </div>
          </main>

          <aside className="intro__inspector intro__panel">
            <div className="intro__panel-head">
              <span>INSPECTOR</span>
              <span>01</span>
            </div>
            <div className="intro__inspect-list">
              <div>
                <span>RESOLUTION</span>
                <strong>1080 × 1920</strong>
              </div>
              <div>
                <span>SEQUENCE</span>
                <strong>SEQ_01</strong>
              </div>
              <div>
                <span>CODEC</span>
                <strong>H.264</strong>
              </div>
              <div>
                <span>FRAME RATE</span>
                <strong>25 FPS</strong>
              </div>
            </div>
            <div className="intro__audio">
              <span>AUDIO / dB</span>
              <div className="intro__meter">
                {[0.82, 0.45, 0.68, 0.92, 0.36, 0.58, 0.74, 0.42].map(
                  (height, index) => (
                    <i key={index} style={{ '--h': height }} />
                  ),
                )}
              </div>
              <strong>−6.2</strong>
            </div>
          </aside>
        </div>

        <footer className="intro__timeline">
          <div className="intro__timeline-head">
            <span>TIMELINE / SEQ_01</span>
            <span>00:00:12:08 / 25 FPS</span>
          </div>
          <div className="intro__ruler">
            {['00:00', '00:03', '00:06', '00:09', '00:12', '00:15'].map(
              (tick) => (
                <span key={tick}>{tick}</span>
              ),
            )}
          </div>
          <div className="intro__tracks">
            <span className="intro__playhead" aria-hidden="true" />
            {tracks.map((track) => (
              <div className="intro__track" key={track.label}>
                <span className="intro__track-label">{track.label}</span>
                <div className="intro__lane">
                  {track.clips.map(([width, tone], index) => (
                    <i
                      key={`${track.label}-${index}`}
                      className={`intro__clip ${tone ? `is-${tone}` : ''}`}
                      style={{ width: `${width}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="intro__progress">
            <span />
          </div>
        </footer>
      </div>

      <div className="intro__play">
        <span className="intro__play-disc">
          <i />
        </span>
        <span className="intro__play-label">PLAY / 进入个人页面</span>
      </div>
    </div>
  )
}
