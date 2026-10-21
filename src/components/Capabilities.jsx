import { capabilities, toolGroups } from '../data/site'
import AnimatedHeading from './AnimatedHeading'
import Reveal from './Reveal'
import { handleCardSpotlight, resetCardSpotlight } from '../hooks/useMotion'

function CurveVisual() {
  return (
    <div className="cap-visual cap-visual--curve">
      <div className="cap-visual__meta">
        <span>RETENTION CURVE</span>
        <strong>+21.4%</strong>
      </div>
      <svg viewBox="0 0 420 180" role="presentation">
        <defs>
          <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff5c35" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#ff5c35" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="curve-grid">
          <path d="M0 20H420M0 65H420M0 110H420M0 155H420" />
          <path d="M70 0V180M140 0V180M210 0V180M280 0V180M350 0V180" />
        </g>
        <path
          className="curve-area"
          d="M0 148 C42 145 62 132 88 136 S132 120 160 122 S202 96 232 102 S270 58 300 63 S346 34 378 42 S404 24 420 18 L420 180 L0 180Z"
          fill="url(#curveFill)"
        />
        <path
          className="curve-line curve-line--ghost"
          d="M0 142 C70 138 100 132 140 126 S220 110 280 102 S360 88 420 78"
        />
        <path
          className="curve-line"
          d="M0 148 C42 145 62 132 88 136 S132 120 160 122 S202 96 232 102 S270 58 300 63 S346 34 378 42 S404 24 420 18"
        />
        <g className="curve-marker">
          <path d="M70 0V180" />
          <circle cx="70" cy="137" r="4" />
        </g>
        <text className="curve-label" x="78" y="28">
          3 SEC / HOOK
        </text>
      </svg>
      <div className="cap-visual__axis">
        <span>00:00</span>
        <span>00:15</span>
        <span>00:30</span>
        <span>00:45</span>
      </div>
    </div>
  )
}

function BarsVisual() {
  const bars = [26, 46, 34, 72, 58, 82, 44, 64, 92, 62, 38, 76, 52, 96, 68, 42, 78, 56, 88, 48, 70, 36, 62, 84, 40, 68, 50, 90, 44, 72, 56, 36]
  return (
    <div className="cap-visual cap-visual--bars">
      <div className="cap-visual__meta">
        <span>RHYTHM MAP</span>
        <strong>00:42</strong>
      </div>
      <div className="rhythm-bars" aria-hidden="true">
        {bars.map((height, index) => (
          <i
            key={`${height}-${index}`}
            style={{ height: `${height}%`, '--delay': `${index * 32}ms` }}
          />
        ))}
      </div>
      <div className="rhythm-foot">
        <span>CUT</span>
        <i />
        <span>BREATHE</span>
        <i />
        <span>CUT</span>
      </div>
    </div>
  )
}

