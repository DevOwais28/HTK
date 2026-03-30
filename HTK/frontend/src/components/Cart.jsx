import { CloseIcon, MinusIcon, PlusIcon, TrashIcon } from '../icons'

export default function Cart({ 
  cart, 
  cartCount, 
  cartTotal, 
  isCartOpen, 
  setIsCartOpen, 
  updateQuantity, 
  removeFromCart, 
  clearCart, 
  setIsOrderModalOpen,
  scrollToSection
}) {
  if (!isCartOpen) return null

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Your Cart ({cartCount})</h3>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        
        {cart.length === 0 ? (
          <div className="cart-empty">
            <span className="empty-emoji">🛒</span>
            <p>Your cart is empty</p>
            <button className="btn-primary" onClick={() => {setIsCartOpen(false); scrollToSection('menu')}}>
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <span className="item-emoji">{item.emoji}</span>
                  <div className="item-details">
                    <h4>{item.selectedFlavour ? `${item.selectedFlavour} ${item.name}` : item.name}</h4>
                    <span className="item-price">Rs. {item.price}</span>
                  </div>
                  <div className="item-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}>
                      <MinusIcon />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>
                      <PlusIcon />
                    </button>
                  </div>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span className="total-amount">Rs. {cartTotal}</span>
              </div>
              <button 
                className="btn-primary full"
                onClick={() => {setIsCartOpen(false); setIsOrderModalOpen(true)}}
              >
                Checkout
              </button>
              <button className="clear-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
