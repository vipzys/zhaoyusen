import { useInView } from '../hooks/useInView'

export default function AnimatedHeading({
  as: Tag = 'h2',
  lines,
  className = '',
  delay = 0,
  en,
}) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    rootMargin: '0px 0px -8% 0px',
  })

  return (
    <div className="heading-block">
      {en && (
        <span className="heading-block__en" aria-hidden="true">
          <span>{en}</span>
        </span>
      )}
      <Tag
        ref={ref}
        className={`animated-heading ${inView ? 'is-visible' : ''} ${className}`}
      >
        {lines.map((line, index) => (
          <span className="animated-heading__line" key={index}>
            <span
              className="animated-heading__inner"
              style={{ transitionDelay: `${delay + index * 105}ms` }}
            >
              {line}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  )
}
