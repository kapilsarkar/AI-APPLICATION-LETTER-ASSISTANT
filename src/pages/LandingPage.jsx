import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import HowItWorks from '../components/HowItWorks.jsx'

const LandingPage = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-stone-50">
      <div className="isolate">
        <Hero />
        <HowItWorks />
        <Features />
      </div>
    </main>
  )
}

export default LandingPage