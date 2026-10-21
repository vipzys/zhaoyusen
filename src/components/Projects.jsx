import { projects } from '../data/site'
import AnimatedHeading from './AnimatedHeading'
import Reveal from './Reveal'
import { ArrowUpRight, PlayMark } from './Icons'
import {
  handleCardSpotlight,
  resetCardSpotlight,
  useParallax,
} from '../hooks/useMotion'

function ProjectCard({ project, index }) {
  const mediaRef = useParallax(0.07, 34)

  return (
    <Reveal
      as="article"
      className={`project project--${project.variant}`}
      delay={index * 80}
    >
      <a
        className="project__media"
        href="#archive"
        aria-label="打开完整作品集（百度网盘）"
        ref={mediaRef}
        onPointerMove={handleCardSpotlight}
        onPointerLeave={resetCardSpotlight}
      >
        {project.variant === 'wide' && (
          <span
            className="project__backdrop"
            style={{ backgroundImage: `url(${project.image})` }}
            aria-hidden="true"
          />
        )}
        <img src={project.image} alt={project.alt} loading="lazy" />
        <span className="project__wash" />
        <span className="project__glow" aria-hidden="true" />

        <span className="project__top">
          <span className="project__index">{project.index}</span>
          <span className="project__format">{project.format}</span>
        </span>

        <span className="project__arrow">
          <ArrowUpRight size={22} />
        </span>

        <span className="project__hover">
          <PlayMark size={9} />
          VIEW FULL ARCHIVE
        </span>

        <span className="project__lower">
          <span className="project__genre">
            {project.genre} <i /> {project.role}
          </span>
          <span className="project__name">
            <strong>{project.title}</strong>
            <em>{project.en}</em>
          </span>
        </span>

        <span className="project__corner" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      </a>

      <div className="project__foot">
        <p>{project.description}</p>
        <div className="project__result">
          <span>{project.statLabel}</span>
          <strong>{project.stat}</strong>
        </div>
      </div>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-head section-head--projects">
          <Reveal className="section-head__meta">
            <span className="section-head__index">02</span>
            <span>SELECTED WORK / 精选项目</span>
            <span className="section-head__line" />
            <span>03 FEATURED</span>
          </Reveal>
          <div className="section-head__row">
            <AnimatedHeading
              en="SELECTED"
              lines={[
                <>被看见的，</>,
                <>
                  是<em>最后那一剪刀</em>。
                </>,
              ]}
              className="section-title"
            />
            <Reveal className="section-head__aside" delay={120}>
              <span className="eyebrow">A CUT IS A DECISION</span>
              <p>
                不是每一帧都要用力，但每一秒都要有用。
                以下是我参与主剪的部分 AI / 真人短剧，数据来自红果、抖音与绿泡泡。
              </p>
            </Reveal>
          </div>
        </div>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
