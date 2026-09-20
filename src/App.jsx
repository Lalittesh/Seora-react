import React, { useState } from 'react';
import './index.css';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <>
      

  {/*  AMBIENT BACKGROUND GLOWS  */}
  <div className="fixed top-0 left-1/4 w-[600px] h-[600px] radial-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"></div>
  <div className="fixed top-1/3 right-10 w-[700px] h-[700px] radial-glow-sapphire pointer-events-none -z-10 blur-3xl opacity-50"></div>
  <div className="fixed bottom-10 left-1/3 w-[650px] h-[650px] radial-glow-gold pointer-events-none -z-10 blur-3xl opacity-40"></div>

  {/*  1. FIXED NAVBAR  */}
  <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
      
      {/*  Brand Logo / Wordmark  */}
      <a href="#hero" className="flex items-center gap-3 group">
        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#C99E47] via-[#FBE8B5] to-[#C99E47] p-[1px] shadow-lg shadow-[#E5C07B]/20 transition-transform duration-500 group-hover:scale-105">
          <div className="w-full h-full bg-[#090D18] rounded-[11px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E5C07B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {/*  Diamond faceted icon  */}
            <svg className="w-5 h-5 text-[#FBE8B5] transform transition-transform group-hover:rotate-45 duration-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 9.5L12 22L22 9.5L12 2Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"></path>
              <path d="M2 9.5H22M12 2L8 9.5L12 22L16 9.5L12 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-display text-2xl font-bold tracking-[0.2em] text-white group-hover:text-[#FBE8B5] transition-colors">
            SEORA
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#E5C07B] font-medium -mt-1">
            Service booker
          </span>
        </div>
      </a>

      {/*  Center Navigation Links  */}
      <nav className="hidden md:flex items-center gap-10">
        <a href="#hero" className="text-sm font-medium text-slate-300 hover:text-[#FBE8B5] tracking-wider uppercase transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#FBE8B5] after:to-[#C99E47] hover:after:w-full after:transition-all after:duration-300">
          Home
        </a>
        <a href="#services" className="text-sm font-medium text-slate-300 hover:text-[#FBE8B5] tracking-wider uppercase transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#FBE8B5] after:to-[#C99E47] hover:after:w-full after:transition-all after:duration-300">
          Services
        </a>
        <a href="#about" className="text-sm font-medium text-slate-300 hover:text-[#FBE8B5] tracking-wider uppercase transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#FBE8B5] after:to-[#C99E47] hover:after:w-full after:transition-all after:duration-300">
          About
        </a>
      </nav>

      {/*  Right Actions: Login & Get Started  */}
      <div className="hidden sm:flex items-center gap-6">
        <a href="#login" className="text-sm font-medium tracking-wide text-slate-300 hover:text-white transition-colors px-3 py-2">
          Login
        </a>
        
        {/*  Premium Get Started Button  */}
        <a href="#cta" className="relative group p-[1px] rounded-full overflow-hidden inline-flex">
          <span className="absolute inset-0 bg-gradient-to-r from-[#E5C07B] via-[#FFFFFF] to-[#C99E47] rounded-full animate-pulse opacity-80 group-hover:opacity-100 transition-opacity"></span>
          <span className="relative px-6 py-2.5 rounded-full bg-[#0B0F1C] text-slate-100 text-sm font-semibold tracking-wide flex items-center gap-2 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#13192B] group-hover:to-[#1B233D] group-hover:text-[#FBE8B5] shadow-lg shadow-black/40">
            <span className="">Get Started</span>
            <svg className="w-4 h-4 text-[#E5C07B] transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
        </a>
      </div>

      {/*  Mobile Hamburger Button  */}
      <button id="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-[#FBE8B5] focus:outline-none" aria-label="Toggle Navigation Menu">
        <span className="w-5 h-[2px] bg-current mb-1.5 transition-all" id="line-1"></span>
        <span className="w-5 h-[2px] bg-current mb-1.5 transition-all" id="line-2"></span>
        <span className="w-3.5 h-[2px] bg-current self-start ml-2.5 transition-all" id="line-3"></span>
      </button>

    </div>

    {/*  Mobile Drawer Menu  */}
    <div id="mobile-menu" className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:hidden px-6 pt-4 pb-8 glass-nav border-t border-white/5 bg-[#090D18]/95 flex-col space-y-4`}>
      <a href="#hero" className="block py-2 text-base font-medium text-slate-200 hover:text-[#FBE8B5] border-b border-white/5">Home</a>
      <a href="#services" className="block py-2 text-base font-medium text-slate-200 hover:text-[#FBE8B5] border-b border-white/5">Services</a>
      <a href="#about" className="block py-2 text-base font-medium text-slate-200 hover:text-[#FBE8B5] border-b border-white/5">About</a>
      <div className="pt-4 flex flex-col gap-3">
        <a href="#login" className="text-center py-2.5 rounded-xl border border-white/10 text-sm font-medium text-slate-200">Login</a>
        <a href="#cta" className="text-center py-3 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-sm font-bold tracking-wider shadow-lg">Get Started</a>
      </div>
    </div>
  </header>

  <main>
    {/*  2. HERO SECTION  */}
    <section id="hero" className="relative min-h-screen pt-28 pb-20 lg:pt-36 lg:pb-28 flex items-center justify-center overflow-hidden">
      
      {/*  Generated Hero Campaign Image Background  */}
      <div className="absolute inset-0 z-0">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU7xAD1i-7A1hXTm8lp2_f73ngDw-FHm-p7Js_GDlFI_WuDLEtOO5OF8W6wXn4uKS--bDYl1xzmJbTMELHj4QV-TTPqqxMDFFV9YdrGhnssjjOhqXSLk955SrVAmRck83_dS5W77HYQOACdjZ0FNYRjKGh_U6exM5DPHAIlpHrgFcujjwxJ-0kMmmtF26nsDnxctDI7dwsgI_pG9VjJ58MDYVhWRFbeL5ndL0KNF1bvOs9W2cyjQRrgGEXZk0qu4CU16L1c-mikLYUpA8" alt="Smooth golden wave curves on a luxurious dark background" className="w-full h-full object-cover object-center transform scale-105 duration-1000 ease-out" />
        {/*  Cinematic Dark Jewelry-Inspired Gradient Overlays for Extreme Contrast & Readability  */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070E] via-transparent to-[#05070E]/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070E]/80 via-transparent to-transparent"></div>
        
      </div>

      {/*  Hero Main Content Grid  */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-8 flex flex-col items-start space-y-8">
          
          {/*  Luxury Diamond Badge  */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#E5C07B]/30 backdrop-blur-md shadow-lg shadow-black/40">
            <span className="w-2 h-2 rounded-full bg-[#E5C07B] animate-ping"></span>
            <svg className="w-3.5 h-3.5 text-[#FBE8B5]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-xs uppercase tracking-[0.25em] text-[#FBE8B5] font-semibold">
              Your friendly neighbour
            </span>
          </div>

          {/*  Hero Headline  */}
          <div className="space-y-3">
            <h1 className="font-serifHeading text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.12]">
              Your Trusted <br />
              <span className="gold-gradient-text font-serifHeading italic pr-2 font-normal">
                Local Service <br /> Partner
              </span>
            </h1>
          </div>

          {/*  Supporting Text  */}
          <p className="max-w-2xl text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
            Find skilled technicians for your everyday needs. Meticulously vetted master craftsmen, precision diagnostics, and white-glove residential care curated for discerning homes.
          </p>

        </div>

      </div>

      {/*  Action Buttons (Bottom Right Side)  */}
      <div className="absolute bottom-10 sm:bottom-12 lg:bottom-16 right-0 left-0 z-20 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-end">
          <div className="flex flex-row items-center gap-4 pointer-events-auto">
            {/*  Primary Button  */}
            <a href="#cta" className="relative group p-[1px] rounded-2xl overflow-hidden shadow-2xl shadow-[#E5C07B]/25">
              <span className="absolute inset-0 bg-gradient-to-r from-[#E5C07B] via-[#FFFDF8] to-[#C99E47] transition-all duration-300 group-hover:scale-105"></span>
              <span className="relative px-6 py-3 rounded-2xl bg-gradient-to-b from-[#182035] to-[#0D1220] flex items-center justify-center gap-3 text-white font-semibold tracking-wide transition-all duration-300 group-hover:bg-opacity-80 h-full">
                <span className="text-[#FBE8B5] group-hover:text-white transition-colors text-sm sm:text-base whitespace-nowrap">Book a Service</span>
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#E5C07B]/20 flex items-center justify-center text-[#FBE8B5] group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </a>

            {/*  Secondary Button  */}
            <a href="#services" className="px-6 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-[#E5C07B]/50 backdrop-blur-md text-slate-200 hover:text-[#FBE8B5] font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group">
              <span className="text-sm sm:text-base whitespace-nowrap">Explore Services</span>
              <svg className="w-4 h-4 text-slate-400 group-hover:text-[#E5C07B] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    {/*  3 & 4. OUR SERVICES — CONTINUOUS AUTO CAROUSEL  */}
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#05070E] via-[#090D18] to-[#05070E]">
      
      {/*  Ambient Section Glows  */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] radial-glow-sapphire pointer-events-none -translate-y-1/2 blur-3xl opacity-40"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] radial-glow-gold pointer-events-none -translate-y-1/2 blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16 text-center">
        {/*  Section Tag  */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-[#E5C07B]/30 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5C07B]"></span>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#FBE8B5] font-medium">Bespoke Expertise</span>
        </div>
        
        {/*  Section Title  */}
        <h2 className="font-serifHeading text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          Our <span className="gold-gradient-text italic font-normal">Services</span>
        </h2>
        
        {/*  Supporting Text  */}
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light">
          Professional help for every essential task at home.
        </p>

        {/*  Carousel Status Indicator  */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-[#E5C07B] animate-pulse"></span>
          <span className="tracking-wider uppercase text-[10px] text-slate-400">Continuous Infinite Showcase • 4 Signature Disciplines</span>
        </div>
      </div>

      {/*  INFINITE CAROUSEL VIEWPORT (No hover pause, seamlessly repeats)  */}
      <div className="carousel-container relative w-full overflow-hidden py-6">
        
        {/*  Left & Right Gradient Fog Masks for Elegant Fade Edge  */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-r from-[#05070E] via-[#05070E]/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-l from-[#05070E] via-[#05070E]/80 to-transparent z-20 pointer-events-none"></div>

        {/*  The Seamless Infinite Carousel Track  */}
        {/*  Contains Set 1 (4 items) + Set 2 (4 items duplicated for seamless loop)  */}
        <div className="carousel-track flex items-center gap-6 sm:gap-8 px-4" style={{ animationPlayState: 'running' }}>
          
          {/*  ===================== SET 1 =====================  */}

          {/*  CARD 1: Plumber  */}
          <div className="carousel-card w-[290px] sm:w-[340px] lg:w-[380px] flex-shrink-0 group">
            <div className="luxury-card-border transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-[#E5C07B]/20">
              <div className="glass-card rounded-[23px] overflow-hidden flex flex-col h-[490px] sm:h-[540px]">
                {/*  85% Image Area  */}
                <div className="relative h-[85%] w-full overflow-hidden bg-slate-900">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_LzkeyEfdeFiVhyFqD43W90kJLeQ-b4WShJzbaQAYFpytmFTurLgcj77QRpZUXInGN_qRmP5x1hvSBUyu-A53r4O-DpzL049sWTCy_gYc-6oRR2YwAAb1w7as7LDuxwYFvEvg0YsMn32qQtaEK1HceF65OCQfB_-VMw31KFsXgavpmzf1vYkZD-eVYrAXkrylFokuVVravwr7euP9NEcJikDUrTBi3QCnDl7euXVGM-d05mgqcOWzJw" alt="Master Plumber" className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-transparent to-black/20"></div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E5C07B]/30 text-[11px] tracking-wider text-[#FBE8B5] uppercase font-medium">
                    Master Class
                  </div>
                </div>
                {/*  15% Service Name & Details  */}
                <div className="h-[15%] w-full px-6 flex items-center justify-between bg-gradient-to-b from-[#090D18] to-[#05070E]">
                  <div>
                    <h3 className="font-serifHeading text-xl sm:text-2xl font-bold text-white group-hover:text-[#FBE8B5] transition-colors">
                      Plumber
                    </h3>
                    <p className="text-[11px] text-slate-400 tracking-wide">Architectural fixtures &amp; hydronics</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-300 group-hover:border-[#E5C07B] group-hover:text-[#E5C07B] transition-colors">
                    ↗
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  CARD 2: Electrician  */}
          <div className="carousel-card w-[290px] sm:w-[340px] lg:w-[380px] flex-shrink-0 group">
            <div className="luxury-card-border transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-[#E5C07B]/20">
              <div className="glass-card rounded-[23px] overflow-hidden flex flex-col h-[490px] sm:h-[540px]">
                {/*  85% Image Area  */}
                <div className="relative h-[85%] w-full overflow-hidden bg-slate-900">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0xLF6xyX6TIyFesYHnSY-gGiYjH1WzxwlEbf1tRSydOty2L-Qyam4m-rJXkBmkd4gWgPjRJb33MKDYxIZ8M4jB-SVF1cxYDfq8ONyuuCVuaxjeFD-X0SQJZP0UEmTo6a7PMsb_WaVkJTYxYHkqToZsLJFlHwk4qMSK2gyDJRxupC8kBDlRsPevMJfQVDPMtUX7mlSGZvGqJ9nmb0P3JGLBk6y95gCwnU8gwoseOFjIuNjeuhNvCSDAQ" alt="Master Electrician" className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-transparent to-black/20"></div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E5C07B]/30 text-[11px] tracking-wider text-[#FBE8B5] uppercase font-medium">
                    Smart Systems
                  </div>
                </div>
                {/*  15% Service Name & Details  */}
                <div className="h-[15%] w-full px-6 flex items-center justify-between bg-gradient-to-b from-[#090D18] to-[#05070E]">
                  <div>
                    <h3 className="font-serifHeading text-xl sm:text-2xl font-bold text-white group-hover:text-[#FBE8B5] transition-colors">
                      Electrician
                    </h3>
                    <p className="text-[11px] text-slate-400 tracking-wide">Smart automation &amp; circuitry</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-300 group-hover:border-[#E5C07B] group-hover:text-[#E5C07B] transition-colors">
                    ↗
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  CARD 3: Carpenter  */}
          <div className="carousel-card w-[290px] sm:w-[340px] lg:w-[380px] flex-shrink-0 group">
            <div className="luxury-card-border transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-[#E5C07B]/20">
              <div className="glass-card rounded-[23px] overflow-hidden flex flex-col h-[490px] sm:h-[540px]">
                {/*  85% Image Area  */}
                <div className="relative h-[85%] w-full overflow-hidden bg-slate-900">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAx-zpcei9id0qJQx_4FD8yln94oH8DBBWpc5RacCzoM_6RLp1CI_KXioQ5vZhp8SiGS-1iiyI4jKsKIpl_pWTpcGjWlW6YxVPXRl2SqEe6m1yXw7jNiIkZtGQNEFL-TPdQJh5ZrtGhZpyIUO1VkWOWEMBmy2sNVeGkDToKlzDfgcpN4cA1rty0rAi3YC7lEfNgo8Pdx6k1s0AMWcXfG4RAprnggxVJrg-Emlmnakj9CKQ_IEH56CHKiw" alt="Master Carpenter" className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-transparent to-black/20"></div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E5C07B]/30 text-[11px] tracking-wider text-[#FBE8B5] uppercase font-medium">
                    Artisan Woodwork
                  </div>
                </div>
                {/*  15% Service Name & Details  */}
                <div className="h-[15%] w-full px-6 flex items-center justify-between bg-gradient-to-b from-[#090D18] to-[#05070E]">
                  <div>
                    <h3 className="font-serifHeading text-xl sm:text-2xl font-bold text-white group-hover:text-[#FBE8B5] transition-colors">
                      Carpenter
                    </h3>
                    <p className="text-[11px] text-slate-400 tracking-wide">Bespoke joinery &amp; restoration</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-300 group-hover:border-[#E5C07B] group-hover:text-[#E5C07B] transition-colors">
                    ↗
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  CARD 4: Cleaner  */}
          <div className="carousel-card w-[290px] sm:w-[340px] lg:w-[380px] flex-shrink-0 group">
            <div className="luxury-card-border transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-[#E5C07B]/20">
              <div className="glass-card rounded-[23px] overflow-hidden flex flex-col h-[490px] sm:h-[540px]">
                {/*  85% Image Area  */}
                <div className="relative h-[85%] w-full overflow-hidden bg-slate-900">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2YJyO9Dj4E3AsjQ9-zEWyApPP7glD5KamA5KUNA-EdrqRl0BYfi5UgsZiSbzhROyy7LWMHvaI6JUQgltgTP4OvnmRbppYawfFwdmBlzto6sRAtp0Sr0Uas-HJLK7b_nlN_AITCz-MgtWqo9N7-4Uls4z9mzwwyi2jVM_IQSZHvqXN391BLm2iA7D4cKD1qcGqNdKqAWv4CCOh_omwLMITZJvaqNCLWBCJKnvmMA2DT94sikG4_2xwgg" alt="Elite Cleaner" className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-transparent to-black/20"></div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E5C07B]/30 text-[11px] tracking-wider text-[#FBE8B5] uppercase font-medium">
                    White Glove
                  </div>
                </div>
                {/*  15% Service Name & Details  */}
                <div className="h-[15%] w-full px-6 flex items-center justify-between bg-gradient-to-b from-[#090D18] to-[#05070E]">
                  <div>
                    <h3 className="font-serifHeading text-xl sm:text-2xl font-bold text-white group-hover:text-[#FBE8B5] transition-colors">
                      Cleaner
                    </h3>
                    <p className="text-[11px] text-slate-400 tracking-wide">Hospitality grade house stewardship</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-300 group-hover:border-[#E5C07B] group-hover:text-[#E5C07B] transition-colors">
                    ↗
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  ===================== SET 2 (DUPLICATE TO ENSURE SEAMLESS INFINITE LOOP) =====================  */}

          {/*  CARD 1 DUP: Plumber  */}
          <div className="carousel-card w-[290px] sm:w-[340px] lg:w-[380px] flex-shrink-0 group" aria-hidden="true">
            <div className="luxury-card-border transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-[#E5C07B]/20">
              <div className="glass-card rounded-[23px] overflow-hidden flex flex-col h-[490px] sm:h-[540px]">
                {/*  85% Image Area  */}
                <div className="relative h-[85%] w-full overflow-hidden bg-slate-900">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_LzkeyEfdeFiVhyFqD43W90kJLeQ-b4WShJzbaQAYFpytmFTurLgcj77QRpZUXInGN_qRmP5x1hvSBUyu-A53r4O-DpzL049sWTCy_gYc-6oRR2YwAAb1w7as7LDuxwYFvEvg0YsMn32qQtaEK1HceF65OCQfB_-VMw31KFsXgavpmzf1vYkZD-eVYrAXkrylFokuVVravwr7euP9NEcJikDUrTBi3QCnDl7euXVGM-d05mgqcOWzJw" alt="Master Plumber" className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-transparent to-black/20"></div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E5C07B]/30 text-[11px] tracking-wider text-[#FBE8B5] uppercase font-medium">
                    Master Class
                  </div>
                </div>
                {/*  15% Service Name & Details  */}
                <div className="h-[15%] w-full px-6 flex items-center justify-between bg-gradient-to-b from-[#090D18] to-[#05070E]">
                  <div>
                    <h3 className="font-serifHeading text-xl sm:text-2xl font-bold text-white group-hover:text-[#FBE8B5] transition-colors">
                      Plumber
                    </h3>
                    <p className="text-[11px] text-slate-400 tracking-wide">Architectural fixtures &amp; hydronics</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-300 group-hover:border-[#E5C07B] group-hover:text-[#E5C07B] transition-colors">
                    ↗
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  CARD 2 DUP: Electrician  */}
          <div className="carousel-card w-[290px] sm:w-[340px] lg:w-[380px] flex-shrink-0 group" aria-hidden="true">
            <div className="luxury-card-border transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-[#E5C07B]/20">
              <div className="glass-card rounded-[23px] overflow-hidden flex flex-col h-[490px] sm:h-[540px]">
                {/*  85% Image Area  */}
                <div className="relative h-[85%] w-full overflow-hidden bg-slate-900">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0xLF6xyX6TIyFesYHnSY-gGiYjH1WzxwlEbf1tRSydOty2L-Qyam4m-rJXkBmkd4gWgPjRJb33MKDYxIZ8M4jB-SVF1cxYDfq8ONyuuCVuaxjeFD-X0SQJZP0UEmTo6a7PMsb_WaVkJTYxYHkqToZsLJFlHwk4qMSK2gyDJRxupC8kBDlRsPevMJfQVDPMtUX7mlSGZvGqJ9nmb0P3JGLBk6y95gCwnU8gwoseOFjIuNjeuhNvCSDAQ" alt="Master Electrician" className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-transparent to-black/20"></div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E5C07B]/30 text-[11px] tracking-wider text-[#FBE8B5] uppercase font-medium">
                    Smart Systems
                  </div>
                </div>
                {/*  15% Service Name & Details  */}
                <div className="h-[15%] w-full px-6 flex items-center justify-between bg-gradient-to-b from-[#090D18] to-[#05070E]">
                  <div>
                    <h3 className="font-serifHeading text-xl sm:text-2xl font-bold text-white group-hover:text-[#FBE8B5] transition-colors">
                      Electrician
                    </h3>
                    <p className="text-[11px] text-slate-400 tracking-wide">Smart automation &amp; circuitry</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-300 group-hover:border-[#E5C07B] group-hover:text-[#E5C07B] transition-colors">
                    ↗
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  CARD 3 DUP: Carpenter  */}
          <div className="carousel-card w-[290px] sm:w-[340px] lg:w-[380px] flex-shrink-0 group" aria-hidden="true">
            <div className="luxury-card-border transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-[#E5C07B]/20">
              <div className="glass-card rounded-[23px] overflow-hidden flex flex-col h-[490px] sm:h-[540px]">
                {/*  85% Image Area  */}
                <div className="relative h-[85%] w-full overflow-hidden bg-slate-900">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAx-zpcei9id0qJQx_4FD8yln94oH8DBBWpc5RacCzoM_6RLp1CI_KXioQ5vZhp8SiGS-1iiyI4jKsKIpl_pWTpcGjWlW6YxVPXRl2SqEe6m1yXw7jNiIkZtGQNEFL-TPdQJh5ZrtGhZpyIUO1VkWOWEMBmy2sNVeGkDToKlzDfgcpN4cA1rty0rAi3YC7lEfNgo8Pdx6k1s0AMWcXfG4RAprnggxVJrg-Emlmnakj9CKQ_IEH56CHKiw" alt="Master Carpenter" className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-transparent to-black/20"></div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E5C07B]/30 text-[11px] tracking-wider text-[#FBE8B5] uppercase font-medium">
                    Artisan Woodwork
                  </div>
                </div>
                {/*  15% Service Name & Details  */}
                <div className="h-[15%] w-full px-6 flex items-center justify-between bg-gradient-to-b from-[#090D18] to-[#05070E]">
                  <div>
                    <h3 className="font-serifHeading text-xl sm:text-2xl font-bold text-white group-hover:text-[#FBE8B5] transition-colors">
                      Carpenter
                    </h3>
                    <p className="text-[11px] text-slate-400 tracking-wide">Bespoke joinery &amp; restoration</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-300 group-hover:border-[#E5C07B] group-hover:text-[#E5C07B] transition-colors">
                    ↗
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  CARD 4 DUP: Cleaner  */}
          <div className="carousel-card w-[290px] sm:w-[340px] lg:w-[380px] flex-shrink-0 group" aria-hidden="true">
            <div className="luxury-card-border transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-[#E5C07B]/20">
              <div className="glass-card rounded-[23px] overflow-hidden flex flex-col h-[490px] sm:h-[540px]">
                {/*  85% Image Area  */}
                <div className="relative h-[85%] w-full overflow-hidden bg-slate-900">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2YJyO9Dj4E3AsjQ9-zEWyApPP7glD5KamA5KUNA-EdrqRl0BYfi5UgsZiSbzhROyy7LWMHvaI6JUQgltgTP4OvnmRbppYawfFwdmBlzto6sRAtp0Sr0Uas-HJLK7b_nlN_AITCz-MgtWqo9N7-4Uls4z9mzwwyi2jVM_IQSZHvqXN391BLm2iA7D4cKD1qcGqNdKqAWv4CCOh_omwLMITZJvaqNCLWBCJKnvmMA2DT94sikG4_2xwgg" alt="Elite Cleaner" className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-transparent to-black/20"></div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E5C07B]/30 text-[11px] tracking-wider text-[#FBE8B5] uppercase font-medium">
                    White Glove
                  </div>
                </div>
                {/*  15% Service Name & Details  */}
                <div className="h-[15%] w-full px-6 flex items-center justify-between bg-gradient-to-b from-[#090D18] to-[#05070E]">
                  <div>
                    <h3 className="font-serifHeading text-xl sm:text-2xl font-bold text-white group-hover:text-[#FBE8B5] transition-colors">
                      Cleaner
                    </h3>
                    <p className="text-[11px] text-slate-400 tracking-wide">Hospitality grade house stewardship</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-300 group-hover:border-[#E5C07B] group-hover:text-[#E5C07B] transition-colors">
                    ↗
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>

    {/*  7. CTA SECTION  */}
    <section id="cta" className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        
        {/*  Rich Colorful Gradient Container with Diamond / Gold Accents  */}
        <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-[#C99E47]/40 via-[#A78BFA]/30 to-[#1D4ED8]/40 shadow-2xl shadow-black/80">
          
          <div className="relative rounded-[23px] overflow-hidden bg-gradient-to-br from-[#0B0F1E] via-[#0E1528] to-[#080B15] px-8 py-16 sm:px-16 sm:py-20 text-center">
            
            {/*  Subtle Decorative Diamond/Light Particles  */}
            <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-[#FBE8B5] shadow-[0_0_12px_#FBE8B5] animate-ping"></div>
            <div className="absolute bottom-12 right-16 w-3 h-3 rounded-full bg-[#A78BFA] shadow-[0_0_15px_#A78BFA] opacity-75"></div>
            <div className="absolute top-1/2 right-12 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]"></div>
            <div className="absolute bottom-10 left-20 w-2 h-2 rounded-full bg-[#E5C07B] shadow-[0_0_10px_#E5C07B] opacity-60"></div>
            
            {/*  Radial background highlight inside card  */}
            <div className="absolute inset-0 bg-radial-gradient from-[#E5C07B]/10 via-transparent to-transparent pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#E5C07B]/30 backdrop-blur-md">
                <svg className="w-4 h-4 text-[#FBE8B5]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"></path>
                </svg>
                <span className="text-xs uppercase tracking-[0.25em] text-[#FBE8B5] font-semibold">Priority Booking Available</span>
              </div>

              {/*  Headline verbatim: Need a Technician Today?  */}
              <h2 className="font-serifHeading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                Need a Technician <span className="gold-gradient-text italic font-normal">Today?</span>
              </h2>

              {/*  Supporting copy  */}
              <p className="text-base sm:text-lg text-slate-300 font-light max-w-xl mx-auto leading-relaxed">
                Experience seamless luxury service. Our concierge pairs you with an accredited master technician in your neighborhood within moments.
              </p>

              {/*  Primary Button verbatim: Book Your Service  */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#book" className="relative group p-[1px] rounded-2xl overflow-hidden shadow-2xl shadow-[#E5C07B]/30 transform hover:-translate-y-0.5 transition-all">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#FBE8B5] via-[#E5C07B] to-[#C99E47] group-hover:scale-105 transition-transform duration-300"></span>
                  <span className="relative px-10 py-4 rounded-2xl bg-gradient-to-r from-[#172038] via-[#0E1528] to-[#172038] flex items-center justify-center gap-3 text-white font-bold tracking-wider text-base transition-colors group-hover:bg-opacity-80">
                    <span className="text-[#FBE8B5] group-hover:text-white transition-colors">Book Your Service</span>
                    <svg className="w-5 h-5 text-[#E5C07B] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </span>
                </a>
              </div>

              {/*  Reassurance Microcopy  */}
              <p className="text-xs text-slate-400 tracking-wide pt-2">
                Transparent upfront quotes • Dedicated client liaison • Guaranteed on-time arrival
              </p>

            </div>

          </div>
        </div>

      </div>
    </section>

    {/*  ABOUT SECTION (Brief Luxury Story for Anchor)  */}
    <section id="about" className="py-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="w-12 h-12 rounded-xl bg-[#E5C07B]/10 border border-[#E5C07B]/30 flex items-center justify-center text-[#E5C07B] mb-6">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <h3 className="font-serifHeading text-xl font-bold text-white mb-2">Vetted Mastery</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Only the top 3% of regional trades specialists meet Seora's rigorous craftsmanship and background examinations.
          </p>
        </div>
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="w-12 h-12 rounded-xl bg-[#A78BFA]/10 border border-[#A78BFA]/30 flex items-center justify-center text-[#A78BFA] mb-6">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="font-serifHeading text-xl font-bold text-white mb-2">Punctual Elegance</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Respect for your personal sanctuary with precise dispatch time-windows, floor protection, and courteous conduct.
          </p>
        </div>
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="w-12 h-12 rounded-xl bg-[#1D4ED8]/10 border border-[#1D4ED8]/30 flex items-center justify-center text-blue-400 mb-6">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 className="font-serifHeading text-xl font-bold text-white mb-2">Immediate Booking</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Direct real-time reservation protocol paired with intelligent scheduling that adapts to your residence's schedule.
          </p>
        </div>
      </div>
    </section>
  </main>

  {/*  8. FOOTER  */}
  <footer className="bg-[#03050A] border-t border-white/10 pt-16 pb-12 text-slate-400 relative">
    
    {/*  Subtle Gold Separator Line  */}
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#E5C07B]/30 to-transparent"></div>
    </div>

    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
      
      {/*  Brand Column  */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#C99E47] via-[#FBE8B5] to-[#C99E47] p-[1px]">
            <div className="w-full h-full bg-[#090D18] rounded-[7px] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#FBE8B5]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 9.5L12 22L22 9.5L12 2Z" fill="none" stroke="currentColor" strokeWidth="2"></path>
              </svg>
            </div>
          </div>
          <span className="font-display text-2xl font-bold tracking-[0.2em] text-white">
            SEORA
          </span>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed font-light">
          Redefining private residential maintenance with high-touch craft, transparent service standards, and verified master tradesmen.
        </p>
      </div>

      {/*  Quick Links Column  */}
      <div>
        <h4 className="text-xs uppercase font-semibold tracking-[0.25em] text-[#E5C07B] mb-5">Quick Links</h4>
        <ul className="space-y-3 text-sm">
          <li className=""><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
          <li className=""><a href="#services" className="hover:text-white transition-colors">Services</a></li>
          <li className=""><a href="#about" className="hover:text-white transition-colors">About</a></li>
        </ul>
      </div>

      {/*  Services Column (Plumber, Electrician, Carpenter, Cleaner)  */}
      <div>
        <h4 className="text-xs uppercase font-semibold tracking-[0.25em] text-[#E5C07B] mb-5">Services</h4>
        <ul className="space-y-3 text-sm">
          <li className=""><a href="#services" className="hover:text-white transition-colors">Plumber</a></li>
          <li className=""><a href="#services" className="hover:text-white transition-colors">Electrician</a></li>
          <li className=""><a href="#services" className="hover:text-white transition-colors">Carpenter</a></li>
          <li className=""><a href="#services" className="hover:text-white transition-colors">Cleaner</a></li>
        </ul>
      </div>

      {/*  Contact Column (Email, Phone)  */}
      <div>
        <h4 className="text-xs uppercase font-semibold tracking-[0.25em] text-[#E5C07B] mb-5">Contact</h4>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-3">
            <span className="text-[#E5C07B]">✉</span>
            <a href="mailto:concierge@seora.com" className="hover:text-white transition-colors">concierge@seora.com</a>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-[#E5C07B]">☏</span>
            <a href="tel:+18005557367" className="hover:text-white transition-colors">+1 (800) 555-SEORA</a>
          </li>
          <li className="pt-2">
            <span className="text-xs text-slate-400">Available 24/7 for Emergency Residential Dispatch</span>
          </li>
        </ul>
      </div>

    </div>

    {/*  Copyright Bar  */}
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
      <p className="">© 2026 Seora. All rights reserved.</p>
      <div className="flex items-center gap-6">
        <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-slate-300 transition-colors">Service Warranty</a>
      </div>
    </div>

  </footer>

  {/*  Script for Smooth Interaction & Mobile Menu removed and implemented via React state  */}






    </>
  );
}

export default App;
