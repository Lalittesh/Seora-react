import React, { useCallback, useEffect, useState } from 'react';
import { bookingApi, mapTechnicianJob } from '../../services/api';

function TechnicianJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [acting, setActing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await bookingApi.jobs();
      setJobs(Array.isArray(data) ? data.map(mapTechnicianJob) : []);
    } catch {
      setError('Unable to load data.');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === 'All') return true;
    return job.status === activeTab;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-[#E5C07B]/10 text-[#E5C07B] border-[#E5C07B]/20';
      case 'In Progress':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Completed':
        return 'bg-[#059669]/10 text-[#059669] border-[#059669]/20';
      case 'Cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-white/10 text-slate-300 border-white/20';
    }
  };

  const updateJobStatus = async (job, action) => {
    setActionError('');
    setActing(true);
    try {
      if (action === 'start') {
        await bookingApi.start(job.id);
      } else {
        await bookingApi.complete(job.id);
      }
      setSelectedJob(null);
      await load();
    } catch (err) {
      setActionError(err.message || 'Something went wrong.');
    } finally {
      setActing(false);
    }
  };

  if (loading) {
    return <p className="text-slate-400">Loading...</p>;
  }

  if (error) {
    return <p className="text-slate-400">{error}</p>;
  }

  return (
    <div className="space-y-10 relative font-sans max-w-7xl mx-auto pb-10">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] radial-glow-sapphire rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] radial-glow-gold rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div>
        <h1 className="text-3xl font-serifHeading text-white font-bold mb-2">My Jobs</h1>
        <p className="text-slate-400">View and manage your assigned jobs.</p>
      </div>

      {actionError && <p className="text-sm text-red-400 relative z-10">{actionError}</p>}

      <div className="flex flex-wrap gap-3 relative z-10">
        {['All', 'Upcoming', 'In Progress', 'Completed'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
              activeTab === tab
                ? 'bg-[#E5C07B] text-[#090D18]'
                : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="luxury-card-border group">
              <div className="glass-card rounded-[1.4rem] p-6 transition-all group-hover:bg-white/[0.04] h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Job #{String(job.id).slice(-6)}</div>
                    <h3 className="text-lg font-serifHeading text-white font-bold">{job.customer}</h3>
                    <p className="text-sm text-[#E5C07B]">{job.service}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(job.status)}`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 mb-6 text-sm flex-grow">
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Date & Time</div>
                    <div className="text-slate-300">{job.date}</div>
                    <div className="text-slate-400 text-xs">
                      {job.time} ({job.hours} hrs)
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Total</div>
                    <div className="text-white font-bold">${job.amount}</div>
                  </div>
                </div>

                <div className="mt-auto space-y-3 pt-4 border-t border-white/5">
                  <div className="flex gap-3">
                    {job.status === 'Upcoming' && (
                      <button
                        type="button"
                        disabled={acting}
                        onClick={() => updateJobStatus(job, 'start')}
                        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-[11px] font-bold tracking-[0.1em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right disabled:opacity-60"
                      >
                        Start Job
                      </button>
                    )}
                    {job.status === 'In Progress' && (
                      <button
                        type="button"
                        disabled={acting}
                        onClick={() => updateJobStatus(job, 'complete')}
                        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-[11px] font-bold tracking-[0.1em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right disabled:opacity-60"
                      >
                        Complete Job
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedJob(job)}
                      className={`${job.status === 'Completed' || job.status === 'Cancelled' ? 'w-full bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] hover:bg-right diamond-glow bg-[length:200%_auto] border-none' : 'flex-1 border border-[#E5C07B]/30 bg-[#E5C07B]/5 text-[#E5C07B] hover:bg-[#E5C07B]/10'} py-2.5 rounded-xl text-[11px] font-bold tracking-[0.1em] uppercase transition-all`}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full luxury-card-border">
            <div className="glass-card rounded-[1.4rem] p-12 text-center">
              <p className="text-slate-400">No jobs found for this category.</p>
            </div>
          </div>
        )}
      </div>

      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#05070E]/80 backdrop-blur-sm" onClick={() => setSelectedJob(null)}></div>

          <div className="luxury-card-border w-full max-w-lg z-10 relative">
            <div className="glass-card rounded-[1.4rem] p-8 md:p-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5C07B] to-transparent opacity-50"></div>

              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-serifHeading text-white font-bold">Job Details</h2>
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center pb-6 border-b border-white/10">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Job ID</p>
                    <p className="text-white font-bold tracking-wider">{selectedJob.id}</p>
                  </div>
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(selectedJob.status)}`}
                  >
                    {selectedJob.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6 pb-6 border-b border-white/10">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Customer</p>
                    <p className="text-white font-bold">{selectedJob.customer}</p>
                    <p className="text-slate-400 text-xs mt-1">{selectedJob.phone}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Service</p>
                    <p className="text-[#E5C07B] font-bold">{selectedJob.service}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Date</p>
                    <p className="text-slate-200">{selectedJob.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Time</p>
                    <p className="text-slate-200">
                      {selectedJob.time} ({selectedJob.hours} hrs)
                    </p>
                  </div>
                </div>

                <div className="pb-6 border-b border-white/10">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Service Address</p>
                  <p className="text-slate-200">{selectedJob.address}</p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-300 font-bold uppercase tracking-wider text-sm">Est. Payout</span>
                  <span className="text-3xl font-display gold-gradient-text font-bold">${selectedJob.amount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnicianJobs;
