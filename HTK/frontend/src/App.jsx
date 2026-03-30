import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import { useCart, useMenu, useScroll } from './hooks'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import MenuPage from './pages/MenuPage'
import DealsPage from './pages/DealsPage'

function AppContent() {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'
  
  // Hooks
  const { scrolled, isMenuOpen, setIsMenuOpen, scrollToSection } = useScroll()
  
  const {
    cart,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    isOrderModalOpen,
    setIsOrderModalOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    sendWhatsAppOrder
  } = useCart()
  
  const {
    categories,
    filteredItems,
    selectedCategory,
    setSelectedCategory,
    loading
  } = useMenu()

  return (
    <div className="app">
      <Navbar 
        scrolled={scrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
        isLandingPage={isLandingPage}
      />

      <Routes>
        <Route path="/" element={
          <Home scrollToSection={scrollToSection} cartCount={cartCount} />
        } />
        
        <Route path="/menu" element={
          <MenuPage 
            categories={categories}
            filteredItems={filteredItems}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            loading={loading}
            addToCart={addToCart}
            cart={cart}
            cartCount={cartCount}
            cartTotal={cartTotal}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            isOrderModalOpen={isOrderModalOpen}
            setIsOrderModalOpen={setIsOrderModalOpen}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            sendWhatsAppOrder={sendWhatsAppOrder}
            scrollToSection={scrollToSection}
          />
        } />
        
        <Route path="/deals" element={
          <DealsPage 
            addToCart={addToCart}
            cart={cart}
            cartCount={cartCount}
            cartTotal={cartTotal}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            isOrderModalOpen={isOrderModalOpen}
            setIsOrderModalOpen={setIsOrderModalOpen}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            sendWhatsAppOrder={sendWhatsAppOrder}
            scrollToSection={scrollToSection}
          />
        } />
      </Routes>

      {isLandingPage && <Footer scrollToSection={scrollToSection} />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
