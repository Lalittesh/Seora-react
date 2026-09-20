import React from 'react';

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-20 lg:pt-36 lg:pb-28 flex items-center justify-center overflow-hidden">
      
      {/*  Generated Hero Campaign Image Background  */}
      <div className="absolute inset-0 z-0">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU7xAD1i-7A1hXTm8lp2_f73ngDw-FHm-p7Js_GDlFI_WuDLEtOO5OF8W6wXn4uKS--bDYl1xzmJbTMELHj4QV-TTPqqxMDFFV9YdrGhnssjjOhqXSLk955SrVAmRck83_dS5W77HYQOACdjZ0FNYRjKGh_U6exM5DPHAIlpHrgFcujjwxJ-0kMmmtF26nsDnxctDI7dwsgI_pG9VjJ58MDYVhWRFbeL5ndL0KNF1bvOs9W2cyjQRrgGEXZk0qu4CU16L1c-mikLYUpA8=s0" alt="Smooth golden wave curves on a luxurious dark background" className="w-full h-full object-cover object-center transform scale-105 duration-1000 ease-out" />
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
  );
}

export default Hero;
