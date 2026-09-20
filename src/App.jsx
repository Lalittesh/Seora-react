import React from 'react';
import './index.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesCarousel from './components/ServicesCarousel';
import CTASection from './components/CTASection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

function App() {
  return (
    <>
      {/*  AMBIENT BACKGROUND GLOWS  */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] radial-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"></div>
      <div className="fixed top-1/3 right-10 w-[700px] h-[700px] radial-glow-sapphire pointer-events-none -z-10 blur-3xl opacity-50"></div>
      <div className="fixed bottom-10 left-1/3 w-[650px] h-[650px] radial-glow-gold pointer-events-none -z-10 blur-3xl opacity-40"></div>

      <Navbar />
      
      <main>
        <Hero />
        <ServicesCarousel />
        <CTASection />
        <AboutSection />
      </main>

      <Footer />
    </>
  );
}

export default App;
