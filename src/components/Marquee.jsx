const words = ['HOOK', 'RHYTHM', 'EMOTION', 'RETENTION', 'STORY', 'CUT']

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1, 2, 3].map((copy) => (
          <div className="marquee__group" key={copy}>
            {words.map((word) => (
              <span className="marquee__item" key={`${copy}-${word}`}>
                {word}
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
