import { useEffect, useState } from 'react'

export default function CopyButton({
  value,
  children,
  className = '',
  copiedLabel = '已复制',
  defaultLabel = '复制',
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timeout)
  }, [copied])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const input = document.createElement('textarea')
      input.value = value
      input.style.position = 'fixed'
      input.style.opacity = '0'
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input.remove()
    }
    setCopied(true)
  }

  return (
    <button
      type="button"
      className={`copy-button ${className}`}
      onClick={handleCopy}
      data-cursor={copied ? copiedLabel : defaultLabel}
      aria-label={`复制 ${value}`}
    >
      {children}
      <span className="copy-button__state" aria-live="polite">
        {copied ? copiedLabel : defaultLabel}
      </span>
    </button>
  )
}
