import { QuoteIcon, StarIcon } from '../icons'
import { reviews } from '../hooks'

export default function ReviewsSection() {
  return (
    <section className="reviews-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">TESTIMONIALS</span>
          <h2 className="section-title dark">WHAT OUR GUESTS ARE SAYING</h2>
        </div>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.name} className="review-card">
              <QuoteIcon />
              <div className="review-rating">
                {[...Array(review.rating)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <p className="review-text">&ldquo;{review.text}&rdquo;</p>
              <span className="reviewer-name">{review.name}</span>
            </div>
          ))}
        </div>
        <div className="section-nav">
          <button className="nav-dot active"></button>
          <button className="nav-dot"></button>
        </div>
      </div>
    </section>
  )
}