function TimelineVisual() {
  return (
    <div className="cap-visual cap-visual--timeline">
      <div className="cap-visual__meta">
        <span>ASSEMBLY / 90 EPS</span>
        <strong>LOCKED</strong>
      </div>
      <div className="mini-timeline" aria-hidden="true">
        <div className="mini-timeline__ruler">
          {['00', '15', '30', '45', '60', '75'].map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>
        <div className="mini-timeline__row">
          <span className="mini-timeline__label">V1</span>
          <div style={{ width: '38%' }}>
            <i style={{ width: '100%' }} />
          </div>
          <div style={{ width: '26%' }}>
            <i style={{ width: '100%' }} />
          </div>
          <div style={{ width: '20%' }}>
            <i style={{ width: '100%' }} />
          </div>
          <div style={{ width: '16%' }}>
            <i style={{ width: '100%' }} />
          </div>
        </div>
        <div className="mini-timeline__row">
          <span className="mini-timeline__label">V2</span>
          <div style={{ width: '12%' }}>
            <i style={{ width: '100%' }} />
          </div>
          <div style={{ width: '52%' }}>
            <i style={{ width: '100%' }} />
          </div>
          <div style={{ width: '36%' }}>
            <i style={{ width: '100%' }} />
          </div>
        </div>
        <div className="mini-timeline__row mini-timeline__row--audio">
          <span className="mini-timeline__label">A1</span>
          <div style={{ width: '100%' }}>
            <span className="mini-timeline__wave" />
          </div>
        </div>
        <span className="mini-timeline__playhead" />
      </div>
    </div>
  )
}

function SoundVisual() {
  return (
    <div className="cap-visual cap-visual--sound">
      <div className="sound-dial">
        <i />
        <i />
        <i />
        <div className="sound-dial__core">
          <strong>−6.2</strong>
          <span>dB</span>
        </div>
      </div>
      <div className="sound-eq" aria-hidden="true">
        {[54, 82, 42, 68, 92, 48, 74, 36, 62, 88, 44, 70].map((height, index) => (
          <i key={`${height}-${index}`} style={{ height: `${height}%` }} />
        ))}
      </div>
      <div className="cap-visual__axis">
        <span>SCORE</span>
        <span>AMBIENCE</span>
        <span>SILENCE</span>
      </div>
    </div>
  )
}

function PipelineVisual() {
  return (
    <div className="cap-visual cap-visual--pipeline">
      <div className="pipeline">
        {['INGEST', 'ASSEMBLY', 'SOUND', 'MASTER'].map((step, index) => (
          <div className="pipeline__step" key={step}>
            <span>0{index + 1}</span>
            <i />
            <strong>{step}</strong>
          </div>
        ))}
      </div>
      <div className="pipeline__chips">
        <span>AUTO CAPTION</span>
        <span>SMART SEARCH</span>
      </div>
    </div>
  )
}

const visuals = {
  curve: CurveVisual,
  bars: BarsVisual,
  timeline: TimelineVisual,
  sound: SoundVisual,
  pipeline: PipelineVisual,
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="section capabilities">
      <div className="container">
        <div className="section-head">
          <Reveal className="section-head__meta">
            <span className="section-head__index">04</span>
            <span>WHAT I BRING / 个人优势</span>
            <span className="section-head__line" />
            <span>05 STRENGTHS</span>
          </Reveal>
          <div className="section-head__row">
            <AnimatedHeading
              en="CAPABILITIES"
              lines={[
                <>一个人的主剪位，</>,
                <>
                  一整个<em>后期组</em>的手速。
                </>,
              ]}
              className="section-title"
            />
            <Reveal className="section-head__aside" delay={120}>
              <span className="eyebrow">FAST. PRECISE. UNCOMPROMISING.</span>
              <p>
                快不是目的，快是为了把更多时间留给判断。
                在有限周期里，做出不妥协的完成度。
              </p>
            </Reveal>
          </div>
        </div>

        <div className="cap__grid">
          {capabilities.map((capability, index) => {
            const Visual = visuals[capability.visual]
            return (
              <Reveal
                as="article"
                key={capability.index}
                className={`cap cap--${capability.size}`}
                delay={index * 70}
                onPointerMove={handleCardSpotlight}
                onPointerLeave={resetCardSpotlight}
              >
                <div className="cap__head">
                  <span className="cap__index">{capability.index}</span>
                  <span className="cap__en">{capability.en}</span>
                  <span className="cap__dot" />
                </div>

                <div className="cap__visual-wrap">
                  <Visual />
                </div>

                <div className="cap__body">
                  <h3>{capability.title}</h3>
                  <p>{capability.copy}</p>
                </div>

                <div className="cap__tags">
                  {capability.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="tools">
          <div className="tools__label">
            <span>TOOLS / 使用工具</span>
            <span>06</span>
          </div>

          <div className="tools__groups">
            {toolGroups.map((group) => (
              <div className="tools__group" key={group.title}>
                <div className="tools__group-head">
                  <span>{group.title}</span>
                  <strong>{group.en}</strong>
                </div>
                <div className="tools__list">
                  {group.items.map((tool, index) => (
                    <span key={tool}>
                      <i>{String(index + 1).padStart(2, '0')}</i>
                      <strong>{tool}</strong>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
