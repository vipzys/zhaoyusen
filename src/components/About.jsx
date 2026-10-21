import { site, experience, education, stats } from '../data/site'
import AnimatedHeading from './AnimatedHeading'
import Counter from './Counter'
import Reveal from './Reveal'
import { useParallax } from '../hooks/useMotion'

export default function About() {
  const portraitRef = useParallax(0.03, 12)

  return (
    <section id="profile" className="section about">
      <div className="container">
        <div className="section-head">
          <Reveal className="section-head__meta">
            <span className="section-head__index">01</span>
            <span>PROFILE / 关于我</span>
            <span className="section-head__line" />
            <span>REMOTE · CN</span>
          </Reveal>
          <div className="section-head__row">
            <AnimatedHeading
              en="PROFILE"
              lines={[
                <>我剪的不是片段，</>,
                <>
                  是<em>你看下去</em>的理由。
                </>,
              ]}
              className="section-title"
            />
            <Reveal className="section-head__aside" delay={120}>
              <span className="eyebrow">TWO YEARS IN THE CUTTING ROOM</span>
              <p>
                从短剧后期到独立主剪，我一直在做同一件事：
                在观众准备划走之前，再给他们一个留下来的理由。
              </p>
            </Reveal>
          </div>
        </div>

        <div className="about__grid">
          <div className="about__visual">
            <Reveal className="portrait-wrap">
              <figure
                className="portrait"
                data-cursor={site.nameCn}
                ref={portraitRef}
              >
                <img
                  src="/images/about-portrait.jpg"
                  alt={`${site.nameCn}的人物肖像`}
                />
                <span className="portrait__scan" aria-hidden="true" />
                <div className="portrait__tint" />
                <div className="portrait__frame" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <span className="portrait__rec">
                  <i /> REC 00:03:42:18
                </span>
                <figcaption className="portrait__caption">
                  <div>
                    <strong>{site.nameCn} / 一卡主剪</strong>
                    <span>EDITOR & STORY DOCTOR</span>
                  </div>
                  <span className="portrait__code">STILL—001</span>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal className="about__visual-foot" delay={140}>
              <span>FRAME 001 / ON SET</span>
              <p>
                大多数时间，我坐在屏幕前。
                <br />
                但故事，永远发生在观众那一边。
              </p>
            </Reveal>
          </div>

          <div className="about__body">
            <Reveal>
              <p className="about__lead">
                你好，我是<strong>{site.nameCn}</strong>，
                <br />
                一名专注竖屏短剧的<em>一卡主剪</em>，现居{site.city}。
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="about__copy">
                <p>
                  从一卡开篇到二卡、三卡全环节，我习惯一个人把一条叙事线从头守到尾。
                  比起堆砌技巧，我更在意每 3 秒有没有新信息、每 10 秒有没有情绪推进，
                  以及每一集结尾，能不能让人点开下一集。
                </p>
                <p>
                  2 年+ 短剧后期经验，参与 80+ 部真人 / AI 短剧，服务过短剧厂牌与平台。
                  熟悉红果、抖音的内容节奏，也能独立跑通 AI 短剧工作流；单月最高交付 25+ 部。
                </p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="experience">
                <div className="experience__head">
                  <span>CAREER / 2024 — NOW</span>
                  <span>03 CHAPTERS</span>
                </div>
                {experience.map((item) => (
                  <div className="experience__item" key={item.period}>
                    <span className="experience__period">{item.period}</span>
                    <div className="experience__content">
                      <div className="experience__title">
                        <h3>{item.title}</h3>
                        <span>{item.detail}</span>
                      </div>
                      <p>{item.note}</p>
                    </div>
                  </div>
                ))}
                <div className="education">
                  <span className="education__tag">教育经历</span>
                  <span className="education__period">{education.period}</span>
                  <div className="education__main">
                    <strong>{education.school}</strong>
                    <span>{education.major}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="about__stats">
          {stats.map((stat, index) => (
            <Reveal className="stat" key={stat.label} delay={index * 80}>
              <div className="stat__top">
                <span>0{index + 1}</span>
                <span>{stat.note}</span>
              </div>
              <div className="stat__value">
                <Counter value={stat.value} suffix={stat.suffix} />
                {stat.unit && <small>{stat.unit}</small>}
              </div>
              <div className="stat__label">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
