const pillars = [
  {
    tag: 'Sustainability',
    title: 'Driving sustainable progress',
    desc: 'BPI delivers sustainable financial solutions to drive economic progress for all Filipinos.',
    img: '/images/block1-sustainability-1.jpg',
    imgAlt: 'Wind turbines',
    reverse: false,
  },
  {
    tag: 'Digitalization',
    title: 'Reinforcing consumer protection',
    desc: 'BPI partners with the PNP to fortify commitment to consumer protection, cybersecurity, and community resilience.',
    img: '/images/block2-digitalization-1.jpg',
    imgAlt: 'Woman using phone',
    reverse: true,
  },
  {
    tag: 'Financial Inclusion',
    title: 'Advancing financial education',
    desc: 'BPI Foundation brings financial education to more local communities.',
    img: '/images/block3-financial-education-1.jpg',
    imgAlt: 'Community financial education',
    reverse: false,
  },
]

export default function Pillars() {
  return (
    <section className="pillars">
      {pillars.map((p) => (
        <div key={p.tag} className={`pillar-row${p.reverse ? ' reverse' : ''}`}>
          <div className="pillar-copy">
            <div className="tag">{p.tag}</div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <a className="btn-red">READ MORE →</a>
          </div>
          <div className="pillar-img">
            <img src={p.img} alt={p.imgAlt} />
          </div>
        </div>
      ))}
    </section>
  )
}
