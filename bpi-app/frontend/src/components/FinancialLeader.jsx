export default function FinancialLeader() {
  const cards = [
    { icon: '/images/icon1.svg', label: 'Who we are' },
    { icon: '/images/icon2.svg', label: 'Our Network' },
    { icon: '/images/icon3.svg', label: 'Our Leadership' },
  ]

  return (
    <section className="leader">
      <div className="wrap">
        <div className="kicker" />
        <h2>We are a leader in financial services</h2>
        <p>
          BPI is acknowledged as a leading provider of financial services and an
          industry pillar in the Philippines.
        </p>
        <div className="leader-cards">
          {cards.map(c => (
            <div key={c.label} className="leader-card">
              <img src={c.icon} alt={c.label} />
              <h4>{c.label}</h4>
              <a>Learn more →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
