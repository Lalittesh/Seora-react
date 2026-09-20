import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { capitalizeServiceName, mapTechnicianCard, technicianApi } from '../../services/api';

function CustomerTechnicians() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedService = queryParams.get('service');

  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const serviceName = selectedService ? capitalizeServiceName(selectedService) : undefined;
        const data = await technicianApi.list(serviceName);
        setTechnicians(Array.isArray(data) ? data.map(mapTechnicianCard) : []);
      } catch {
        setError('Unable to load data.');
        setTechnicians([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [selectedService]);

  const displayTitle = selectedService 
    ? `Available ${selectedService.charAt(0).toUpperCase() + selectedService.slice(1)}s` 
    : 'Our Master Technicians';

  if (loading) {
    return <p className="text-slate-400">Loading...</p>;
  }

  if (error) {
    return <p className="text-slate-400">{error}</p>;
  }

  return (
    <div className="space-y-8 relative font-sans">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] radial-glow-gold rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] radial-glow-sapphire rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div>
        <h1 className="text-3xl font-serifHeading text-white font-bold mb-2">{displayTitle}</h1>
        <p className="text-slate-400">Select an expert professional for your request.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
        {technicians.map((tech) => (
          <div key={tech.id} className="luxury-card-border group">
            <div className="glass-card rounded-[1.4rem] p-6 flex flex-col h-full transition-all group-hover:bg-white/[0.04]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#090D18] p-[2px] shadow-lg">
                    <div className="w-full h-full rounded-full bg-[#090D18] flex items-center justify-center border-2 border-transparent relative overflow-hidden">
                       <span className="text-xl font-serifHeading text-[#E5C07B] font-bold">{tech.name.charAt(0)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-serifHeading text-white font-bold">{tech.name}</h3>
                    <p className="text-sm text-[#E5C07B]">{tech.service}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-[#E5C07B]/10 px-2 py-1 rounded-lg border border-[#E5C07B]/20">
                  <span className="text-[#E5C07B] text-xs">★</span>
                  <span className="text-white text-xs font-bold">{tech.rating}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 mt-2 flex-grow">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Location</p>
                  <p className="text-sm text-slate-300">{tech.location}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Experience</p>
                  <p className="text-sm text-slate-300">{tech.experience} Years</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Rate</p>
                  <p className="text-sm text-white font-semibold">${tech.hourlyRate}<span className="text-slate-500 font-normal">/hr</span></p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Status</p>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${tech.status === 'Available' ? 'bg-[#059669]' : 'bg-red-500'}`}></span>
                    <span className="text-sm text-slate-300">{tech.status}</span>
                  </div>
                </div>
              </div>
              
              <Link 
                to={`/customer/booking?technician=${tech.id}&service=${tech.service.toLowerCase()}`}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-center text-sm font-bold tracking-wider uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}

        {technicians.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400">
            No technicians available.
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerTechnicians;
