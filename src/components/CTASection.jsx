import React from 'react';

function CTASection() {
  return (
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
  );
}

export default CTASection;
