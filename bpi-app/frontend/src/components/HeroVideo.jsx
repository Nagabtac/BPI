export default function HeroVideo() {
  return (
    <section className="hero-video">
      <video autoPlay muted loop playsInline>
        <source src="/video/global.av1.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-overlay">
        Celebrating 175 years of progress
      </div>
    </section>
  )
}
