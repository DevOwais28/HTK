import { whyChooseUs } from '../hooks'

export default function WhySection() {
  return (
    <section id="about" className="why-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">WHY HTK?</span>
          <h2 className="section-title dark">THE HTK DIFFERENCE</h2>
        </div>
        <div className="why-grid">
          {whyChooseUs.map((item, index) => (
            <div key={item.title} className="why-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="why-icon">{item.icon}</div>
              <h3 className="why-title">{item.title}</h3>
              <p className="why-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
