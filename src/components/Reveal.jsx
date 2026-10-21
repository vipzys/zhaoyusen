import { useInView } from '../hooks/useInView'

export default function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  style,
  ...rest
}) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
