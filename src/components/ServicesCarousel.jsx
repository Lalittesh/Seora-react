import React from 'react';
import ServiceCard from './ServiceCard';
import { services } from '../data/services';

function ServicesCarousel() {
  return (
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
          {services.map((service) => (
            <ServiceCard 
              key={`set1-${service.id}`}
              title={service.title}
              image={service.image}
              tag={service.tag}
              description={service.description}
            />
          ))}

          {/*  ===================== SET 2 (DUPLICATE TO ENSURE SEAMLESS INFINITE LOOP) =====================  */}
          {services.map((service) => (
            <ServiceCard 
              key={`set2-${service.id}`}
              title={service.title}
              image={service.image}
              tag={service.tag}
              description={service.description}
              ariaHidden={true}
            />
          ))}

        </div>
      </div>

    </section>
  );
}

export default ServicesCarousel;
