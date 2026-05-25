import { AnimatedBackground } from './components/ui/AnimatedBackground'
import { CursorGlow } from './components/ui/CursorGlow'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { SmoothScroll } from './components/ui/SmoothScroll'
import { Navbar } from './components/sections/Navbar'
import { Hero } from './components/sections/Hero'
import { Marquee } from './components/sections/Marquee'
import { About } from './components/sections/About'
import { Journey } from './components/sections/Journey'
import { Services } from './components/sections/Services'
import { Projects } from './components/sections/Projects'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/sections/Footer'

export default function App() {
  return (
    <SmoothScroll>
      <AnimatedBackground />
      <ScrollProgress />
      <CursorGlow />
      <main className="text-haze font-kanit relative" style={{ overflowX: 'clip' }}>
        <Navbar />
        <Hero />
        <Marquee />
        <About />
        <Journey />
        <Services />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
