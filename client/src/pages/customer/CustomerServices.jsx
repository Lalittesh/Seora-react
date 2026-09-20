import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../../data/services';

function CustomerServices() {
  return (
    <div className="space-y-8 relative font-sans">
      {/* Ambient background */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] radial-glow-sapphire rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] radial-glow-gold rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-serifHeading text-white font-bold mb-2">Explore Services</h1>
        <p className="text-slate-400">Select a premium service to find our elite professionals.</p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10">
        {services.map((service) => (
          <div key={service.id} className="luxury-card-border group">
            <div className="glass-card rounded-[1.4rem] overflow-hidden flex flex-col h-full transition-all group-hover:bg-white/[0.04]">
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-transparent to-transparent z-10"></div>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold bg-white/10 backdrop-blur-md text-white rounded-full border border-white/20">
                    {service.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow relative">
                {/* Decorative Icon Box */}
                <div className="absolute -top-6 left-6 w-12 h-12 rounded-xl bg-gradient-to-br from-[#1D4ED8] to-[#E5C07B] p-[1px] z-20 shadow-lg">
                  <div className="w-full h-full rounded-xl bg-[#090D18] flex items-center justify-center">
                    <span className="text-[#E5C07B] font-serifHeading font-bold text-lg">{service.title.charAt(0)}</span>
                  </div>
                </div>

                <h3 className="text-xl font-serifHeading text-white font-bold mt-6 mb-2 group-hover:text-[#E5C07B] transition-colors">{service.title}</h3>
                <p className="text-sm text-slate-400 mb-8 flex-grow">{service.description}</p>
                
                <Link 
                  to={`/customer/technicians?service=${service.title.toLowerCase()}`}
                  className="w-full py-3 rounded-xl border border-white/10 bg-white/5 text-center text-sm font-bold tracking-wider uppercase text-white hover:bg-[#E5C07B] hover:text-[#090D18] hover:border-[#E5C07B] transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(229,192,123,0.3)]"
                >
                  View Technicians
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerServices;
