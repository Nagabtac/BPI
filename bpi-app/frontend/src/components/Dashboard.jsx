import { useState } from 'react'

export default function Dashboard({ onLogout }) {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [hideBalances, setHideBalances] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [toast, setToast] = useState('')

  const notify = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2600)
  }

  const openModal = (title) => {
    setModalTitle(title)
    setShowModal(true)
  }

  const submitDemo = (e) => {
    e.preventDefault()
    setShowModal(false)
    notify('Demo only: details entered. No transaction was made.')
  }

  return (
    <div style={S.body}>
      {/* Topbar */}
      <header style={S.topbar}>
        <div style={S.brand}>
          BPI<small style={S.brandSmall}>ONLINE BANKING</small>
        </div>
        <div style={S.topRight}>
          <a style={S.topLink} onClick={() => notify('You are viewing your dashboard.')}>Home</a>
          <a style={S.topLink} onClick={() => notify('Help and support selected.')}>Help & Support</a>
          <button style={S.iconBtn} onClick={() => notify('You are all caught up.')}>♧</button>
          <button style={S.iconBtn} onClick={() => notify('No new messages.')}>✉</button>
          <button style={S.avatar} onClick={onLogout} title="Logout">JD</button>
        </div>
      </header>

      <div style={S.layout}>
        {/* Sidebar */}
        <aside style={S.sidebar}>
          <div style={S.welcome}>
            <span style={S.welcomeSpan}>Good morning,</span>
            <strong style={S.welcomeStrong}>Juan Dela Cruz</strong>
          </div>
          <div style={S.navLabel}>MY BANK</div>
          <button style={activeNav === 'Dashboard' ? { ...S.navItem, ...S.navItemActive } : S.navItem}
            onClick={() => setActiveNav('Dashboard')}>
            <span style={S.navIco}>▦</span>Dashboard
          </button>
          <button style={activeNav === 'Accounts' ? { ...S.navItem, ...S.navItemActive } : S.navItem}
            onClick={() => { setActiveNav('Accounts'); notify('Accounts selected.') }}>
            <span style={S.navIco}>▣</span>My Accounts
          </button>
          <button style={activeNav === 'History' ? { ...S.navItem, ...S.navItemActive } : S.navItem}
            onClick={() => { setActiveNav('History'); notify('Transaction history selected.') }}>
            <span style={S.navIco}>↔</span>Transaction History
          </button>

          <div style={S.navLabel}>TRANSACTIONS</div>
          <button style={S.navItem} onClick={() => openModal('Transfer Money')}>
            <span style={S.navIco}>⇄</span>Transfer Money
          </button>
          <button style={S.navItem} onClick={() => openModal('Pay Bills')}>
            <span style={S.navIco}>▤</span>Pay Bills
          </button>
          <button style={S.navItem} onClick={() => openModal('Load & Payments')}>
            <span style={S.navIco}>▱</span>Load & Payments
          </button>

          <div style={S.navLabel}>PREFERENCES</div>
          <button style={S.navItem} onClick={() => { setActiveNav('Settings'); notify('Profile and settings selected.') }}>
            <span style={S.navIco}>⚙</span>Settings
          </button>
          <button style={S.navItem} onClick={() => { setActiveNav('Security'); notify('Security settings selected.') }}>
            <span style={S.navIco}>♧</span>Security
          </button>

          <div style={S.sidebarBottom}>
            Need assistance?<br />
            <a style={S.subtleLink} onClick={() => notify('Contact support selected.')}>Visit Help Center</a>
            <br /><br />
            Deposits are insured by PDIC up to ₱1 Million per depositor.
          </div>
        </aside>

        {/* Main content */}
        <main style={S.main}>
          <div style={S.pageHead}>
            <div>
              <div style={S.eyebrow}>MY BANKING OVERVIEW</div>
              <h1 style={S.h1}>Welcome back, Juan!</h1>
              <div style={S.date}>Here's your account summary for today.</div>
            </div>
            <div style={S.headActions}>
              <button style={S.outlineBtn} onClick={() => notify('Your account details are up to date.')}>
                ↻ &nbsp; Refresh
              </button>
              <button style={S.primaryBtn} onClick={() => openModal('Transfer Money')}>
                ＋ &nbsp; Transfer
              </button>
            </div>
          </div>

          {/* Accounts + Quick Actions */}
          <section style={S.grid}>
            <div style={S.card}>
              <div style={S.sectionTitle}>
                <h2 style={S.h2}>My Accounts</h2>
                <a style={S.subtleLink} onClick={() => notify('All accounts selected.')}>View all accounts →</a>
              </div>
              <div style={S.account}>
                <div style={S.accountLeft}>
                  <div style={S.accountIcon}>▣</div>
                  <div>
                    <div style={S.accountName}>Regular Savings</div>
                    <div style={S.accountNumber}>ACCOUNT NO. &nbsp; •••• •••• 4821</div>
                  </div>
                </div>
                <div style={S.balance}>
                  <strong style={S.balanceStrong}>{hideBalances ? '₱ ••••••••' : '₱ 85,420.50'}</strong>
                  <span style={S.balanceSpan}>Available balance</span>
                </div>
              </div>
              <div style={S.account}>
                <div style={S.accountLeft}>
                  <div style={S.accountIcon}>▤</div>
                  <div>
                    <div style={S.accountName}>Save-Up Account</div>
                    <div style={S.accountNumber}>ACCOUNT NO. &nbsp; •••• •••• 9076</div>
                  </div>
                </div>
                <div style={S.balance}>
                  <strong style={S.balanceStrong}>{hideBalances ? '₱ ••••••••' : '₱ 12,500.00'}</strong>
                  <span style={S.balanceSpan}>Available balance</span>
                </div>
              </div>
              <div style={{ ...S.sectionTitle, marginTop: 18 }}>
                <span style={{ fontSize: 11, color: '#71818a' }}>Balances shown are for demonstration purposes.</span>
                <button style={{ ...S.subtleLink, border: 0, background: 'none' }}
                  onClick={() => setHideBalances(h => !h)}>
                  {hideBalances ? 'Show balances' : 'Hide balances'}
                </button>
              </div>
            </div>

            <div style={S.card}>
              <div style={S.sectionTitle}>
                <h2 style={S.h2}>Quick Actions</h2>
              </div>
              <div style={S.quickGrid}>
                <button style={S.quickAction} onClick={() => openModal('Transfer Money')}>
                  <b style={S.quickIcon}>⇄</b><span style={S.quickSpan}>Transfer Money</span>
                </button>
                <button style={S.quickAction} onClick={() => openModal('Pay Bills')}>
                  <b style={S.quickIcon}>▤</b><span style={S.quickSpan}>Pay Bills</span>
                </button>
                <button style={S.quickAction} onClick={() => openModal('Load & Payments')}>
                  <b style={S.quickIcon}>▱</b><span style={S.quickSpan}>Buy Load</span>
                </button>
                <button style={S.quickAction} onClick={() => notify('Manage recipients selected.')}>
                  <b style={S.quickIcon}>♧</b><span style={S.quickSpan}>Manage Recipients</span>
                </button>
              </div>
            </div>
          </section>

          {/* Recent Transactions + Side Stack */}
          <section style={S.lower}>
            <div style={S.card}>
              <div style={S.sectionTitle}>
                <h2 style={S.h2}>Recent Transactions</h2>
                <a style={S.subtleLink} onClick={() => notify('Showing recent transactions.')}>See all →</a>
              </div>
              <div style={S.transaction}>
                <div style={{ ...S.txIcon, ...S.txIconOut }}>↗</div>
                <div>
                  <div style={S.txName}>Online purchase</div>
                  <div style={S.txDate}>Nov 15, 2026 · 10:42 AM</div>
                </div>
                <div style={S.amount}>
                  - ₱1,250.00<small style={S.amountSmall}>Debit</small>
                </div>
              </div>
              <div style={S.transaction}>
                <div style={S.txIcon}>↓</div>
                <div>
                  <div style={S.txName}>Payroll deposit</div>
                  <div style={S.txDate}>Nov 14, 2026 · 8:15 AM</div>
                </div>
                <div style={{ ...S.amount, ...S.amountCredit }}>
                  + ₱18,500.00<small style={S.amountSmall}>Credit</small>
                </div>
              </div>
              <div style={S.transaction}>
                <div style={{ ...S.txIcon, ...S.txIconOut }}>↗</div>
                <div>
                  <div style={S.txName}>Electricity bill payment</div>
                  <div style={S.txDate}>Nov 12, 2026 · 3:28 PM</div>
                </div>
                <div style={S.amount}>
                  - ₱2,340.75<small style={S.amountSmall}>Debit</small>
                </div>
              </div>
              <div style={S.transaction}>
                <div style={{ ...S.txIcon, ...S.txIconOut }}>↗</div>
                <div>
                  <div style={S.txName}>Fund transfer</div>
                  <div style={S.txDate}>Nov 10, 2026 · 1:06 PM</div>
                </div>
                <div style={S.amount}>
                  - ₱500.00<small style={S.amountSmall}>Debit</small>
                </div>
              </div>
            </div>

            <div style={S.sideStack}>
              <div style={S.promo}>
                <div style={S.promoTag}>BPI EXCLUSIVE</div>
                <h3 style={S.promoH3}>Make your money work harder.</h3>
                <p style={S.promoP}>Explore savings, investments, and services designed around your goals.</p>
                <a style={S.subtleLink} onClick={() => notify('Explore products selected.')}>Explore products →</a>
              </div>
              <div style={S.security}>
                <div style={S.securityRow}>
                  <div style={S.shield}>✓</div>
                  <div>
                    <strong style={S.securityStrong}>Your security matters</strong>
                    <p style={S.securityP}>Keep your account safe. Never share your password, PIN, or One-Time PIN (OTP).</p>
                    <a style={S.subtleLink} onClick={() => notify('Security tips selected.')}>Learn about security →</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div style={S.footer}>
            Bank of the Philippine Islands · Member: PDIC · Regulated by the Bangko Sentral ng Pilipinas<br />
            For demonstration only. This is a fictional banking dashboard and is not connected to BPI systems.<br />
            © 2026 BPI Online Banking UI Concept
          </div>
        </main>
      </div>

      {/* Toast */}
      {toast && <div style={{ ...S.toast, ...S.toastShow }}>{toast}</div>}

      {/* Modal */}
      {showModal && (
        <div style={S.modalBackdrop} onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div style={S.modal}>
            <h2 style={S.modalH2}>{modalTitle}</h2>
            <p style={S.modalP}>This is a static UI demonstration. No real transaction will be processed.</p>
            <form onSubmit={submitDemo}>
              <label style={S.label}>Recipient / Biller</label>
              <input style={S.input} placeholder="Enter recipient or biller name" />
              <label style={S.label}>Amount (PHP)</label>
              <input style={S.input} type="number" min="1" placeholder="0.00" />
              <div style={S.modalActions}>
                <button type="button" style={S.outlineBtn} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" style={S.primaryBtn}>Continue</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

const S = {
  body: { margin: 0, background: '#f5f7f8', color: '#263b45', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 14, minHeight: '100vh' },
  topbar: { height: 74, background: '#fff', borderBottom: '1px solid #e7ecef', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5.2%', position: 'sticky', top: 0, zIndex: 5 },
  brand: { fontSize: 31, fontWeight: 800, letterSpacing: '-1.5px', color: '#e94449' },
  brandSmall: { fontSize: 10, display: 'block', letterSpacing: '1.4px', color: '#839099', fontWeight: 600, marginTop: -3 },
  topRight: { display: 'flex', alignItems: 'center', gap: 25 },
  topLink: { color: '#52646d', textDecoration: 'none', cursor: 'pointer' },
  iconBtn: { border: 0, background: 'transparent', color: '#52646d', fontSize: 20, cursor: 'pointer' },
  avatar: { width: 34, height: 34, borderRadius: '50%', background: '#f9dddd', color: '#e94449', display: 'grid', placeItems: 'center', fontWeight: 700, border: 0, cursor: 'pointer' },
  layout: { maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '238px minmax(0,1fr)', minHeight: 'calc(100vh - 74px)' },
  sidebar: { background: '#fff', borderRight: '1px solid #e7ecef', padding: '27px 15px', display: 'flex', flexDirection: 'column' },
  welcome: { padding: '0 14px 23px', borderBottom: '1px solid #e7ecef', marginBottom: 16 },
  welcomeSpan: { fontSize: 12, color: '#71818a' },
  welcomeStrong: { display: 'block', fontSize: 18, marginTop: 6 },
  navLabel: { fontSize: 10, letterSpacing: '1.2px', color: '#9aa6ac', fontWeight: 700, padding: '12px 14px 8px' },
  navItem: { border: 0, background: 'transparent', textAlign: 'left', color: '#52646d', padding: '12px 14px', borderRadius: 7, display: 'flex', gap: 13, alignItems: 'center', width: '100%', margin: '2px 0', cursor: 'pointer' },
  navItemActive: { background: '#fff0f0', color: '#e94449', fontWeight: 700 },
  navIco: { width: 19, textAlign: 'center', fontSize: 17 },
  sidebarBottom: { marginTop: 'auto', borderTop: '1px solid #e7ecef', padding: '17px 14px 0', color: '#89969c', fontSize: 11, lineHeight: 1.7 },
  main: { padding: '31px 4.3% 50px', minWidth: 0 },
  pageHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  eyebrow: { color: '#71818a', fontSize: 12, marginBottom: 7 },
  h1: { fontSize: 26, margin: 0, fontWeight: 600, letterSpacing: '-.5px' },
  date: { color: '#71818a', fontSize: 12, marginTop: 7 },
  headActions: { display: 'flex', gap: 10 },
  outlineBtn: { borderRadius: 5, padding: '10px 15px', border: '1px solid #cbd5d9', background: '#fff', color: '#40545e', cursor: 'pointer' },
  primaryBtn: { borderRadius: 5, padding: '10px 15px', border: '1px solid #e94449', background: '#e94449', color: '#fff', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'minmax(0,1.65fr) minmax(260px,1fr)', gap: 18 },
  card: { background: '#fff', border: '1px solid #e7ecef', borderRadius: 9, boxShadow: '0 5px 22px rgba(26,48,59,.06)', padding: '21px 22px' },
  sectionTitle: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  h2: { fontSize: 16, margin: 0, fontWeight: 700 },
  subtleLink: { color: '#0b9d9b', textDecoration: 'none', fontSize: 12, cursor: 'pointer' },
  account: { border: '1px solid #e7ecef', borderRadius: 7, padding: '17px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 11, gap: 15 },
  accountLeft: { display: 'flex', alignItems: 'center', gap: 13 },
  accountIcon: { width: 42, height: 42, background: '#fff0f0', borderRadius: 8, display: 'grid', placeItems: 'center', color: '#e94449', fontSize: 19 },
  accountName: { fontWeight: 700, marginBottom: 5 },
  accountNumber: { fontSize: 11, color: '#71818a' },
  balance: { textAlign: 'right' },
  balanceStrong: { fontSize: 19, display: 'block', letterSpacing: '-.3px' },
  balanceSpan: { fontSize: 10, color: '#71818a' },
  quickGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 },
  quickAction: { background: '#fff', border: '1px solid #e7ecef', borderRadius: 7, minHeight: 92, padding: '13px 10px', textAlign: 'center', color: '#43565f', cursor: 'pointer' },
  quickIcon: { display: 'block', fontSize: 22, color: '#e94449', fontWeight: 400, marginBottom: 8 },
  quickSpan: { fontSize: 12 },
  lower: { display: 'grid', gridTemplateColumns: 'minmax(0,1.65fr) minmax(260px,1fr)', gap: 18, marginTop: 18 },
  transaction: { display: 'grid', gridTemplateColumns: '40px minmax(0,1fr) auto', alignItems: 'center', gap: 12, padding: '13px 0', borderTop: '1px solid #eef1f2' },
  txIcon: { width: 36, height: 36, borderRadius: '50%', display: 'grid', placeItems: 'center', background: '#eef8f5', color: '#16845d', fontSize: 16 },
  txIconOut: { background: '#fff2ed', color: '#d96a42' },
  txName: { fontWeight: 600, fontSize: 13 },
  txDate: { fontSize: 11, color: '#71818a', marginTop: 4 },
  amount: { fontWeight: 700, textAlign: 'right' },
  amountCredit: { color: '#16845d' },
  amountSmall: { display: 'block', fontSize: 10, color: '#71818a', fontWeight: 400, marginTop: 4 },
  sideStack: { display: 'flex', flexDirection: 'column', gap: 18 },
  promo: { background: 'linear-gradient(125deg, #fff1f1, #fff 75%)', borderRadius: 9, padding: 21, border: '1px solid #e7ecef', boxShadow: '0 5px 22px rgba(26,48,59,.06)', position: 'relative', overflow: 'hidden', minHeight: 156 },
  promoTag: { color: '#e94449', fontSize: 10, letterSpacing: 1, fontWeight: 700 },
  promoH3: { fontSize: 17, lineHeight: 1.35, maxWidth: 210, margin: '10px 0' },
  promoP: { fontSize: 11, color: '#71818a', maxWidth: 210, lineHeight: 1.5 },
  security: { background: '#fff', border: '1px solid #e7ecef', borderRadius: 9, boxShadow: '0 5px 22px rgba(26,48,59,.06)', padding: '19px 21px' },
  securityRow: { display: 'flex', gap: 12, alignItems: 'center' },
  shield: { width: 39, height: 39, borderRadius: '50%', background: '#e9f7f4', color: '#0b9d9b', display: 'grid', placeItems: 'center', fontSize: 19 },
  securityStrong: { fontSize: 13 },
  securityP: { fontSize: 11, color: '#71818a', lineHeight: 1.5, margin: '5px 0 0' },
  footer: { marginTop: 28, textAlign: 'center', color: '#98a3a8', fontSize: 10, lineHeight: 1.8 },
  toast: { position: 'fixed', right: 22, bottom: 22, background: '#263b45', color: '#fff', padding: '13px 18px', borderRadius: 7, boxShadow: '0 5px 22px rgba(26,48,59,.06)', opacity: 0, transform: 'translateY(10px)', transition: '.2s', zIndex: 10 },
  toastShow: { opacity: 1, transform: 'translateY(0)' },
  modalBackdrop: { position: 'fixed', inset: 0, background: 'rgba(23,39,46,.38)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 20 },
  modal: { background: '#fff', width: 'min(430px, 100%)', borderRadius: 10, padding: 24, boxShadow: '0 15px 50px #1b303944' },
  modalH2: { margin: '0 0 7px', fontSize: 20 },
  modalP: { color: '#71818a', fontSize: 12, lineHeight: 1.5 },
  label: { display: 'block', fontSize: 12, margin: '16px 0 6px' },
  input: { width: '100%', padding: 12, border: '1px solid #dce3e6', borderRadius: 5, background: '#fff' },
  modalActions: { display: 'flex', justifyContent: 'flex-end', gap: 9, marginTop: 22 },
}
