import Hero from '../components/Hero'
import WelcomeSection from '../components/WelcomeSection'
import WhySection from '../components/WhySection'
import ReviewsSection from '../components/ReviewsSection'
import CTABanner from '../components/CTABanner'
import LocationSection from '../components/LocationSection'
import CommunitySection from '../components/CommunitySection'

export default function Home({ scrollToSection, cartCount }) {
  return (
    <>
      <Hero />
      <WelcomeSection scrollToSection={scrollToSection} />
      <WhySection />
      <ReviewsSection />
      <CTABanner />
      <LocationSection cartCount={cartCount} />
      <CommunitySection />
    </>
  )
}
