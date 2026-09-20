import React, { useState } from 'react';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
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
        <a href="#hero" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-base font-medium text-slate-200 hover:text-[#FBE8B5] border-b border-white/5">Home</a>
        <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-base font-medium text-slate-200 hover:text-[#FBE8B5] border-b border-white/5">Services</a>
        <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-base font-medium text-slate-200 hover:text-[#FBE8B5] border-b border-white/5">About</a>
        <div className="pt-4 flex flex-col gap-3">
          <a href="#login" className="text-center py-2.5 rounded-xl border border-white/10 text-sm font-medium text-slate-200">Login</a>
          <a href="#cta" className="text-center py-3 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-sm font-bold tracking-wider shadow-lg">Get Started</a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
