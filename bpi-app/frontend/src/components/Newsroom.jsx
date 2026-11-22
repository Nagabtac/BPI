const news = [
  {
    img: '/images/news-sustainabile-progress.jpg',
    title: 'BPI reinforces financial inclusion at the heart of sustainable progress',
    excerpt: 'The Bank of the Philippine Islands (BPI) continues to strengthen its commitment to financia...',
  },
  {
    img: '/images/news-bpi-x-disney.jpg',
    title: 'BPI, Disney enter multi-year collaboration to reimagine everyday banking',
    excerpt: 'BPI will become the first bank in the Philippines to bring Disney, Pixar, Marvel and Star W...',
  },
  {
    img: '/images/news-bpi-powers-100-branches.jpg',
    title: 'BPI powers 100 branches with clean energy, setting the pace for low-carbon banking in the Philippines',
    excerpt: 'The Bank of the Philippine Islands (BPI) has reached a major sustainability milestone, with...',
  },
]

export default function Newsroom() {
  return (
    <section className="newsroom">
      <div className="wrap">
        <div className="kicker" />
        <h2>The Newsroom</h2>
        <p>Read about BPI's latest news and stories from the media.</p>
        <div className="news-grid">
          {news.map(n => (
            <article key={n.title} className="news-card">
              <img src={n.img} alt={n.title} />
              <div className="news-card-body">
                <h3>{n.title}</h3>
                <p>{n.excerpt}</p>
                <a>Read more</a>
              </div>
            </article>
          ))}
        </div>
        <div className="newsroom-cta">
          <a className="btn-red">VISIT THE NEWSROOM →</a>
        </div>
      </div>
    </section>
  )
}
