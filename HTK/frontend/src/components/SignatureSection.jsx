import { FlameIcon } from '../icons'

export default function SignatureSection({ addToCart }) {
  const signatureItems = [
    { name: 'Zinger Burger', price: 'Rs. 450', description: 'Crispy chicken fillet with spicy sauce', spicy: 3, image: '/burger.png' },
    { name: 'Crispy Chicken Box', price: 'Rs. 650', description: '2 pcs crispy chicken with fries & drink', spicy: 2, image: '/chicken-leg.png' },
    { name: 'Loaded Fries', price: 'Rs. 350', description: 'Cheese, jalapenos & special sauce', spicy: 2, image: '/french-fries.png' },
  ]

  return (
    <section className="signature-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag light">SIGNATURE ITEMS</span>
          <h2 className="section-title">MORE THAN JUST A MEAL</h2>
        </div>
        <div className="signature-content">
          <div className="signature-features">
            {signatureItems.map((item, index) => (
              <div key={item.name} className="signature-item-row">
                <div className="signature-number">0{index + 1}</div>
                <div className="signature-info">
                  <div className="signature-header">
                    <h3 className="signature-name">{item.name}</h3>
                    <div className="spicy-level">
                      {[...Array(item.spicy)].map((_, i) => <FlameIcon key={i} />)}
                    </div>
                  </div>
                  <p className="signature-desc">{item.description}</p>
                  <div className="signature-footer">
                    <span className="signature-price">{item.price}</span>
                    <button 
                      className="btn-small"
                      onClick={() => addToCart({ 
                        id: `sig-${index}`, 
                        name: item.name, 
                        price: parseInt(item.price.replace('Rs. ', '')), 
                        emoji: '🍔'
                      })}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="signature-gallery">
            <div className="sig-gallery-item main"><img src="/burger.png" alt="Burger" className="food-image" style={{width: '100px', height: '100px'}} /></div>
            <div className="sig-gallery-item"><img src="/chicken-leg.png" alt="Chicken" className="food-image" style={{width: '60px', height: '60px'}} /></div>
            <div className="sig-gallery-item"><img src="/french-fries.png" alt="Fries" className="food-image" style={{width: '60px', height: '60px'}} /></div>
            <div className="sig-gallery-item"><img src="/wrap.png" alt="Wrap" className="food-image" style={{width: '60px', height: '60px'}} /></div>
          </div>
        </div>
      </div>
    </section>
  )
}
