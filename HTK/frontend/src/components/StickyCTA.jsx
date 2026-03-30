import { WhatsAppIcon } from '../icons'
import { OWNER_WHATSAPP } from '../hooks'
import { useNavigate } from 'react-router-dom'

export default function StickyCTA({ cartCount }) {
  const navigate = useNavigate()

  const handleClick = (e) => {
    if (cartCount === 0) {
      e.preventDefault()
      navigate('/menu')
    }
  }

  return (
    <a 
      href={cartCount > 0 ? `https://wa.me/${OWNER_WHATSAPP}` : '#'} 
      className="sticky-cta" 
      onClick={handleClick}
      target="_blank" 
      rel="noopener noreferrer"
    >
      <WhatsAppIcon /> {cartCount > 0 ? 'Order Now' : 'View Menu'}
    </a>
  )
}
