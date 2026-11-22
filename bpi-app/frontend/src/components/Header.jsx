import { useState, useEffect } from 'react'

const navItems = [
  'Personal Banking',
  'Wealth Management',
  'SME Banking',
  'Institutional Banking',
  'About BPI',
]

/* Proper search SVG from the spec */
function SearchIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path
        d="M15.5006 14.0006H14.7106L14.4306 13.7306C15.6306 12.3306 16.2506 10.4206
           15.9106 8.39063C15.4406 5.61063 13.1206 3.39063 10.3206 3.05063C6.09063
           2.53063 2.53063 6.09063 3.05063 10.3206C3.39063 13.1206 5.61063 15.4406
           8.39063 15.9106C10.4206 16.2506 12.3306 15.6306 13.7306 14.4306L14.0006
           14.7106V15.5006L18.2506 19.7506C18.6606 20.1606 19.3306 20.1606 19.7406
           19.7506C20.1506 19.3406 20.1506 18.6706 19.7406 18.2606L15.5006 14.0006ZM9.50063
           14.0006C7.01063 14.0006 5.00063 11.9906 5.00063 9.50063C5.00063 7.01063 7.01063
           5.00063 9.50063 5.00063C11.9906 5.00063 14.0006 7.01063 14.0006 9.50063C14.0006
           11.9906 11.9906 14.0006 9.50063 14.0006Z"
        fill={color}
      />
    </svg>
  )
}

export default function Header({ onLoginClick }) {
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const textColor  = atTop ? '#fff' : '#111'
  const dimColor   = atTop ? 'rgba(255,255,255,0.75)' : '#666'
  const iconColor  = atTop ? '#fff' : '#9b1b2a'

  return (
    <nav className="navbar" style={{
      background:   atTop ? 'transparent' : '#fff',
      borderBottom: atTop ? 'none' : '1px solid #e0e0e0',
      transition:   'background .25s, border-color .25s',
    }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>

        {/* ── BPI logo ── */}
        <div className="nav-brand">
          {atTop ? (
            /* Over video: white SVG reverse logo */
            <img
              src="/images/BPI_RT__96x42_header_Reverse.svg"
              alt="BPI"
              style={{ height: 42, display: 'block' }}
            />
          ) : (
            /* Scrolled: gold crest + red BPI text */
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#c9a51b', fontSize: 28, lineHeight: 1 }}>♛</span>
              <span style={{ color: '#9b1b2a', fontSize: 26, fontWeight: 800, letterSpacing: '-1px', lineHeight: 1 }}>BPI</span>
            </div>
          )}
        </div>

        {/* ── Nav links — centred in the remaining space ── */}
        <div className="nav-links">
          {navItems.map(item => (
            <a key={item} className="nav-item" style={{ color: textColor }}>
              {item}
              <svg width="10" height="10" viewBox="0 0 10 6" fill="none"
                style={{ marginLeft: 4, flexShrink: 0 }}>
                <path d="M1 1l4 4 4-4" stroke={dimColor} strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
        </div>

        {/* ── Right: search + LOGIN ── */}
        <div className="nav-right">
          <button className="nav-search-btn" aria-label="Search">
            <SearchIcon color={iconColor} />
          </button>

          <button
            className="nav-login"
            onClick={onLoginClick}
            style={atTop
              ? { background: 'transparent', border: '1.5px solid #fff', color: '#fff' }
              : { background: '#b71c2e',      border: '1.5px solid #b71c2e', color: '#fff' }}
          >
            LOGIN
          </button>
        </div>

      </div>
    </nav>
  )
}
