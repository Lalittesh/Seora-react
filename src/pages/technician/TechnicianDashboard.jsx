import React from 'react';
import { Link } from 'react-router-dom';

function TechnicianDashboard() {
  const stats = [
    { label: 'Total Jobs', value: '142', prefix: '' },
    { label: 'Pending Bookings', value: '3', prefix: '' },
    { label: 'Active Jobs', value: '2', prefix: '' },
    { label: 'Completed Jobs', value: '137', prefix: '' },
  ];

  const todaysJobs = [
    {
      id: 'JOB-9482',
      customer: 'Alice Brown',
      service: 'Plumber',
      time: '10:00 AM - 12:00 PM',
      address: '123 Luxury Lane, Downtown Area',
      status: 'In Progress'
    },
    {
      id: 'JOB-9483',
      customer: 'Robert Smith',
      service: 'Plumber',
      time: '02:00 PM - 04:00 PM',
      address: '890 Prestige Avenue, Westside',
      status: 'Pending'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-[#E5C07B]/10 text-[#E5C07B] border-[#E5C07B]/20';
      case 'In Progress': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Completed': return 'bg-[#059669]/10 text-[#059669] border-[#059669]/20';
      default: return 'bg-white/10 text-slate-300 border-white/20';
    }
  };

  return (
    <div className="space-y-12 relative font-sans max-w-7xl mx-auto">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] radial-glow-sapphire rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] radial-glow-gold rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-serifHeading text-white font-bold mb-2">Welcome back, Technician</h1>
          <p className="text-slate-400">Here's your schedule and performance overview for today.</p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="luxury-card-border group">
            <div className="glass-card rounded-[1.4rem] p-6 transition-all group-hover:bg-white/[0.04]">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">{stat.label}</p>
              <div className="flex items-baseline">
                {stat.prefix && <span className="text-xl text-slate-400 font-bold mr-1">{stat.prefix}</span>}
                <h3 className="text-3xl font-display gold-gradient-text font-bold">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Today's Jobs */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-serifHeading text-white font-bold flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] mr-3"></span>
            Today's Schedule
          </h2>
          
          <div className="space-y-6">
            {todaysJobs.map((job) => (
              <div key={job.id} className="luxury-card-border group">
                <div className="glass-card rounded-[1.4rem] p-6 transition-all group-hover:bg-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-grow space-y-4">
                    <div className="flex justify-between items-start md:items-center">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Job #{job.id}</div>
                        <h3 className="text-lg font-serifHeading text-white font-bold">{job.service} - {job.customer}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-start gap-3">
                         <span className="text-[#E5C07B] mt-0.5">🕒</span>
                         <div>
                           <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Time</p>
                           <p className="text-slate-200">{job.time}</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-3">
                         <span className="text-[#E5C07B] mt-0.5">📍</span>
                         <div>
                           <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Location</p>
                           <p className="text-slate-200">{job.address}</p>
                         </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="shrink-0 pt-4 border-t border-white/5 md:border-t-0 md:pt-0 md:border-l md:pl-6 w-full md:w-auto">
                    <button className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-xs font-bold tracking-[0.1em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right whitespace-nowrap">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-xl font-serifHeading text-white font-bold flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5C07B] mr-3"></span>
            Quick Actions
          </h2>
          
          <div className="luxury-card-border">
            <div className="glass-card rounded-[1.4rem] p-6 space-y-4">
              <Link 
                to="/technician/bookings" 
                className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-center text-sm font-bold tracking-[0.1em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right"
              >
                View Bookings
              </Link>
              <Link 
                to="/technician/jobs" 
                className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-center text-sm font-bold tracking-[0.1em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right"
              >
                View Jobs
              </Link>
              <Link 
                to="/technician/profile" 
                className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-center text-sm font-bold tracking-[0.1em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right"
              >
                My Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnicianDashboard;
