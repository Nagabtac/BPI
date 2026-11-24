import { useState } from 'react'

export default function LoginPage({ onBack, onLogin, onRegister }) {
  const [showPw, setShowPw] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [btnHover, setBtnHover] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (res.ok) {
        onLogin(data)
      } else {
        setError(data.error || 'Invalid username or password.')
      }
    } catch {
      // Backend not reachable — fall back to demo credentials
      if (username === 'demo' && password === 'demo123') {
        onLogin({ username: 'demo', firstName: 'Juan', lastName: 'Dela Cruz', email: 'juan.delacruz@email.com' })
      } else {
        setError('Cannot reach server. Use demo / demo123 to test offline.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={S.root}>
      <aside style={S.aside}>
        <div style={S.topBar}>
          <a onClick={onBack} style={S.logoWrap}>
            <span style={S.logoBpi}>BPI</span>
          </a>
        </div>

        <h2 style={S.welcome}>Welcome!</h2>

        <form style={S.form} onSubmit={handleSubmit}>
          {/* Username */}
          <div style={S.inputControl}>
            <div style={S.inputField}>
              <input
                id="username"
                type="text"
                placeholder="Username"
                autoComplete="off"
                maxLength={12}
                value={username}
                onChange={e => setUsername(e.target.value)}
                style={S.input}
              />
              <label style={S.inputLabel}>Username</label>
            </div>
            {username && (
              <span style={S.clearIcon} onClick={() => setUsername('')} title="Clear">✕</span>
            )}
          </div>

          {/* Password */}
          <div style={{ ...S.inputControl, marginBottom: 4 }}>
            <div style={S.inputField}>
              <input
                id="password"
                type={showPw ? 'text' : 'password'}
                placeholder="Password"
                autoComplete="off"
                maxLength={20}
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ ...S.input, paddingRight: 48 }}
              />
              <label style={S.inputLabel}>Password</label>
            </div>
            <button
              type="button"
              style={S.eyeBtn}
              onClick={() => setShowPw(s => !s)}
              aria-label="Show/hide password"
            >
              {showPw ? (
                <svg viewBox="0 0 24 24" style={S.eyeSvg}>
                  <path d="M2.5 12s3.4-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.4 6.5-9.5 6.5S2.5 12 2.5 12Z"
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" style={S.eyeSvg}>
                  <path d="M2.5 12s3.4-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.4 6.5-9.5 6.5S2.5 12 2.5 12Z"
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="m4 4 16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M9.8 9.8a3.1 3.1 0 0 0 4.4 4.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                </svg>
              )}
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div style={{ color: '#d9363d', fontSize: 13, marginTop: 8, marginBottom: 4 }}>
              {error}
            </div>
          )}

          {/* Log in button */}
          <div style={{ marginTop: 16 }}>
            <button
              type="submit"
              style={{
                ...S.primaryBtn,
                ...(btnHover && username && password ? S.primaryBtnHover : {}),
                opacity: username && password ? 1 : 0.55,
              }}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              disabled={loading}
            >
              {loading ? 'Logging in…' : 'Log in'}
            </button>
          </div>
        </form>

        <div style={S.forgotRow}>
          Forgot <a href="#" style={S.bodyLink}>username</a>
          <span> or </span>
          <a href="#" style={S.bodyLink}>password</a>
        </div>

        <div style={S.orDiv}>
          <span style={S.orLine} />
          <span style={S.orWord}>OR</span>
          <span style={S.orLine} />
        </div>

        <button style={S.secondaryBtn} onClick={onRegister}>
          <span>Register now</span>
        </button>

        <div style={{ marginTop: 16 }}>
          <div style={S.inquiryRow}>
            <img src="/images/sidebar-lock-account.svg" alt="lock" style={S.inquiryIcon} />
            <div style={{ flex: 1 }}>
              <h6 style={S.inquiryTitle}>Lock my access</h6>
              <span style={S.inquirySubtitle}>Lost/hacked account? Secure it now</span>
            </div>
            <span style={S.chevronRight}>›</span>
          </div>

          <div style={S.inquiryRow}>
            <img src="/images/sidebar-show-inquiry.svg" alt="inquiry" style={S.inquiryIcon} />
            <h6 style={{ ...S.inquiryTitle, margin: 0, flex: 1 }}>
              Show inquiry and other services
            </h6>
            <span style={S.chevronRight}>›</span>
          </div>
        </div>

        <div style={S.notice}>
          Deposits are insured by PDIC up to ₱1 Million per depositor.
        </div>
        <div style={S.notice}>
          For inquiries and comments please{' '}
          <a href="#" style={S.tinyLink}>send us a message</a>{' '}
          or call our 24-hour BPI Contact Center at (+632) 889-10000.
        </div>
        <div style={S.notice}>
          BPI is a proud member of BancNet. BPI is regulated by the
          Bangko Sentral ng Pilipinas.{' '}
          <a href="https://www.bsp.gov.ph" style={S.tinyLink}>
            https://www.bsp.gov.ph
          </a>
        </div>
        <div style={S.notice}>Copyright © 2023 BPI. All rights reserved.</div>

        <div style={S.footerLogos}>
          <img src="/images/bsi.svg" alt="BSI" style={S.trustLogo} />
          <img src="/images/pdic.svg" alt="PDIC" style={S.trustLogo} />
          <img src="/images/bitmap-global.svg" alt="Secure" style={{ ...S.trustLogo, width: 96 }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: '#888' }}>Proud member of</div>
            <img src="/images/bitmap-bancNet.svg" alt="BancNet" style={{ height: 19 }} />
          </div>
        </div>
      </aside>

      <section style={S.rightPanel}>
        <nav style={S.topNav}>
          <span style={S.navItem} onClick={onBack}>Home</span>
          <span style={S.navItem}>Contact Us</span>
          <span style={S.navItem}>Privacy Policy</span>
          <span style={S.navItem}>Service Agreement</span>
          <span style={S.navItem}>Learn About Security</span>
        </nav>

        <div style={S.illustrationWrap}>
          <img src="/images/login.svg" alt="Online banking illustration" style={S.illustration} />
        </div>

        <div style={S.rightFooter}>
          <img src="/images/bsi.svg" alt="BSI" style={S.trustLogo} />
          <img src="/images/pdic.svg" alt="PDIC" style={S.trustLogo} />
          <img src="/images/bitmap-global.svg" alt="Secure" style={{ ...S.trustLogo, width: 96 }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: '#888' }}>Proud member of</div>
            <img src="/images/bitmap-bancNet.svg" alt="BancNet" style={{ height: 19 }} />
          </div>
        </div>
      </section>
    </div>
  )
}

