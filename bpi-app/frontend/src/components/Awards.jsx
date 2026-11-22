const awards = [
  {
    img: '/images/award-great-place-to-work.jpg',
    label: '#7 Best Workplaces in Philippines 2026',
  },
  {
    img: '/images/award-global-banking-finance-awards.jpg',
    label: 'Excellence in Innovation – Bank Compliance Program Philippines 2026',
  },
  {
    img: '/images/award-digital-cx-awards-2026.jpg',
    label: 'Best Hybrid Customer Experience – Branch',
  },
  {
    img: '/images/award-stevie.jpg',
    label: 'Silver, Award for Innovation in Purpose-Driven Marketing',
  },
]

export default function Awards() {
  return (
    <section className="awards">
      <div className="wrap">
        <div className="kicker" />
        <h2>Our Awards</h2>
        <p>BPI is recognized by some of the most prestigious local and international award-giving bodies.</p>
        <div className="awards-grid">
          {awards.map(a => (
            <div key={a.label} className="award-card">
              <img src={a.img} alt={a.label} />
              <div className="award-card-body">
                <div className="award-line" />
                <p>{a.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="awards-cta">
          <a className="btn-red">VIEW OUR AWARDS →</a>
        </div>
      </div>
    </section>
  )
}
