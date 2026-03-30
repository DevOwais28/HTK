import { useState } from 'react'
import { CloseIcon, WhatsAppIcon } from '../icons'

export default function OrderModal({ 
  cart, 
  cartTotal, 
  isOrderModalOpen, 
  setIsOrderModalOpen, 
  sendWhatsAppOrder 
}) {
  const [customerName, setCustomerName] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderId, setOrderId] = useState('')

  if (!isOrderModalOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = sendWhatsAppOrder(customerName, customerAddress, specialInstructions)
    if (result.success) {
      setOrderId(result.orderId)
      setOrderSuccess(true)
      setCustomerName('')
      setCustomerAddress('')
      setSpecialInstructions('')
      // Auto close after 5 seconds
      setTimeout(() => {
        setIsOrderModalOpen(false)
        setOrderSuccess(false)
        setOrderId('')
      }, 5000)
    }
  }

  const handleClose = () => {
    setIsOrderModalOpen(false)
    setOrderSuccess(false)
    setOrderId('')
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="order-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{orderSuccess ? '✅ Order Sent!' : '📝 Complete Your Order'}</h3>
          <button className="close-btn" onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>
        
        <div className="modal-content">
          {orderSuccess ? (
            <div className="order-success">
              <div className="success-icon">🎉</div>
              <h4>Thank you for your order!</h4>
              <p className="order-id">Order ID: <strong>{orderId}</strong></p>
              <p className="success-message">
                Your order has been sent to our WhatsApp. Please save this Order ID for reference.
              </p>
              <p className="success-note">
                We&apos;ll confirm your order shortly!
              </p>
            </div>
          ) : (
            <>
              <div className="order-summary">
                <h4>Order Summary</h4>
                <div className="summary-items">
                  {cart.map(item => (
                    <div key={item.id} className="summary-item">
                      <span>
                        {item.emoji} {item.selectedFlavour ? `${item.selectedFlavour} ${item.name}` : item.name}
                        x{item.quantity}
                      </span>
                      <span>Rs. {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-total">
                  <strong>Total:</strong>
                  <strong>Rs. {cartTotal}</strong>
                </div>
              </div>
              
              <form className="order-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Your Name *</label>
                  <input 
                    type="text" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Delivery Address *</label>
                  <textarea 
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Enter your complete address"
                    rows="3"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Special Instructions</label>
                  <textarea 
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any special requests? (optional)"
                    rows="2"
                  />
                </div>
                
                <button type="submit" className="btn-primary full whatsapp-submit">
                  <WhatsAppIcon /> Send Order via WhatsApp
                </button>
                
                <p className="form-note">
                  Your order will be sent directly to our WhatsApp. We&apos;ll confirm your order shortly!
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
