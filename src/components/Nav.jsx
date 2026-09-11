import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { org, event } from '../data/site.js'

const LINKS = [
  { to: '/fresh-fire', label: 'Fresh Fire 2026' },
  { to: '/about', label: 'About' },
  { to: '/mentorship', label: 'Mentoring' },
  { to: '/editions', label: 'Editions' },
  { to: '/serve', label: 'Serve' },
]

function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'system'
  )

  useEffect(() => {
    if (theme === 'system') document.documentElement.removeAttribute('data-theme')
    else document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      className="icon-btn"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="nav__in">
        <Link className="nav__brand" to="/" onClick={() => setOpen(false)}
              aria-label={`${org.short} — home`}>
          {/* The flame mark reads at 30px; the full lockup does not,
              so the wordmark stays typographic up here and the
              complete logo sits in the footer and on /about. */}
          <img className="mark" src="/images/yecef-mark.png" alt="" width="23" height="30" />
          <span className="words">
            <b>YECEF</b>
            <span>Global</span>
          </span>
        </Link>

        <nav className={`nav__links${open ? ' is-open' : ''}`} aria-label="Main">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className="nav__link" onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/give" className="nav__link" onClick={() => setOpen(false)}>
            Partner
          </NavLink>
        </nav>

        <div className="nav__actions">
          <ThemeToggle />
          <button
            className="icon-btn nav__toggle"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open
                ? <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>
                : <><path d="M3 7h18" /><path d="M3 12h18" /><path d="M3 17h18" /></>}
            </svg>
          </button>
          <a className="btn btn--ember btn--sm" href={event.registerUrl}
             target="_blank" rel="noopener noreferrer">
            Reserve a seat
          </a>
        </div>
      </div>
      <span className="visually-hidden">{org.name}</span>
    </header>
  )
}
