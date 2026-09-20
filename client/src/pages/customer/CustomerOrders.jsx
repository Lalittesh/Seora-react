import React, { useCallback, useEffect, useState } from 'react';
import { bookingApi, formatBookingDate } from '../../services/api';

const mapBooking = (b) => ({
  id: b._id,
  technician: b.technician?.user?.name || 'Technician',
  service: b.service?.name || '',
  date: formatBookingDate(b.date),
  time: b.time,
  hours: b.hours,
  address: b.serviceAddress,
  amount: b.totalAmount,
  status: b.status
});

function CustomerOrders() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [actionError, setActionError] = useState('');
  const [cancelling, setCancelling] = useState(false);

  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await bookingApi.my();
      setBookings(Array.isArray(data) ? data.map(mapBooking) : []);
    } catch {
      setError('Unable to load data.');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const activeStatuses = ['pending', 'accepted', 'in-progress'];
  const activeBookings = bookings.filter((b) => activeStatuses.includes(b.status));
  const historicalBookings = bookings.filter((b) => !activeStatuses.includes(b.status));

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-[#E5C07B]/10 text-[#E5C07B] border-[#E5C07B]/20';
      case 'accepted': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'in-progress': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'completed': return 'bg-[#059669]/10 text-[#059669] border-[#059669]/20';
      case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-white/10 text-slate-300 border-white/20';
    }
  };

  const handleCancel = async () => {
    if (!selectedOrder) return;
    setActionError('');
    setCancelling(true);
    try {
      await bookingApi.cancel(selectedOrder.id);
      setSelectedOrder(null);
      await loadBookings();
    } catch (err) {
      setActionError(err.message || 'Something went wrong.');
    } finally {
      setCancelling(false);
    }
  };

  const BookingCard = ({ booking }) => (
    <div className="luxury-card-border group">
      <div className="glass-card rounded-[1.4rem] p-6 transition-all group-hover:bg-white/[0.04] h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Order #{String(booking.id).slice(-6)}</div>
            <h3 className="text-lg font-serifHeading text-white font-bold">{booking.service}</h3>
            <p className="text-sm text-[#E5C07B]">{booking.technician}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
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

        <button 
          onClick={() => { setActionError(''); setSelectedOrder(booking); }}
          className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 text-center text-xs font-bold tracking-wider uppercase text-white hover:bg-white/10 transition-all mt-auto"
        >
          View Details
        </button>
      </div>
    </div>
  );

  if (loading) {
    return <p className="text-slate-400">Loading...</p>;
  }

  if (error) {
    return <p className="text-slate-400">{error}</p>;
  }

  return (
    <div className="space-y-12 relative font-sans max-w-7xl mx-auto">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] radial-glow-sapphire rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] radial-glow-gold rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div>
        <h1 className="text-3xl font-serifHeading text-white font-bold mb-2">My Orders</h1>
        <p className="text-slate-400">Track and manage your premium service bookings.</p>
      </div>

      <section className="relative z-10">
        <h2 className="text-xl font-serifHeading text-white font-bold mb-6 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5C07B] mr-3"></span>
          Active Bookings
        </h2>
        
        {activeBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)}
          </div>
        ) : (
          <div className="luxury-card-border">
            <div className="glass-card rounded-[1.4rem] p-12 text-center">
              <p className="text-slate-400">No bookings found.</p>
            </div>
          </div>
        )}
      </section>

      <section className="relative z-10">
        <h2 className="text-xl font-serifHeading text-white font-bold mb-6 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mr-3"></span>
          Booking History
        </h2>

        {historicalBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {historicalBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)}
          </div>
        ) : (
          <div className="luxury-card-border">
            <div className="glass-card rounded-[1.4rem] p-12 text-center">
              <p className="text-slate-400">Your past booking history will appear here.</p>
            </div>
          </div>
        )}
      </section>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#05070E]/80 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
          
          <div className="luxury-card-border w-full max-w-lg z-10 relative">
            <div className="glass-card rounded-[1.4rem] p-8 md:p-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5C07B] to-transparent opacity-50"></div>
              
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-serifHeading text-white font-bold">Booking Details</h2>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </div>

              {actionError && <p className="mb-4 text-sm text-red-400">{actionError}</p>}

              <div className="space-y-6">
                <div className="flex justify-between items-center pb-6 border-b border-white/10">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Order Number</p>
                    <p className="text-white font-bold tracking-wider">{selectedOrder.id}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6 pb-6 border-b border-white/10">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Service</p>
                    <p className="text-white font-bold">{selectedOrder.service}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Technician</p>
                    <p className="text-[#E5C07B] font-bold">{selectedOrder.technician}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Date</p>
                    <p className="text-slate-200">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Time</p>
                    <p className="text-slate-200">{selectedOrder.time} ({selectedOrder.hours} hrs)</p>
                  </div>
                </div>

                <div className="pb-6 border-b border-white/10">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Service Address</p>
                  <p className="text-slate-200">{selectedOrder.address}</p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-300 font-bold uppercase tracking-wider text-sm">Total Amount</span>
                  <span className="text-3xl font-display gold-gradient-text font-bold">${selectedOrder.amount}</span>
                </div>

                {(selectedOrder.status === 'pending' || selectedOrder.status === 'accepted') && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={cancelling}
                    className="w-full py-3 rounded-xl border border-red-500/30 bg-red-500/5 text-red-400 text-sm font-bold tracking-wider uppercase hover:bg-red-500/10 transition-all disabled:opacity-60"
                  >
                    {cancelling ? 'Cancelling...' : 'Cancel Booking'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerOrders;
