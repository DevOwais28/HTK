import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  CartIcon, 
  WhatsAppIcon, 
  MenuIcon, 
  CloseIcon 
} from '../icons'
import { OWNER_WHATSAPP } from '../hooks'

export default function Navbar({ 
  scrolled, 
  isMenuOpen, 
  setIsMenuOpen, 
  scrollToSection, 
  cartCount,
  setIsCartOpen,
  isLandingPage
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const showCart = location.pathname === '/menu' || location.pathname === '/deals'

  const handleNavClick = (item) => {
    const lowerItem = item.toLowerCase()
    
    if (lowerItem === 'home') {
      navigate('/')
    } else if (lowerItem === 'menu') {
      navigate('/menu')
    } else if (lowerItem === 'deals') {
      navigate('/deals')
    } else {
      // For About and Contact, scroll on landing page or navigate home then scroll
      if (isLandingPage) {
        scrollToSection(lowerItem)
      } else {
        navigate('/')
        setTimeout(() => scrollToSection(lowerItem), 100)
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${!isLandingPage ? 'inner-page' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-text">HTK</span>
          <span className="logo-sub">Hot Top Krispy</span>
        </Link>
        
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {['Home', 'Menu', 'Deals', 'About', 'Contact'].map((item) => (
            <button 
              key={item}
              onClick={() => handleNavClick(item)}
              className="nav-link"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          {showCart && (
            <button 
              className="cart-btn" 
              onClick={() => setIsCartOpen(true)}
            >
              <CartIcon />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          )}
          <a href={`/menu`} className="whatsapp-btn" rel='noopener noreferrer'>
            <WhatsAppIcon /> Order Now
          </a>
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </nav>
  )
}
