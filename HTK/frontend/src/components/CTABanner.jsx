export default function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="container">
        <div className="cta-content">
          <div className="cta-text">
            <span className="cta-label">COME HUNGRY</span>
          </div>
          <div className="cta-image food-trio">
            <img src="/burger.png" alt="Burger" className="food-image" style={{width: '70px', height: '70px'}} />
            <img src="/chicken-leg.png" alt="Chicken" className="food-image" style={{width: '65px', height: '65px'}} />
            <img src="/french-fries.png" alt="Fries" className="food-image" style={{width: '60px', height: '60px'}} />
          </div>
          <div className="cta-text">
            <span className="cta-label">LEAVE HAPPY</span>
          </div>
        </div>
      </div>
    </section>
  )
}
