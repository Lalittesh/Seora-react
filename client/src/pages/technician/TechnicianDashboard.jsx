import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { bookingApi, jobStatusLabel, mapTechnicianJob } from '../../services/api';

function TechnicianDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [requestsData, jobsData] = await Promise.all([bookingApi.requests(), bookingApi.jobs()]);
        setPendingCount(Array.isArray(requestsData) ? requestsData.length : 0);
        setJobs(Array.isArray(jobsData) ? jobsData.map(mapTechnicianJob) : []);
      } catch {
        setPendingCount(0);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const stats = useMemo(() => {
    const active = jobs.filter((j) => j.backendStatus === 'in-progress').length;
    const completed = jobs.filter((j) => j.backendStatus === 'completed').length;
    return [
      { label: 'Total Jobs', value: String(jobs.length) },
      { label: 'Pending Bookings', value: String(pendingCount) },
      { label: 'Active Jobs', value: String(active) },
      { label: 'Completed Jobs', value: String(completed) }
    ];
  }, [jobs, pendingCount]);

  const todaysJobs = useMemo(() => {
    const today = new Date();
    const todayKey = today.toDateString();
    return jobs
      .filter((j) => {
        if (!j.rawDate) return false;
        const parsed = new Date(j.rawDate);
        return !Number.isNaN(parsed.getTime()) && parsed.toDateString() === todayKey;
      })
      .slice(0, 5)
      .map((j) => ({
        id: j.id,
        customer: j.customer,
        service: j.service,
        time: `${j.time} (${j.hours} hrs)`,
        address: j.address,
        status: jobStatusLabel(j.backendStatus)
      }));
  }, [jobs]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-[#E5C07B]/10 text-[#E5C07B] border-[#E5C07B]/20';
      case 'In Progress':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Completed':
        return 'bg-[#059669]/10 text-[#059669] border-[#059669]/20';
      default:
        return 'bg-white/10 text-slate-300 border-white/20';
    }
  };

  return (
    <div className="space-y-12 relative font-sans max-w-7xl mx-auto">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] radial-glow-sapphire rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] radial-glow-gold rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-serifHeading text-white font-bold mb-2">
            Welcome back, {user?.name || 'Technician'}
          </h1>
          <p className="text-slate-400">Here's your schedule and performance overview for today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="luxury-card-border group">
            <div className="glass-card rounded-[1.4rem] p-6 transition-all group-hover:bg-white/[0.04]">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">{stat.label}</p>
              <div className="flex items-baseline">
                <h3 className="text-3xl font-display gold-gradient-text font-bold">{loading ? '—' : stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-serifHeading text-white font-bold flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] mr-3"></span>
            Today's Schedule
          </h2>

          {loading ? (
            <p className="text-slate-400">Loading...</p>
          ) : todaysJobs.length > 0 ? (
            <div className="space-y-6">
              {todaysJobs.map((job) => (
                <div key={job.id} className="luxury-card-border group">
                  <div className="glass-card rounded-[1.4rem] p-6 transition-all group-hover:bg-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-grow space-y-4">
                      <div className="flex justify-between items-start md:items-center">
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Job #{String(job.id).slice(-6)}</div>
                          <h3 className="text-lg font-serifHeading text-white font-bold">
                            {job.service} - {job.customer}
                          </h3>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(job.status)}`}
                        >
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
                      <Link
                        to="/technician/jobs"
                        className="block w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-xs font-bold tracking-[0.1em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right whitespace-nowrap text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="luxury-card-border">
              <div className="glass-card rounded-[1.4rem] p-12 text-center">
                <p className="text-slate-400">No jobs scheduled for today.</p>
              </div>
            </div>
          )}
        </div>

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
