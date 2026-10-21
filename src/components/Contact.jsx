import { site } from '../data/site'
import AnimatedHeading from './AnimatedHeading'
import CopyButton from './CopyButton'
import Reveal from './Reveal'
import { ArrowUpRight } from './Icons'
import { useMagnetic } from '../hooks/useMotion'

export default function Contact() {
  const magnetic = useMagnetic(0.18)

  return (
    <section id="contact" className="contact">
      <div className="contact__bg" aria-hidden="true">
        <div className="contact__orb" />
        <div className="contact__still" />
        <div className="contact__grid-lines" />
      </div>

      <div className="container contact__inner">
        <Reveal className="contact__top">
          <span>
            <i className="status-dot" />
            05 / CONTACT
          </span>
          <span>ZHENGZHOU / OPEN FOR PROJECTS</span>
          <span>RESPONSE WITHIN 24H</span>
        </Reveal>

        <div className="contact__main">
          <div className="contact__headline">
            <Reveal>
              <p className="contact__eyebrow">下一部戏，从一条消息开始</p>
            </Reveal>
            <AnimatedHeading
              as="h2"
              className="contact__title"
              en="CONTACT"
              lines={[
                <>下一部，</>,
                <>
                  <em>爆款</em>见<b>。</b>
                </>,
              ]}
            />
          </div>

          <Reveal className="contact__action" delay={160}>
            <div className="contact__mail-block">
              <span className="contact__label">DROP ME A LINE</span>
              <a
                className="contact__mail"
                href={`mailto:${site.email}`}
                data-cursor="写信"
                {...magnetic}
              >
                {site.email}
                <span>
                  <ArrowUpRight size={26} />
                </span>
              </a>

              <div className="contact__mail contact__mail--wechat" {...magnetic}>
                {site.wechat}
                <span className="contact__wechat-badge" aria-hidden="true">
                  WX
                </span>
              </div>
            </div>

            <div className="contact__secondary">
              <div className="contact__copy-group">
                <CopyButton
                  value={site.email}
                  className="contact__copy"
                  defaultLabel="复制邮箱"
                  copiedLabel="邮箱已复制"
                />
                <CopyButton
                  value={site.wechat}
                  className="contact__copy"
                  defaultLabel="复制微信"
                  copiedLabel="微信已复制"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="contact__giant" aria-hidden="true">
        {site.brand}
      </div>
    </section>
  )
}
