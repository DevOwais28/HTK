import { CartIcon } from '../icons'

export default function FloatingCartButton({ cartCount, setIsCartOpen }) {
  return (
    <button 
      className="floating-cart-btn"
      onClick={() => setIsCartOpen(true)}
    >
      <CartIcon />
      {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
    </button>
  )
}
