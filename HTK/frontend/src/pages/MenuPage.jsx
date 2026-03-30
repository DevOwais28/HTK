import MenuSection from '../components/MenuSection'
import Cart from '../components/Cart'
import OrderModal from '../components/OrderModal'
import FloatingCartButton from '../components/FloatingCartButton'

export default function MenuPage({ 
  categories, 
  filteredItems, 
  selectedCategory, 
  setSelectedCategory, 
  loading, 
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
  return (
    <div className="page menu-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Our Menu</h1>
          <p className="page-subtitle">Browse our delicious offerings</p>
        </div>
      </div>
      
      <MenuSection 
        categories={categories}
        filteredItems={filteredItems}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        loading={loading}
        addToCart={addToCart}
      />

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
