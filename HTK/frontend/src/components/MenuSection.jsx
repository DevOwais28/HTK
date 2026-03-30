import { PlusIcon } from '../icons'
import { getItemIcon } from '../icons/IconMapping'
import { useState } from 'react'

export default function MenuSection({ 
  categories, 
  filteredItems, 
  selectedCategory, 
  setSelectedCategory, 
  loading, 
  addToCart 
}) {
  const [selectedFlavours, setSelectedFlavours] = useState({})

  const handleFlavourChange = (itemId, flavour) => {
    setSelectedFlavours(prev => ({ ...prev, [itemId]: flavour }))
  }

  const handleAddToCart = (item) => {
    const itemWithFlavour = item.hasFlavourOptions 
      ? { ...item, selectedFlavour: selectedFlavours[item.id] || item.flavours[0] }
      : item
    addToCart(itemWithFlavour)
  }

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">OUR MENU</span>
          <h2 className="section-title dark">EXPLORE & ORDER</h2>
          <p className="section-subtitle">Select items to add to your cart</p>
        </div>

        <div className="category-filter">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">Loading menu...</div>
        ) : (
          <div className="menu-grid">
            {filteredItems.map((item) => {
              const imageSrc = getItemIcon(item)
              const isArray = Array.isArray(imageSrc)
              return (
                <div key={item.id} className="menu-card">
                  <div className={`menu-image-container ${isArray ? 'combo-images' : ''}`}>
                    {isArray ? (
                      imageSrc.map((src, idx) => (
                        <img 
                          key={idx}
                          src={src} 
                          alt={item.name}
                          className="menu-item-image combo-item"
                          style={{ marginLeft: idx > 0 ? '-15px' : '0', zIndex: imageSrc.length - idx }}
                        />
                      ))
                    ) : (
                      <img 
                        src={imageSrc} 
                        alt={item.name}
                        className="menu-item-image"
                      />
                    )}
                  </div>
                  <div className="menu-info">
                    <h3 className="menu-name">{item.name}</h3>
                    <span className="menu-category">{item.category}</span>
                    
                    {item.hasFlavourOptions && (
                      <div className="flavour-select">
                        <label>Flavour:</label>
                        <select 
                          value={selectedFlavours[item.id] || item.flavours[0]}
                          onChange={(e) => handleFlavourChange(item.id, e.target.value)}
                        >
                          {item.flavours.map(flavour => (
                            <option key={flavour} value={flavour}>{flavour}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    
                    <div className="menu-footer">
                      <span className="menu-price">Rs. {item.price}</span>
                      <button 
                        className="add-btn"
                        onClick={() => handleAddToCart(item)}
                      >
                        <PlusIcon /> Add
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
