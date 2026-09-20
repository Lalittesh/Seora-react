import React, { useState } from 'react';

function TechnicianJobs() {
  const [jobs, setJobs] = useState([
    {
      id: 'JOB-2041',
      customer: 'Robert Smith',
      phone: '(555) 912-3847',
      service: 'Plumber',
      date: '2026-10-24',
      time: '02:00 PM',
      hours: 4,
      address: '890 Prestige Avenue, Westside',
      amount: 340,
      status: 'Upcoming'
    },
    {
      id: 'JOB-2039',
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
      id: 'JOB-2035',
      customer: 'Marcus King',
      phone: '(555) 888-9999',
      service: 'Electrician',
      date: '2026-10-20',
      time: '03:00 PM',
      hours: 3,
      address: '12 Prestige Circle, Eastside',
      amount: 255,
      status: 'Completed'
    },
    {
      id: 'JOB-2030',
      customer: 'Emily Clark',
      phone: '(555) 345-6789',
      service: 'Cleaner',
      date: '2026-10-18',
      time: '09:00 AM',
      hours: 5,
      address: '55 Royal Court, South District',
      amount: 400,
      status: 'Cancelled'
    }
  ]);

  const [activeTab, setActiveTab] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = jobs.filter(job => {
    if (activeTab === 'All') return true;
    return job.status === activeTab;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Upcoming': return 'bg-[#E5C07B]/10 text-[#E5C07B] border-[#E5C07B]/20';
      case 'In Progress': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Completed': return 'bg-[#059669]/10 text-[#059669] border-[#059669]/20';
      case 'Cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-white/10 text-slate-300 border-white/20';
    }
  };

  const updateJobStatus = (id, newStatus) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: newStatus } : j));
  };

  return (
    <div className="space-y-10 relative font-sans max-w-7xl mx-auto pb-10">
      {/* Ambient background */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] radial-glow-sapphire rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] radial-glow-gold rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div>
        <h1 className="text-3xl font-serifHeading text-white font-bold mb-2">My Jobs</h1>
        <p className="text-slate-400">View and manage your assigned jobs.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 relative z-10">
        {['All', 'Upcoming', 'In Progress', 'Completed'].map(tab => (
          <button 
            key={tab}
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

      {/* Job Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
        {filteredJobs.length > 0 ? filteredJobs.map((job) => (
          <div key={job.id} className="luxury-card-border group">
            <div className="glass-card rounded-[1.4rem] p-6 transition-all group-hover:bg-white/[0.04] h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Job #{job.id}</div>
                  <h3 className="text-lg font-serifHeading text-white font-bold">{job.customer}</h3>
                  <p className="text-sm text-[#E5C07B]">{job.service}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(job.status)}`}>
                  {job.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 mb-6 text-sm flex-grow">
                <div>
                  <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Date & Time</div>
                  <div className="text-slate-300">{job.date}</div>
                  <div className="text-slate-400 text-xs">{job.time} ({job.hours} hrs)</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Total</div>
                  <div className="text-white font-bold">${job.amount}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto space-y-3 pt-4 border-t border-white/5">
                <div className="flex gap-3">
                  {job.status === 'Upcoming' && (
                    <button 
                      onClick={() => updateJobStatus(job.id, 'In Progress')}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-[11px] font-bold tracking-[0.1em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right"
                    >
                      Start Job
                    </button>
                  )}
                  {job.status === 'In Progress' && (
                    <button 
                      onClick={() => updateJobStatus(job.id, 'Completed')}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-[11px] font-bold tracking-[0.1em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right"
                    >
                      Complete Job
                    </button>
                  )}
                  
                  <button 
                    onClick={() => setSelectedJob(job)}
                    className={`${(job.status === 'Completed' || job.status === 'Cancelled') ? 'w-full bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] hover:bg-right diamond-glow bg-[length:200%_auto] border-none' : 'flex-1 border border-[#E5C07B]/30 bg-[#E5C07B]/5 text-[#E5C07B] hover:bg-[#E5C07B]/10'} py-2.5 rounded-xl text-[11px] font-bold tracking-[0.1em] uppercase transition-all`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full luxury-card-border">
            <div className="glass-card rounded-[1.4rem] p-12 text-center">
              <p className="text-slate-400">No jobs found for this category.</p>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#05070E]/80 backdrop-blur-sm" onClick={() => setSelectedJob(null)}></div>
          
          <div className="luxury-card-border w-full max-w-lg z-10 relative">
            <div className="glass-card rounded-[1.4rem] p-8 md:p-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5C07B] to-transparent opacity-50"></div>
              
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-serifHeading text-white font-bold">Job Details</h2>
                <button 
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
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(selectedJob.status)}`}>
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
                    <p className="text-slate-200">{selectedJob.time} ({selectedJob.hours} hrs)</p>
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
