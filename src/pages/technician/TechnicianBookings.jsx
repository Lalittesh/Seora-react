import React, { useState } from 'react';

function TechnicianBookings() {
  const [bookings, setBookings] = useState([
    {
      id: 'BK-1050',
      customer: 'Sarah Jenkins',
      phone: '(555) 019-2834',
      service: 'Plumber',
      date: '2026-10-25',
      time: '09:00 AM',
      hours: 2,
      address: '456 Elite Ave, Northside',
      amount: 170,
      status: 'Pending'
    },
    {
      id: 'BK-1049',
      customer: 'David Thompson',
      phone: '(555) 912-3847',
      service: 'Plumber',
      date: '2026-10-24',
      time: '01:00 PM',
      hours: 4,
      address: '789 Luxury Blvd, West End',
      amount: 340,
      status: 'Confirmed'
    },
    {
      id: 'BK-1048',
      customer: 'Alice Brown',
      phone: '(555) 123-4567',
      service: 'Plumber',
      date: '2026-10-24',
      time: '10:00 AM',
      hours: 2,
      address: '123 Luxury Lane, Downtown Area',
      amount: 185,
      status: 'In Progress'
    },
    {
      id: 'BK-1040',
      customer: 'Marcus King',
      phone: '(555) 888-9999',
      service: 'Plumber',
      date: '2026-10-20',
      time: '03:00 PM',
      hours: 3,
      address: '12 Prestige Circle, Eastside',
      amount: 255,
      status: 'Completed'
    }
  ]);

  const [selectedBooking, setSelectedBooking] = useState(null);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-[#E5C07B]/10 text-[#E5C07B] border-[#E5C07B]/20';
      case 'Confirmed': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'In Progress': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Completed': return 'bg-[#059669]/10 text-[#059669] border-[#059669]/20';
      case 'Cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-white/10 text-slate-300 border-white/20';
    }
  };

  const updateBookingStatus = (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  return (
    <div className="space-y-12 relative font-sans max-w-7xl mx-auto pb-10">
      {/* Ambient background */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] radial-glow-sapphire rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] radial-glow-gold rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div>
        <h1 className="text-3xl font-serifHeading text-white font-bold mb-2">My Bookings</h1>
        <p className="text-slate-400">Manage incoming requests and your scheduled jobs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
        {bookings.map((booking) => (
          <div key={booking.id} className="luxury-card-border group">
            <div className="glass-card rounded-[1.4rem] p-6 transition-all group-hover:bg-white/[0.04] h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Booking #{booking.id}</div>
                  <h3 className="text-lg font-serifHeading text-white font-bold">{booking.customer}</h3>
                  <p className="text-sm text-[#E5C07B]">{booking.service}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 mb-6 text-sm flex-grow">
                <div>
                  <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Date & Time</div>
                  <div className="text-slate-300">{booking.date}</div>
                  <div className="text-slate-400 text-xs">{booking.time} ({booking.hours} hrs)</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Total</div>
                  <div className="text-white font-bold">${booking.amount}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto space-y-3 pt-4 border-t border-white/5">
                {booking.status === 'Pending' && (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-[11px] font-bold tracking-[0.1em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                      className="flex-1 py-2.5 rounded-xl border border-white/20 bg-transparent text-white text-[11px] font-bold tracking-[0.1em] uppercase hover:bg-white/5 transition-all"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {booking.status === 'Confirmed' && (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => updateBookingStatus(booking.id, 'In Progress')}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-[11px] font-bold tracking-[0.1em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right"
                    >
                      Start Job
                    </button>
                    <button 
                      onClick={() => setSelectedBooking(booking)}
                      className="flex-1 py-2.5 rounded-xl border border-white/20 bg-transparent text-white text-[11px] font-bold tracking-[0.1em] uppercase hover:bg-white/5 transition-all"
                    >
                      Details
                    </button>
                  </div>
                )}
                
                {(booking.status === 'In Progress' || booking.status === 'Completed' || booking.status === 'Cancelled') && (
                  <button 
                    onClick={() => setSelectedBooking(booking)}
                    className="w-full py-2.5 rounded-xl border border-[#E5C07B]/30 bg-[#E5C07B]/5 text-[#E5C07B] text-[11px] font-bold tracking-[0.1em] uppercase hover:bg-[#E5C07B]/10 transition-all"
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#05070E]/80 backdrop-blur-sm" onClick={() => setSelectedBooking(null)}></div>
          
          <div className="luxury-card-border w-full max-w-lg z-10 relative">
            <div className="glass-card rounded-[1.4rem] p-8 md:p-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5C07B] to-transparent opacity-50"></div>
              
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-serifHeading text-white font-bold">Booking Details</h2>
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center pb-6 border-b border-white/10">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Booking ID</p>
                    <p className="text-white font-bold tracking-wider">{selectedBooking.id}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6 pb-6 border-b border-white/10">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Customer</p>
                    <p className="text-white font-bold">{selectedBooking.customer}</p>
                    <p className="text-slate-400 text-xs mt-1">{selectedBooking.phone}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Service</p>
                    <p className="text-[#E5C07B] font-bold">{selectedBooking.service}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Date</p>
                    <p className="text-slate-200">{selectedBooking.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Time</p>
                    <p className="text-slate-200">{selectedBooking.time} ({selectedBooking.hours} hrs)</p>
                  </div>
                </div>

                <div className="pb-6 border-b border-white/10">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Service Address</p>
                  <p className="text-slate-200">{selectedBooking.address}</p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-300 font-bold uppercase tracking-wider text-sm">Est. Payout</span>
                  <span className="text-3xl font-display gold-gradient-text font-bold">${selectedBooking.amount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnicianBookings;
