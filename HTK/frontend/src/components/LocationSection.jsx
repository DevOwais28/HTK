import { MapPinIcon, PhoneIcon, ClockIcon, WhatsAppIcon } from '../icons'
import { OWNER_WHATSAPP } from '../hooks'
import { useNavigate } from 'react-router-dom'

export default function LocationSection({ cartCount }) {
  const navigate = useNavigate()

  const handleWhatsAppClick = (e) => {
    if (cartCount === 0) {
      e.preventDefault()
      navigate('/menu')
    }
  }

  return (
    <section id="contact" className="location-section">
      <div className="container">
        <div className="location-content">
          <div className="location-info">
            <span className="section-tag">FIND US</span>
            <h2 className="section-title dark">VISIT US</h2>
            <div className="info-items">
              <div className="info-item clickable" onClick={() => window.open('https://maps.google.com/?q=Disco+More+Karachi+Pakistan', '_blank')}>
                <MapPinIcon />
                <div>
                  <h4>Address</h4>
                  <p>Near Disco More, Karachi, Pakistan</p>
                </div>
              </div>
              <div className="info-item">
                <PhoneIcon />
                <div>
                  <h4>Phone</h4>
                  <p>+92 300 123 4567</p>
                </div>
              </div>
              <div className="info-item">
                <ClockIcon />
                <div>
                  <h4>Opening Hours</h4>
                  <p>Mon-Sun: 11:00 AM - 12:00 AM</p>
                </div>
              </div>
            </div>
            <a 
              href={cartCount > 0 ? `https://wa.me/${OWNER_WHATSAPP}` : '#'} 
              className="btn-primary full" 
              onClick={handleWhatsAppClick}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <WhatsAppIcon /> {cartCount > 0 ? 'Order on WhatsApp' : 'View Menu to Order'}
            </a>
          </div>
          <div className="location-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3616.8307636436753!2d67.06028997358652!3d24.97187194079377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb340ec180269f3%3A0x7ab23ef0416128cf!2sH.T.K%20Hot%20Top%20Krispy%20Food!5e0!3m2!1sen!2s!4v1774749570229!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '24px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="HTK Location"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
