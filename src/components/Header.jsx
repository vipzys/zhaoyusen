import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { ArrowUpRight } from './Icons'
import { useMagnetic } from '../hooks/useMotion'

export default function Header({ active }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const magnetic = useMagnetic(0.12)
  const navItems = site.nav.filter((item) => item.id !== 'contact')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (open) window.__lenis?.stop()
    else window.__lenis?.start()
    return () => document.body.classList.remove('menu-open')
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="header__inner container">
        <a
          className="brand"
          href="#top"
          onClick={close}
          aria-label={`${site.brand} 首页`}
        >
          <span className="brand__mark">{site.brand}</span>
          <span className="brand__sub">{site.brandCn}</span>
        </a>

        <nav className="nav" aria-label="主导航">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav__link ${active === item.id ? 'is-active' : ''}`}
              onClick={close}
            >
              <span className="nav__index">{item.index}</span>
              <span className="nav__label" data-text={item.label}>
                <span>{item.label}</span>
              </span>
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <span className="header__status">
            <i />
            AVAILABLE
          </span>
          <a
            className="header__cta"
            href="#contact"
            onClick={close}
            {...magnetic}
          >
            联系我
            <span className="header__cta-icon">
              <ArrowUpRight size={15} />
            </span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? '关闭菜单' : '打开菜单'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="mobile-menu" aria-hidden={!open}>
        <div className="mobile-menu__inner container">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={close}>
              <span>{item.index}</span>
              {item.label}
              <ArrowUpRight size={22} />
            </a>
          ))}
          <div className="mobile-menu__foot">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>{site.city} · 中国</span>
          </div>
        </div>
      </div>
    </header>
  )
}
