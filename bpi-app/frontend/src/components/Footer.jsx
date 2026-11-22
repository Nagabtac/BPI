export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          {/* Logo */}
          <div>
            <div className="footer-logo" style={{ marginBottom: 16 }}>
              <span className="crest">♛</span>
              <b>BPI</b>
            </div>
          </div>

          {/* About BPI */}
          <div className="footer-col">
            <h5>About BPI</h5>
            <a>Overview</a>
            <a>Investor Relations</a>
            <a>Governance</a>
            <a>News</a>
            <a>Sustainability</a>
            <a>Careers</a>
          </div>

          {/* Site Links */}
          <div className="footer-col">
            <h5>Site Links</h5>
            <a>Data Privacy</a>
            <a>Financial Consumer Protection</a>
          </div>

          {/* Corporate office */}
          <div className="footer-corporate">
            <h5>Corporate Office</h5>
            <address>
              <strong>Bank of the Philippine Islands</strong>
              Ayala Triangle Gardens Tower 2, Paseo de Roxas corner Makati Ave., Makati City 1226
            </address>

            <div className="social-links">
              <a><img src="/images/Facebook.svg" alt="Facebook" /></a>
              <a><img src="/images/Instagram.svg" alt="Instagram" /></a>
              <a><img src="/images/social_youtube-reverse.svg" alt="YouTube" /></a>
              <a><img src="/images/Xtwitter_footer.svg" alt="X/Twitter" /></a>
              <a><img src="/images/LinkedIn_Reverse.svg" alt="LinkedIn" /></a>
            </div>

            <div className="app-links">
              <a><img src="/images/footer-appstore.png" alt="App Store" /></a>
              <a><img src="/images/footer-playstore.png" alt="Google Play" /></a>
              <a><img src="/images/huawei_icon_v11.25.svg" alt="AppGallery" style={{ height: 36 }} /></a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-logos">
            <img src="/images/20260708-npc-seal.png" alt="NPC DPO/DPS Registered" />
            <img src="/images/pdic-logo-v2.png" alt="PDIC" />
          </div>
          <div className="footer-legal">
            <p>BPI is a proud member of <strong style={{ color: '#fff' }}>BancNet</strong></p>
            <p>Deposits are insured by PDIC up to ₱1 Million per depositor</p>
            <p>BPI is regulated by the Bangko Sentral ng Pilipinas <a href="https://www.bsp.gov.ph" style={{ color: '#ccc' }}>https://www.bsp.gov.ph</a></p>
          </div>
          <div className="footer-copyright">© Copyright 2023. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
