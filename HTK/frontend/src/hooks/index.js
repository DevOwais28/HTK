import { useState, useEffect } from 'react'

// Owner's WhatsApp number
export const OWNER_WHATSAPP = "+923323728371"

// Default menu data
export const defaultMenuItems = [
  { id: 1, name: 'Zinger Burger', price: 450, category: 'Burgers', emoji: '🍔', available: true },
  { id: 2, name: 'Crispy Chicken', price: 380, category: 'Fried Chicken', emoji: '🍗', available: true },
  { id: 3, name: 'Loaded Fries', price: 350, category: 'Fries', emoji: '🍟', available: true },
  { id: 4, name: 'Chicken Wrap', price: 320, category: 'Wraps', emoji: '🌯', available: true },
  { id: 5, name: 'Cold Drink', price: 80, category: 'Drinks', emoji: '🥤', available: true },
  { id: 6, name: 'Cheese Burger', price: 520, category: 'Burgers', emoji: '🍔', available: true },
  { id: 7, name: 'Hot Wings (6 pcs)', price: 420, category: 'Fried Chicken', emoji: '🍗', available: true },
  { id: 8, name: 'Pizza Slice', price: 200, category: 'Pizza', emoji: '🍕', available: true },
]

export const whyChooseUs = [
  { icon: '🔥', title: 'Always Fresh & Hot', desc: 'Made to order, never pre-cooked' },
  { icon: '⚡', title: 'Fast Service', desc: 'Ready in under 10 minutes' },
  { icon: '🌶️', title: 'Bold Flavors', desc: 'Spicy, tangy, unforgettable taste' },
  { icon: '📍', title: 'Prime Location', desc: 'Near Disco More, easy to find' },
]

export const reviews = [
  { name: 'Ahmed K.', text: 'Best crispy burger in Karachi 🔥 The zinger is absolutely amazing!', rating: 5 },
  { name: 'Sara M.', text: 'Super fast service and amazing taste! My new favorite spot.', rating: 5 },
  { name: 'Bilal R.', text: 'Loaded fries are a must-try. Great value for money!', rating: 5 },
]

export function useCart() {
  // Load cart from sessionStorage on init
  const [cart, setCart] = useState(() => {
    const saved = sessionStorage.getItem('htk_cart')
    return saved ? JSON.parse(saved) : []
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  // Save cart to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('htk_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId))
  }

  const updateQuantity = (itemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + delta
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const clearCart = () => {
    setCart([])
    sessionStorage.removeItem('htk_cart')
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const sendWhatsAppOrder = (customerName, customerAddress, specialInstructions) => {
    if (!customerName || !customerAddress) {
      alert('Please enter your name and address')
      return { success: false }
    }

    // Generate unique order ID
    const orderId = 'HTK-' + Date.now().toString(36).toUpperCase()

    const orderDetails = cart.map(item => {
      const nameWithFlavour = item.selectedFlavour ? `${item.selectedFlavour} ${item.name}` : item.name
      return `${item.emoji} ${nameWithFlavour} x${item.quantity} = Rs. ${item.price * item.quantity}`
    }).join('\n')

    const message = `🍔 NEW ORDER - HTK\n\n` +
      `🆔 Order ID: ${orderId}\n` +
      `👤 Customer: ${customerName}\n` +
      `📍 Address: ${customerAddress}\n\n` +
      `📋 Order Details:\n${orderDetails}\n\n` +
      `💰 Total: Rs. ${cartTotal}\n\n` +
      `${specialInstructions ? `📝 Special Instructions: ${specialInstructions}\n\n` : ''}` +
      `⏰ Order Time: ${new Date().toLocaleString()}`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
    
    clearCart()
    setIsOrderModalOpen(false)
    return { success: true, orderId }
  }

  return {
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
  }
}

export function useMenu() {
  // Load menu from sessionStorage on init to preserve IDs
  const [menuItems, setMenuItems] = useState(() => {
    const saved = sessionStorage.getItem('htk_menu')
    return saved ? JSON.parse(saved) : defaultMenuItems
  })
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const SHEET_API_URL = import.meta.env.VITE_SHEET_API_URL || null
        
        if (SHEET_API_URL) {
          setLoading(true)
          const response = await fetch(SHEET_API_URL)
          const result = await response.json()
          
          // Sheety returns data wrapped in sheet name key, or directly as array
          const data = Array.isArray(result) ? result : result.sheet2 || result.data || []
          
          if (data && data.length > 0) {
            // Debug: log first item to see all column names
            console.log('First item from API:', data[0])
            console.log('All columns:', Object.keys(data[0]))
            
            // Find which column might contain flavours (check all keys)
            const firstItem = data[0]
            const possibleFlavourKeys = Object.keys(firstItem).filter(key => 
              key.toLowerCase().includes('flavour') || key.toLowerCase().includes('flavor')
            )
            console.log('Possible flavour columns:', possibleFlavourKeys)
            
            // Check actual values for those keys
            possibleFlavourKeys.forEach(key => {
              console.log(`Value for '${key}':`, firstItem[key])
            })
            
            // Generate stable IDs and parse flavours for pizzas
            const processedData = data
              .filter(item => item.available !== 'FALSE' && item.available !== false && item.name)
              .map((item, index) => {
                // Use API column name (camelCase conversion)
                const flavoursRaw = item['flavours(onlyForPizzas)']
                
                // Parse flavours for items that have flavours data (mainly pizzas)
                const flavours = flavoursRaw 
                  ? String(flavoursRaw).split(',').map(f => f.trim()).filter(f => f && f.toLowerCase() !== 'none')
                  : []
                
                return {
                  ...item,
                  id: item.id || `${item.category?.toLowerCase().replace(/\s+/g, '-')}-${item.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${index}`,
                  flavours,
                  hasFlavourOptions: flavours.length > 0
                }
              })
            console.log('Processed pizza items:', processedData.filter(i => i.category?.toLowerCase().includes('pizza')))
            setMenuItems(processedData)
            // Save to sessionStorage to preserve IDs
            sessionStorage.setItem('htk_menu', JSON.stringify(processedData))
          }
        }
      } catch (error) {
        console.log('Using default menu - Google Sheets not configured')
      } finally {
        setLoading(false)
      }
    }
    
    fetchMenu()
  }, [])

  const categories = ['All', ...new Set(menuItems.map(item => item.category))]
  
  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory)

  return {
    menuItems,
    categories,
    filteredItems,
    selectedCategory,
    setSelectedCategory,
    loading
  }
}

export function useScroll() {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return { scrolled, isMenuOpen, setIsMenuOpen, scrollToSection }
}
