import React from 'react';

function Footer() {
  return (
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
  );
}

export default Footer;
