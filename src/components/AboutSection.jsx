import React from 'react';

function AboutSection() {
  return (
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
  );
}

export default AboutSection;
