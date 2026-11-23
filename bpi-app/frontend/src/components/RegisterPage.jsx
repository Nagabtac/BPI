import { useState } from 'react'

const STEPS = ['Select Product', 'Personal Info', 'Account Setup', 'Verify']

export default function RegisterPage({ onBack, onSuccess }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    productType: '',
    firstName: '', lastName: '',
    email: '', mobile: '',
    username: '', password: '', confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const next = () => { setError(''); setStep(s => s + 1) }
  const back = () => { setError(''); setStep(s => s - 1) }

  const validateStep = () => {
    if (step === 0 && !form.productType) return 'Please select a product type.'
    if (step === 1) {
      if (!form.firstName.trim()) return 'First name is required.'
      if (!form.lastName.trim())  return 'Last name is required.'
      if (!form.email.trim())     return 'Email is required.'
      if (!form.mobile.trim())    return 'Mobile number is required.'
    }
    if (step === 2) {
      if (!form.username.trim())  return 'Username is required.'
      if (form.password.length < 8) return 'Password must be at least 8 characters.'
      if (form.password !== form.confirmPassword) return 'Passwords do not match.'
    }
    return ''
  }

  const handleNext = () => {
    const err = validateStep()
    if (err) { setError(err); return }
    if (step < STEPS.length - 1) next()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username:  form.username,
          password:  form.password,
          email:     form.email,
          mobile:    form.mobile,
          firstName: form.firstName,
          lastName:  form.lastName,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Registration failed.'); return }
      next() // go to verify/success step
    } catch {
      setError('Cannot reach server. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={S.root}>
      {/* Left panel */}
      <aside style={S.aside}>
        <div style={S.topBar}>
          <span style={S.logoBpi} onClick={onBack}>BPI</span>
        </div>

        <h2 style={S.heading}>Register for Online Banking</h2>
        <p style={S.sub}>Create your BPI Online Banking account in a few easy steps.</p>

        {/* Step indicators */}
        <div style={S.steps}>
          {STEPS.map((label, i) => (
            <div key={i} style={S.stepRow}>
              <div style={{ ...S.stepDot, ...(i === step ? S.stepDotActive : i < step ? S.stepDotDone : {}) }}>
                {i < step ? '✓' : i + 1}
              </div>
              <span style={{ ...S.stepLabel, ...(i === step ? S.stepLabelActive : {}) }}>{label}</span>
            </div>
          ))}
        </div>

        <div style={S.sideNotice}>
          Already have an account?{' '}
          <span style={S.link} onClick={onBack}>Log in here</span>
        </div>
      </aside>

      {/* Right panel */}
      <section style={S.right}>
        <div style={S.card}>

          {/* ── Step 0: Select Product ── */}
          {step === 0 && (
            <div>
              <h3 style={S.cardTitle}>Select a Product</h3>
              <p style={S.cardSub}>Choose the account type you want to open.</p>
              <div style={S.productGrid}>
                {PRODUCTS.map(p => (
                  <button
                    key={p.type}
                    style={{ ...S.productCard, ...(form.productType === p.type ? S.productCardActive : {}) }}
                    onClick={() => setForm(f => ({ ...f, productType: p.type }))}
                  >
                    <div style={S.productIcon}>{p.icon}</div>
                    <div style={S.productName}>{p.name}</div>
                    <div style={S.productDesc}>{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 1: Personal Info ── */}
          {step === 1 && (
            <div>
              <h3 style={S.cardTitle}>Personal Information</h3>
              <p style={S.cardSub}>Enter your details as they appear on your valid ID.</p>
              <div style={S.row2}>
                <Field label="First Name"    value={form.firstName} onChange={set('firstName')} />
                <Field label="Last Name"     value={form.lastName}  onChange={set('lastName')} />
              </div>
              <Field label="Email Address"   value={form.email}  onChange={set('email')}  type="email" />
              <Field label="Mobile Number"   value={form.mobile} onChange={set('mobile')} placeholder="+639XXXXXXXXX" />
            </div>
          )}

          {/* ── Step 2: Account Setup ── */}
          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <h3 style={S.cardTitle}>Create Your Account</h3>
              <p style={S.cardSub}>Choose a username and a strong password.</p>
              <Field label="Username" value={form.username} onChange={set('username')} />
              <Field label="Password (min. 8 characters)" value={form.password} onChange={set('password')} type="password" />
              <Field label="Confirm Password" value={form.confirmPassword} onChange={set('confirmPassword')} type="password" />
              {error && <div style={S.error}>{error}</div>}
              <div style={S.actions}>
                <button type="button" style={S.outlineBtn} onClick={back}>← Back</button>
                <button type="submit" style={S.primaryBtn} disabled={loading}>
                  {loading ? 'Registering…' : 'Submit Registration'}
                </button>
              </div>
            </form>
          )}

          {/* ── Step 3: Verify / Success ── */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={S.successIcon}>✓</div>
              <h3 style={{ ...S.cardTitle, textAlign: 'center', color: '#16845d' }}>Registration Successful!</h3>
              <p style={{ ...S.cardSub, textAlign: 'center' }}>
                Welcome, <strong>{form.firstName}</strong>! Your BPI Online Banking account has been created.
                A verification link has been sent to <strong>{form.email}</strong>.
              </p>
              <p style={{ fontSize: 12, color: '#71818a', marginTop: 8 }}>
                (For this demo, email verification is simulated. You can log in right away.)
              </p>
              <button style={{ ...S.primaryBtn, marginTop: 24 }} onClick={onSuccess}>
                Go to Login →
              </button>
            </div>
          )}

          {/* Error + Nav (steps 0, 1) */}
          {step < 2 && (
            <>
              {error && <div style={S.error}>{error}</div>}
              <div style={S.actions}>
                {step > 0
                  ? <button style={S.outlineBtn} onClick={back}>← Back</button>
                  : <button style={S.outlineBtn} onClick={onBack}>Cancel</button>
                }
                <button style={S.primaryBtn} onClick={handleNext}>
                  {step === STEPS.length - 2 ? 'Submit' : 'Continue →'}
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

/* ── Small reusable field ─────────────────────────────────────── */
function Field({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={S.label}>{label}</label>
      <input
        style={S.input}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder || ''}
        autoComplete="off"
      />
    </div>
  )
}

/* ── Products ──────────────────────────────────────────────────── */
const PRODUCTS = [
  { type: 'SAVINGS',  icon: '🏦', name: 'Regular Savings', desc: 'Basic savings account with competitive interest rates.' },
  { type: 'SAVE_UP',  icon: '💰', name: 'Save-Up Account', desc: 'Goal-based savings with no maintaining balance.' },
  { type: 'CREDIT',   icon: '💳', name: 'Credit Card',     desc: 'BPI credit card with rewards and cashback benefits.' },
]

/* ── Styles ─────────────────────────────────────────────────────── */
const S = {
  root: { display: 'flex', minHeight: '100vh', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 14, color: '#263b45', background: '#f5f7f8' },

  aside: { flex: '0 0 300px', background: '#fff', borderRight: '1px solid #e7ecef', padding: '32px 28px', display: 'flex', flexDirection: 'column' },
  topBar: { marginBottom: 28 },
  logoBpi: { fontSize: 30, fontWeight: 800, letterSpacing: '-1.5px', color: '#e94449', cursor: 'pointer' },
  heading: { fontSize: 20, fontWeight: 700, margin: '0 0 8px' },
  sub: { fontSize: 12, color: '#71818a', lineHeight: 1.6, margin: '0 0 28px' },

  steps: { display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 'auto' },
  stepRow: { display: 'flex', alignItems: 'center', gap: 12 },
  stepDot: { width: 28, height: 28, borderRadius: '50%', background: '#e7ecef', color: '#71818a', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 },
  stepDotActive: { background: '#e94449', color: '#fff' },
  stepDotDone: { background: '#16845d', color: '#fff' },
  stepLabel: { fontSize: 13, color: '#71818a' },
  stepLabelActive: { color: '#263b45', fontWeight: 700 },

  sideNotice: { marginTop: 32, fontSize: 12, color: '#71818a' },
  link: { color: '#0b9d9b', textDecoration: 'underline', cursor: 'pointer' },

  right: { flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '48px 24px' },
  card: { background: '#fff', border: '1px solid #e7ecef', borderRadius: 10, boxShadow: '0 5px 22px rgba(26,48,59,.06)', padding: '32px 36px', width: '100%', maxWidth: 560 },
  cardTitle: { fontSize: 20, fontWeight: 700, margin: '0 0 6px' },
  cardSub: { fontSize: 13, color: '#71818a', margin: '0 0 24px', lineHeight: 1.6 },

  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 },
  productCard: { border: '2px solid #e7ecef', borderRadius: 9, padding: '18px 12px', textAlign: 'center', background: '#fff', cursor: 'pointer', transition: 'border-color .15s' },
  productCardActive: { borderColor: '#e94449', background: '#fff8f8' },
  productIcon: { fontSize: 28, marginBottom: 10 },
  productName: { fontWeight: 700, fontSize: 13, marginBottom: 6, color: '#263b45' },
  productDesc: { fontSize: 11, color: '#71818a', lineHeight: 1.5 },

  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },

  label: { display: 'block', fontSize: 12, color: '#52646d', marginBottom: 6 },
  input: { width: '100%', padding: '11px 12px', border: '1px solid #dce3e6', borderRadius: 5, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', background: '#f9fafb', outline: 'none' },

  error: { color: '#d9363d', fontSize: 13, marginTop: 4, marginBottom: 8 },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 },
  outlineBtn: { padding: '10px 18px', border: '1px solid #cbd5d9', borderRadius: 5, background: '#fff', color: '#40545e', cursor: 'pointer', fontSize: 14 },
  primaryBtn: { padding: '10px 22px', border: '1px solid #e94449', borderRadius: 5, background: '#e94449', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 },

  successIcon: { width: 60, height: 60, borderRadius: '50%', background: '#eef8f5', color: '#16845d', display: 'grid', placeItems: 'center', fontSize: 28, margin: '0 auto 16px' },
}
