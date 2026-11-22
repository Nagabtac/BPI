export default function CustomerSupport() {
  const helpLinks = [
    { icon: '📍', label: 'Find a branch/ ATM' },
    { icon: '🖥', label: 'View system status' },
    { icon: '📅', label: 'View scheduled maintenance' },
    { icon: '🎧', label: 'Explore Help & Support' },
  ]

  return (
    <>
      <section className="support">
        <div className="wrap">
          <div className="kicker" />
          <h2>Customer Support</h2>
          <p className="support-contact">
            For inquiries and comments, please <a>send us a message</a> or call our 24-hour
            BPI Contact Center at (+632) 889-10000.
          </p>
        </div>
      </section>

      <section className="need-help">
        <div className="wrap">
          <div className="kicker" />
          <h2>Need more help?</h2>
          <p>Get all the help for your banking needs.</p>
          <div className="help-layout">
            <div className="help-illustration">
              <img src="/images/Illustration_Support Large.svg" alt="Support illustration" />
            </div>
            <div className="help-links-grid">
              {helpLinks.map(h => (
                <a key={h.label} className="help-link">
                  <span>
                    <span className="icon">{h.icon}</span>
                    {h.label}
                  </span>
                  <span className="arrow" style={{ color: '#b71c2e' }}>›</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
