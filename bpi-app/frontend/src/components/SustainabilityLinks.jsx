export default function SustainabilityLinks() {
  const links = [
    'Sustainability agenda',
    'Sustainability funding framework',
    'Sustainability products & services',
  ]

  return (
    <section className="sustainability-section">
      <div className="wrap">
        <div className="kicker" />
        <h2>Our approach to sustainability</h2>
        <p>
          BPI upholds responsible banking — incorporating environmental, social, and
          governance principles in the conduct of its business.
        </p>
        <div className="sust-links">
          {links.map(link => (
            <a key={link} className="sust-link">
              {link} <span className="arrow">›</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
