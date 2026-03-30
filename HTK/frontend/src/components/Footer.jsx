import { InstagramIcon, FacebookIcon, WhatsAppIcon } from '../icons'
import { OWNER_WHATSAPP } from '../hooks'

export default function Footer({ scrollToSection }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">HTK</span>
              <span className="logo-sub">Hot Top Krispy</span>
            </div>
            <p className="footer-tagline">Crispy. Juicy. Unforgettable.</p>
            <div className="social-links">
              <a href="#" className="social-link"><InstagramIcon /></a>
              <a href="#" className="social-link"><FacebookIcon /></a>
              <a href={`https://wa.me/${OWNER_WHATSAPP}`} className="social-link" target="_blank" rel="noopener noreferrer"><WhatsAppIcon /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <button onClick={() => scrollToSection('home')}>Home</button>
            <button onClick={() => scrollToSection('menu')}>Menu</button>
            <button onClick={() => scrollToSection('about')}>About</button>
            <button onClick={() => scrollToSection('contact')}>Contact</button>
          </div>
          
          <div className="footer-newsletter">
            <h4>Join the Flavor Club</h4>
            <p>Get exclusive deals & updates</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email" />
              <button className="btn-small">Join</button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 HTK - Hot Top Krispy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
