import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { site } from '../data/site'
import { t } from '../i18n'

const links = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/portfolio', key: 'nav.portfolio' },
  { to: '/services', key: 'nav.services' },
  { to: '/process', key: 'nav.process' },
  { to: '/about', key: 'nav.about' },
  { to: '/faq', key: 'nav.faq' },
]

const linkClass = ({ isActive }) =>
  'text-[0.78rem] uppercase tracking-[0.18em] py-2 border-b transition-colors ' +
  (isActive
    ? 'border-gold text-henna'
    : 'border-transparent text-henna/75 hover:text-henna hover:border-gold/60')

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-gold/30 bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link to="/" className="leading-tight no-underline">
          <span className="block font-serif text-xl font-semibold text-henna sm:text-2xl">
            {site.name}
          </span>
          <span className="block text-[0.62rem] uppercase tracking-[0.26em] text-gold-deep">
            {site.descriptor}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {t(l.key)}
            </NavLink>
          ))}
          <Link to="/book" className="btn btn-primary ml-2">
            {t('nav.book')}
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-gold/50 text-henna lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t('nav.closeMenu') : t('nav.menu')}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-gold/30 bg-ivory px-5 pb-6 pt-3 lg:hidden"
        >
          <ul className="m-0 flex list-none flex-col p-0">
            {links.map((l) => (
              <li key={l.to} className="border-b border-gold/20">
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    'block py-3.5 text-sm uppercase tracking-[0.18em] ' +
                    (isActive ? 'text-gold-deep' : 'text-henna')
                  }
                >
                  {t(l.key)}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/book" className="btn btn-primary mt-5 w-full">
            {t('nav.book')}
          </Link>
        </nav>
      )}
    </header>
  )
}
