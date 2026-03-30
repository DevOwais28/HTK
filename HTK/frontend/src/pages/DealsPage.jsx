import Cart from '../components/Cart'
import OrderModal from '../components/OrderModal'
import FloatingCartButton from '../components/FloatingCartButton'
import { FlameIcon } from '../icons'
import { useState, useEffect } from 'react'

const defaultDeals = [
  { id: 'deal-1', name: 'Combo Deal 1', price: 899, originalPrice: 1100, iconType: 'combo', items: '2 Zinger Burgers + 2 Drinks', savings: 'Save Rs. 201', image: '/burger.png' },
  { id: 'deal-2', name: 'Family Pack', price: 1499, originalPrice: 1850, iconType: 'chicken', items: '4 Crispy Chicken + 2 Fries + 4 Drinks', savings: 'Save Rs. 351', image: '/chicken-leg.png' },
  { id: 'deal-3', name: 'Student Special', price: 599, originalPrice: 750, iconType: 'wrap', items: '1 Wrap + 1 Fries + 1 Drink', savings: 'Save Rs. 151', image: '/wrap.png' },
  { id: 'deal-4', name: 'Wings Lover', price: 799, originalPrice: 950, iconType: 'chicken', items: '12 Hot Wings + 2 Drinks', savings: 'Save Rs. 151', image: '/chicken-leg.png' },
]

export default function DealsPage({ 
  addToCart,
  cart,
  cartCount,
  cartTotal,
  isCartOpen,
  setIsCartOpen,
  isOrderModalOpen,
  setIsOrderModalOpen,
  updateQuantity,
  removeFromCart,
  clearCart,
  sendWhatsAppOrder,
  scrollToSection
}) {
  // Load deals from sessionStorage or use defaults
  const [deals] = useState(() => {
    const saved = sessionStorage.getItem('htk_deals')
    return saved ? JSON.parse(saved) : defaultDeals
  })

  // Save deals to sessionStorage on first load if not present
  useEffect(() => {
    if (!sessionStorage.getItem('htk_deals')) {
      sessionStorage.setItem('htk_deals', JSON.stringify(defaultDeals))
    }
  }, [])

  return (
    <div className="page deals-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Special Deals</h1>
          <p className="page-subtitle">Amazing offers for amazing taste</p>
        </div>
      </div>

      <section className="deals-section">
        <div className="container">
          <div className="deals-grid">
            {deals.map((deal) => (
              <div key={deal.id} className="deal-card">
                <div className="deal-badge">
                  <FlameIcon /> HOT DEAL
                </div>
                <div className="deal-emoji"><img src={deal.image} alt={deal.name} className="food-image" style={{width: '100px', height: '100px'}} /></div>
                <h3 className="deal-name">{deal.name}</h3>
                <p className="deal-items">{deal.items}</p>
                <div className="deal-pricing">
                  <span className="deal-original">Rs. {deal.originalPrice}</span>
                  <span className="deal-price">Rs. {deal.price}</span>
                </div>
                <span className="deal-savings">{deal.savings}</span>
                <button 
                  className="btn-primary full"
                  onClick={() => addToCart({ 
                    id: deal.id, 
                    name: deal.name, 
                    price: deal.price, 
                    emoji: '🍔'
                  })}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cart 
        cart={cart}
        cartCount={cartCount}
        cartTotal={cartTotal}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        setIsOrderModalOpen={setIsOrderModalOpen}
        scrollToSection={scrollToSection}
      />

      <OrderModal 
        cart={cart}
        cartTotal={cartTotal}
        isOrderModalOpen={isOrderModalOpen}
        setIsOrderModalOpen={setIsOrderModalOpen}
        sendWhatsAppOrder={sendWhatsAppOrder}
      />

      <FloatingCartButton 
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
      />
    </div>
  )
}
