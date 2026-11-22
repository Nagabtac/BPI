import { useState } from 'react'

const slides = [
  {
    tag: 'BPI Wealth',
    title: 'Empowering Filipinos to build their best future with us',
    img: '/images/bpi-wealth-entry-point-entry-jpg-desktop.jpg',
    cta: 'LEARN MORE',
  },
  {
    tag: 'Personal Banking',
    title: 'Banking made simple for every Filipino',
    img: '/images/block2-digitalization-1.jpg',
    cta: 'LEARN MORE',
  },
  {
    tag: 'SME Banking',
    title: 'Growing your business with BPI',
    img: '/images/block1-sustainability-1.jpg',
    cta: 'LEARN MORE',
  },
  {
    tag: 'Institutional Banking',
    title: 'Tailored financial solutions for large enterprises',
    img: '/images/block3-financial-education-1.jpg',
    cta: 'LEARN MORE',
  },
  {
    tag: 'Insurance',
    title: 'Protecting what matters most to you',
    img: '/images/175-careers.jpg',
    cta: 'LEARN MORE',
  },
]

export default function ExploreSolutions() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent(c => (c + 1) % slides.length)
  const slide = slides[current]

  return (
    <section className="explore">
      <div className="wrap">
        <div className="kicker" />
        <h2>Let's explore solutions together</h2>
        <p>BPI is here to help you do more and achieve more, no matter your journey in life.</p>

        <div className="explore-slider" style={{ position: 'relative' }}>
          <button className="slider-arrow left" onClick={prev}>‹</button>
          <div className="explore-slide">
            <div className="explore-slide-copy">
              <div className="tag">{slide.tag}</div>
              <h3>{slide.title}</h3>
              <a className="btn-red-outline">{slide.cta}</a>
            </div>
            <div className="explore-slide-img">
              <img src={slide.img} alt={slide.title} />
            </div>
          </div>
          <button className="slider-arrow right" onClick={next}>›</button>
        </div>

        <div className="slider-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`slider-dot${i === current ? ' active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
