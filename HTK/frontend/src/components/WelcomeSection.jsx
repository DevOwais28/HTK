export default function WelcomeSection({ scrollToSection }) {
  return (
    <section className="welcome-section">
      <div className="container">
        <div className="welcome-content">
          <div className="welcome-text">
            <h2 className="section-title">WELCOME TO HTK</h2>
            <p className="welcome-desc">
              Where the world comes to dine. Experience the crispiest, juiciest fast food 
              in Karachi. We bring bold flavors and authentic taste to every bite.
            </p>
            <button className="btn-outline" onClick={() => scrollToSection('about')}>
              Our Story
            </button>
          </div>
          <div className="welcome-gallery">
            <div className="gallery-item large"><img src="/burger.png" alt="Burger" className="food-image" style={{width: '100px', height: '100px'}} /></div>
            <div className="gallery-item"><img src="/chicken-leg.png" alt="Chicken" className="food-image" style={{width: '60px', height: '60px'}} /></div>
            <div className="gallery-item"><img src="/french-fries.png" alt="Fries" className="food-image" style={{width: '60px', height: '60px'}} /></div>
            <div className="gallery-item"><img src="/wrap.png" alt="Wrap" className="food-image" style={{width: '60px', height: '60px'}} /></div>
            <div className="gallery-item"><img src="/drink.png" alt="Drink" className="food-image" style={{width: '60px', height: '60px'}} /></div>
            <div className="gallery-item"><img src="/taco.png" alt="Taco" className="food-image" style={{width: '60px', height: '60px'}} /></div>
          </div>
        </div>
      </div>
    </section>
  )
}
