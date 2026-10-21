import { useEffect, useRef } from 'react'

export function useParallax(speed = 0.06, limit = 34) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let frame = 0

    const update = () => {
      const rect = node.getBoundingClientRect()
      if (rect.bottom < -120 || rect.top > window.innerHeight + 120) return

      const distance = window.innerHeight / 2 - (rect.top + rect.height / 2)
      const offset = Math.max(-limit, Math.min(limit, distance * speed))
      node.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`)
    }

    const request = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }

    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)

    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      cancelAnimationFrame(frame)
    }
  }, [speed, limit])

  return ref
}

export function useMagnetic(strength = 0.18) {
  return {
    onPointerMove(event) {
      if (event.pointerType === 'touch') return
      const node = event.currentTarget
      const rect = node.getBoundingClientRect()
      const x = (event.clientX - (rect.left + rect.width / 2)) * strength
      const y = (event.clientY - (rect.top + rect.height / 2)) * strength
      node.style.setProperty('--mag-x', `${x.toFixed(2)}px`)
      node.style.setProperty('--mag-y', `${y.toFixed(2)}px`)
    },
    onPointerLeave(event) {
      const node = event.currentTarget
      node.style.setProperty('--mag-x', '0px')
      node.style.setProperty('--mag-y', '0px')
    },
  }
}

export function handleCardSpotlight(event) {
  if (event.pointerType === 'touch') return
  const node = event.currentTarget
  const rect = node.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  node.style.setProperty('--spot-x', `${x}px`)
  node.style.setProperty('--spot-y', `${y}px`)
  node.style.setProperty('--tilt-x', `${(((y / rect.height) - 0.5) * -1.4).toFixed(2)}deg`)
  node.style.setProperty('--tilt-y', `${(((x / rect.width) - 0.5) * 1.4).toFixed(2)}deg`)
}

export function resetCardSpotlight(event) {
  const node = event.currentTarget
  node.style.setProperty('--tilt-x', '0deg')
  node.style.setProperty('--tilt-y', '0deg')
  node.style.setProperty('--spot-x', '50%')
  node.style.setProperty('--spot-y', '50%')
}