const S = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f8f9fa',
    fontFamily: '"Segoe UI", Arial, sans-serif',
    fontSize: 15,
    color: '#263d47',
  },
  aside: {
    flex: '0 0 390px',
    width: 390,
    minHeight: '100vh',
    padding: '29px 32px 24px 42px',
    background: '#fff',
    borderLeft: '4px solid #454545',
    boxShadow: '2px 0 6px rgba(0,0,0,.05)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 2,
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  logoWrap: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  logoBpi: {
    color: '#ed4147',
    fontSize: 32,
    fontWeight: 800,
    letterSpacing: '-1.5px',
    lineHeight: 1,
  },
  welcome: {
    fontSize: 28,
    fontWeight: 500,
    margin: '0 0 20px',
    letterSpacing: '-.3px',
  },
  demoCard: {
    background: '#f0f8f8',
    border: '1px solid #c1e4e3',
    borderRadius: 6,
    padding: '12px 14px',
    marginBottom: 20,
  },
  form: { display: 'flex', flexDirection: 'column' },
  inputControl: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 14,
    background: '#f3f4f5',
    borderRadius: 4,
  },
  inputField: { flex: 1, position: 'relative' },
  input: {
    display: 'block',
    width: '100%',
    height: 54,
    border: 'none',
    background: 'transparent',
    outline: 'none',
    padding: '18px 16px 6px',
    fontSize: 15,
    fontFamily: 'inherit',
    color: '#263d47',
  },
  inputLabel: {
    position: 'absolute',
    left: 16,
    top: 8,
    fontSize: 11,
    color: '#657983',
    pointerEvents: 'none',
  },
  clearIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#7a9099',
    fontSize: 14,
  },
  eyeBtn: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#50656f',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
  },
  eyeSvg: { width: 22, height: 22 },
  primaryBtn: {
    width: '100%',
    height: 50,
    border: 'none',
    borderRadius: 4,
    background: '#d9939e',
    color: '#fff',
    fontSize: 15,
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'background .2s',
  },
  primaryBtnHover: {
    background: '#b71c2e',
  },
  secondaryBtn: {
    width: '100%',
    height: 50,
    border: '1.5px solid #536b76',
    borderRadius: 4,
    background: '#fff',
    color: '#263d47',
    fontSize: 15,
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
  forgotRow: {
    margin: '14px 0 24px',
    textAlign: 'center',
    fontSize: 15,
    color: '#536b76',
  },
  bodyLink: {
    color: '#00a6a6',
    textDecoration: 'underline',
    textUnderlineOffset: 2,
    cursor: 'pointer',
  },
  orDiv: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    color: '#b4c0c5',
  },
  orLine: {
    flex: 1,
    height: 1,
    background: '#d9dfe2',
  },
  orWord: { fontSize: 13 },
  inquiryRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 0',
    borderBottom: '1px solid #e2e7e9',
    cursor: 'pointer',
  },
  inquiryIcon: { width: 22, height: 22, flexShrink: 0 },
  inquiryTitle: { margin: '0 0 2px', fontSize: 14, fontWeight: 600 },
  inquirySubtitle: { fontSize: 11, color: '#71858e' },
  chevronRight: { color: '#526a75', fontSize: 22, lineHeight: 1 },
  notice: {
    marginTop: 12,
    fontSize: 11.5,
    lineHeight: 1.55,
    color: '#82949c',
  },
  tinyLink: { color: '#009f9f', textDecoration: 'underline', cursor: 'pointer' },
  footerLogos: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    flexWrap: 'wrap',
  },
  trustLogo: { height: 36 },
  rightPanel: {
    flex: '1 1 auto',
    minHeight: '100vh',
    background: '#f8f9fa',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  topNav: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 24,
    padding: '44px 28px 0',
  },
  navItem: {
    fontSize: 14,
    fontWeight: 600,
    color: '#344b55',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  illustrationWrap: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 40px',
  },
  illustration: {
    width: '100%',
    maxWidth: 580,
    height: 'auto',
  },
  rightFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 14,
    padding: '16px 28px',
    borderTop: '1px solid #e5e8e9',
    flexWrap: 'wrap',
  },
}
