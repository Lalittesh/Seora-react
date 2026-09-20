import React, { useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { technicians } from '../../data/technicians';

function CustomerBooking() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const techId = queryParams.get('technician');

  const technician = useMemo(() => {
    return technicians.find(t => t.id.toString() === techId) || null;
  }, [techId]);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [hours, setHours] = useState(1);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const estimatedTotal = technician ? technician.hourlyRate * hours : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (!technician) {
    return (
      <div className="space-y-8 relative font-sans text-center py-20">
        <h1 className="text-3xl font-serifHeading text-white font-bold mb-4">No Technician Selected</h1>
        <p className="text-slate-400 mb-8">Please select a technician to proceed with booking.</p>
        <Link to="/customer/technicians" className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] font-bold uppercase text-sm tracking-wider hover:scale-[1.02] transition-all diamond-glow">
          Browse Technicians
        </Link>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="space-y-8 relative font-sans text-center py-20">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#059669]/10 border border-[#059669]/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(5,150,105,0.2)]">
          <svg className="w-10 h-10 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h1 className="text-3xl font-serifHeading text-white font-bold mb-4">Booking Confirmed!</h1>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto">Your premium service with {technician.name} has been successfully booked for {date} at {time}. You will receive a confirmation email shortly.</p>
        <Link to="/customer" className="px-6 py-3 rounded-xl border border-[#E5C07B]/30 bg-[#E5C07B]/5 text-[#E5C07B] font-bold uppercase text-sm tracking-wider hover:bg-[#E5C07B]/10 transition-all inline-block">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative font-sans max-w-5xl mx-auto">
      {/* Ambient background */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] radial-glow-sapphire rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] radial-glow-gold rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div>
        <h1 className="text-3xl font-serifHeading text-white font-bold mb-2">Complete Your Booking</h1>
        <p className="text-slate-400">Finalize your premium service appointment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Booking Form */}
        <div className="lg:col-span-2 luxury-card-border">
          <div className="glass-card rounded-[1.4rem] p-8 relative overflow-hidden">
            <h2 className="text-xl font-serifHeading text-white font-bold mb-6 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5C07B] mr-3"></span>
              Appointment Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Service Type</label>
                  <input type="text" value={technician.service} disabled className="w-full bg-[#090D18]/50 border border-white/5 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Technician</label>
                  <input type="text" value={technician.name} disabled className="w-full bg-[#090D18]/50 border border-white/5 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Booking Date</label>
                  <input 
                    type="date" 
                    required 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#090D18]/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B]/50 transition-all [color-scheme:dark]" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Start Time</label>
                  <input 
                    type="time" 
                    required 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#090D18]/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B]/50 transition-all [color-scheme:dark]" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Number of Hours</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="12"
                    required 
                    value={hours}
                    onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-[#090D18]/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B]/50 transition-all placeholder:text-slate-600" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Service Address</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="123 Luxury Lane"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#090D18]/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B]/50 transition-all placeholder:text-slate-600" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Additional Notes</label>
                <textarea 
                  rows="3"
                  placeholder="Any specific requests..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#090D18]/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B]/50 transition-all placeholder:text-slate-600 resize-none" 
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-sm font-bold tracking-[0.15em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <div className="luxury-card-border sticky top-24">
            <div className="glass-card rounded-[1.4rem] p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1D4ED8] to-transparent opacity-50"></div>
              
              <h2 className="text-lg font-serifHeading text-white font-bold mb-6 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] mr-3"></span>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 border-b border-white/10 pb-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#090D18] p-[1.5px] shadow-lg shrink-0">
                    <div className="w-full h-full rounded-full bg-[#090D18] flex items-center justify-center">
                       <span className="text-lg font-serifHeading text-[#E5C07B] font-bold">{technician.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{technician.name}</h3>
                    <p className="text-xs text-[#E5C07B]">{technician.service}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-slate-400">Rating</div>
                  <div className="text-white text-right flex items-center justify-end gap-1">
                    <span className="text-[#E5C07B] text-xs">★</span> {technician.rating}
                  </div>
                  <div className="text-slate-400">Location</div>
                  <div className="text-white text-right">{technician.location}</div>
                  <div className="text-slate-400">Hourly Rate</div>
                  <div className="text-white text-right">${technician.hourlyRate}/hr</div>
                </div>
              </div>

              <div className="space-y-2 mb-6 border-b border-white/10 pb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal ({hours} {hours === 1 ? 'hr' : 'hrs'})</span>
                  <span className="text-white">${estimatedTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Service Fee</span>
                  <span className="text-white">$15</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300 font-bold uppercase tracking-wider text-xs">Estimated Total</span>
                <span className="text-2xl font-display gold-gradient-text font-bold">${estimatedTotal + 15}</span>
              </div>
              <p className="text-[10px] text-slate-500 text-center mt-4">Final price may vary based on actual hours worked.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CustomerBooking;
