import { useNavigate } from 'react-router-dom'
import { FlameIcon } from '../icons'

export default function Hero() {
  const navigate = useNavigate()
  
  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-bg-animation">
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
      </div>
      <div className="hero-food-display">
        <div className="floating-food"><img src="/burger.png" alt="Burger" className="food-image" style={{width: '85px', height: '85px'}} /></div>
        <div className="floating-food"><img src="/chicken-leg.png" alt="Chicken" className="food-image" style={{width: '85px', height: '85px'}} /></div>
        <div className="floating-food"><img src="/french-fries.png" alt="Fries" className="food-image" style={{width: '85px', height: '85px'}} /></div>
        <div className="floating-food"><img src="/drink.png" alt="Drink" className="food-image" style={{width: '85px', height: '85px'}} /></div>
      </div>
      <div className="hero-content">
        <div className="hero-badge">
          <FlameIcon /> Karachi&apos;s Hottest Fast Food
        </div>
        <h1 className="hero-title">
          ONE BITE.
          <span className="highlight">FULL HEAT.</span>
          FULL FLAVOR.
        </h1>
        <p className="hero-subtext">
          Crispy. Juicy. Unforgettable fast food in Karachi near Disco More.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => navigate('/menu')}>
            Order Now
          </button>
          <button className="btn-secondary" onClick={() => navigate('/menu')}>
            View Menu
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat">
            <span className="stat-number">15+</span>
            <span className="stat-label">Menu Items</span>
          </div>
          <div className="stat">
            <span className="stat-number">4.9</span>
            <span className="stat-label">Rating</span>
          </div>
        </div>
      </div>
      <div className="scroll-indicator" onClick={() => navigate('/menu')}>
        <span>Scroll</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  )
}
