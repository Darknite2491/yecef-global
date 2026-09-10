import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import StickyCta from './components/StickyCta.jsx'

import Home from './pages/Home.jsx'
import FreshFire from './pages/FreshFire.jsx'
import About from './pages/About.jsx'
import Editions from './pages/Editions.jsx'
import Give from './pages/Give.jsx'
import Serve from './pages/Serve.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <ScrollToTop />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fresh-fire" element={<FreshFire />} />
          <Route path="/about" element={<About />} />
          <Route path="/editions" element={<Editions />} />
          <Route path="/give" element={<Give />} />
          <Route path="/serve" element={<Serve />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
