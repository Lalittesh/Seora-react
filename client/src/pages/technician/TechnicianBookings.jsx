import React, { useCallback, useEffect, useState } from 'react';
import { bookingApi, formatBookingDate } from '../../services/api';

const mapRequest = (b, statusOverride) => ({
  id: b._id,
  customer: b.customer?.name || 'Customer',
  phone: b.customer?.phone || '',
  service: b.service?.name || '',
  date: formatBookingDate(b.date),
  time: b.time,
  hours: b.hours,
  address: b.serviceAddress,
  amount: b.totalAmount,
  status: statusOverride || b.status || 'pending'
});

function TechnicianBookings() {
  const [requests, setRequests] = useState([]);
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('Pending');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionError, setActionError] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [pending, history, jobs] = await Promise.all([
        bookingApi.requests(),
        bookingApi.history(),
        bookingApi.jobs()
      ]);
      setRequests(Array.isArray(pending) ? pending.map(mapRequest) : []);
      const rejected = (Array.isArray(history) ? history : [])
        .filter((b) => b.status === 'rejected')
        .map((b) => mapRequest(b, 'rejected'));
      const accepted = (Array.isArray(jobs) ? jobs : [])
        .filter((b) => b.status === 'accepted')
        .map((b) => mapRequest(b, 'accepted'));
      setHistoryItems([...accepted, ...rejected]);
    } catch {
      setError('Unable to load data.');
      setRequests([]);
      setHistoryItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredRequests = activeTab === 'Pending'
    ? requests
    : historyItems.filter((req) =>
        activeTab === 'Accepted' ? req.status === 'accepted' : req.status === 'rejected'
      );

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-[#E5C07B]/10 text-[#E5C07B] border-[#E5C07B]/20';
      case 'accepted': return 'bg-[#059669]/10 text-[#059669] border-[#059669]/20';
      case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-white/10 text-slate-300 border-white/20';
    }
  };

  const updateStatus = async (id, action) => {
    setActionError('');
    try {
      if (action === 'accepted') await bookingApi.accept(id);
      else await bookingApi.reject(id);
      setSelectedRequest(null);
      await loadData();
    } catch (err) {
      setActionError(err.message || 'Something went wrong.');
    }
  };

  if (loading) {
    return <p className="text-slate-400">Loading...</p>;
  }

  if (error) {
    return <p className="text-slate-400">{error}</p>;
  }

  return (
    <div className="space-y-8 relative font-sans max-w-7xl mx-auto pb-10">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] radial-glow-sapphire rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] radial-glow-gold rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div>
        <h1 className="text-3xl font-serifHeading text-white font-bold mb-2">Booking Requests</h1>
        <p className="text-slate-400">Review and accept incoming customer service requests.</p>
      </div>

      <div className="flex flex-wrap gap-3 relative z-10 border-b border-white/10 pb-4">
        {['Pending', 'Accepted', 'Rejected'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
              activeTab === tab 
                ? 'bg-[#E5C07B] text-[#090D18]' 
                : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {tab === 'Pending' ? 'New Requests' : tab}
            {tab === 'Pending' && (
              <span className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px]">{requests.length}</span>
            )}
          </button>
        ))}
      </div>

      {actionError && <p className="text-sm text-red-400">{actionError}</p>}

      <div className="space-y-4 relative z-10">
        {filteredRequests.length > 0 ? filteredRequests.map((req) => (
          <div key={req.id} className="luxury-card-border group">
            <div className="glass-card rounded-[1.4rem] p-6 transition-all group-hover:bg-white/[0.04] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <div className="text-[10px] uppercase tracking-widest text-[#E5C07B] mb-1 font-bold">{req.service}</div>
                  <h3 className="text-lg font-serifHeading text-white font-bold">{req.customer}</h3>
                  <p className="text-xs text-slate-400 mt-1">{req.phone}</p>
                </div>

                <div className="md:col-span-1 border-l border-white/5 pl-6">
                  <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Requested For</div>
                  <div className="text-slate-200 text-sm">{req.date}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{req.time} ({req.hours} hrs)</div>
                </div>

                <div className="md:col-span-1 border-l border-white/5 pl-6">
                  <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Location</div>
                  <div className="text-slate-200 text-sm truncate pr-4">{req.address}</div>
                </div>

                <div className="md:col-span-1 border-l border-white/5 pl-6">
                  <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Est. Value</div>
                  <div className="text-xl font-display text-white font-bold">${req.amount}</div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col gap-3 min-w-[200px] border-t border-white/5 pt-4 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-6">
                {req.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => updateStatus(req.id, 'accepted')}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-xs font-bold tracking-[0.1em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right"
                    >
                      Accept Booking
                    </button>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedRequest(req)}
                        className="flex-1 py-2.5 rounded-xl border border-white/20 bg-transparent text-white text-[10px] font-bold tracking-[0.1em] uppercase hover:bg-white/5 transition-all"
                      >
                        View Request
                      </button>
                      <button 
                        onClick={() => updateStatus(req.id, 'rejected')}
                        className="flex-1 py-2.5 rounded-xl border border-white/20 bg-transparent text-white text-[10px] font-bold tracking-[0.1em] uppercase hover:bg-white/5 transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  </>
                )}

                {req.status === 'accepted' && (
                  <div className="text-center bg-[#059669]/10 border border-[#059669]/20 rounded-xl py-4">
                    <span className="text-[#059669] text-xs font-bold uppercase tracking-wider">Moved to Jobs</span>
                  </div>
                )}

                {req.status === 'rejected' && (
                  <div className="text-center bg-red-500/10 border border-red-500/20 rounded-xl py-4">
                    <span className="text-red-500 text-xs font-bold uppercase tracking-wider">Request Rejected</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )) : (
          <div className="luxury-card-border">
            <div className="glass-card rounded-[1.4rem] p-16 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl opacity-50">📥</span>
              </div>
              <h3 className="text-xl font-serifHeading text-white font-bold mb-2">No {activeTab.toLowerCase()} requests</h3>
              <p className="text-slate-400">You're all caught up with your inbox.</p>
            </div>
          </div>
        )}
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#05070E]/80 backdrop-blur-sm" onClick={() => setSelectedRequest(null)}></div>
          
          <div className="luxury-card-border w-full max-w-lg z-10 relative">
            <div className="glass-card rounded-[1.4rem] p-8 md:p-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5C07B] to-transparent opacity-50"></div>
              
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-serifHeading text-white font-bold">Request Details</h2>
                <button 
                  onClick={() => setSelectedRequest(null)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center pb-6 border-b border-white/10">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Request ID</p>
                    <p className="text-white font-bold tracking-wider">{selectedRequest.id}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(selectedRequest.status)}`}>
                    {selectedRequest.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6 pb-6 border-b border-white/10">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Customer</p>
                    <p className="text-white font-bold">{selectedRequest.customer}</p>
                    <p className="text-slate-400 text-xs mt-1">{selectedRequest.phone}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Service</p>
                    <p className="text-[#E5C07B] font-bold">{selectedRequest.service}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Requested Date</p>
                    <p className="text-slate-200">{selectedRequest.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Requested Time</p>
                    <p className="text-slate-200">{selectedRequest.time} ({selectedRequest.hours} hrs)</p>
                  </div>
                </div>

                <div className="pb-6 border-b border-white/10">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Service Address</p>
                  <p className="text-slate-200">{selectedRequest.address}</p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-300 font-bold uppercase tracking-wider text-sm">Est. Value</span>
                  <span className="text-3xl font-display gold-gradient-text font-bold">${selectedRequest.amount}</span>
                </div>

                {selectedRequest.status === 'pending' && (
                  <div className="grid grid-cols-2 gap-4 pt-6">
                    <button 
                      onClick={() => updateStatus(selectedRequest.id, 'accepted')}
                      className="py-3 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-xs font-bold tracking-[0.1em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => updateStatus(selectedRequest.id, 'rejected')}
                      className="py-3 rounded-xl border border-white/20 bg-transparent text-white text-xs font-bold tracking-[0.1em] uppercase hover:bg-white/5 transition-all"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnicianBookings;
