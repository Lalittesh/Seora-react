import React from 'react';
import { Link } from 'react-router-dom';

function CustomerDashboard() {
  const stats = [
    { label: 'Total Bookings', value: '12' },
    { label: 'Active Bookings', value: '2' },
    { label: 'Completed', value: '10' }
  ];

  const quickServices = [
    { name: 'Plumber', icon: '💧' },
    { name: 'Electrician', icon: '⚡' },
    { name: 'Carpenter', icon: '🔨' },
    { name: 'Cleaner', icon: '✨' }
  ];

  const recentBookings = [
    { id: 'BK-1029', service: 'Plumber', technician: 'Michael R.', date: 'Oct 24, 2026', status: 'Upcoming' },
    { id: 'BK-1028', service: 'Cleaner', technician: 'Sarah W.', date: 'Oct 15, 2026', status: 'Completed' },
    { id: 'BK-1027', service: 'Electrician', technician: 'David K.', date: 'Sep 28, 2026', status: 'Completed' },
  ];

  return (
    <div className="space-y-8 relative font-sans">
      {/* Optional ambient effect for the dashboard area */}
      <div className="absolute top-[-5%] right-[-5%] w-[300px] h-[300px] radial-glow-sapphire rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      {/* Welcome Section */}
      <div className="luxury-card-border">
        <div className="glass-card rounded-[1.4rem] p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#E5C07B] to-transparent opacity-70"></div>
          <div>
            <h1 className="text-3xl font-serifHeading text-white font-bold mb-2">Welcome back, Customer</h1>
            <p className="text-slate-400 text-sm">Experience premium home services at your fingertips.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link to="/customer/services" className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-sm font-bold tracking-wider uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right text-center">
              Book a Service
            </Link>
            <Link to="/customer/orders" className="px-6 py-3 rounded-xl border border-[#E5C07B]/30 bg-[#E5C07B]/5 text-[#E5C07B] text-sm font-bold tracking-wider uppercase hover:bg-[#E5C07B]/10 transition-all text-center">
              View Orders
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="luxury-card-border">
            <div className="glass-card rounded-[1.4rem] p-6 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <p className="text-4xl font-display gold-gradient-text font-bold mb-2">{stat.value}</p>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Services */}
      <div>
        <h2 className="text-xl font-serifHeading text-white font-bold mb-6 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5C07B] mr-3"></span>
          Quick Services
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickServices.map((service, idx) => (
            <Link key={idx} to="/customer/services" className="block luxury-card-border group">
              <div className="glass-card rounded-[1.4rem] p-6 flex flex-col items-center justify-center transition-all group-hover:bg-white/[0.04]">
                <div className="text-3xl mb-3 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-slate-300 text-sm font-semibold tracking-wide">{service.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div>
        <h2 className="text-xl font-serifHeading text-white font-bold mb-6 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] mr-3"></span>
          Recent Bookings
        </h2>
        <div className="luxury-card-border">
          <div className="glass-card rounded-[1.4rem] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Technician</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentBookings.map((booking, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center whitespace-nowrap">
                          <div className="w-8 h-8 rounded-full bg-[#E5C07B]/10 flex items-center justify-center mr-3 border border-[#E5C07B]/20">
                            <span className="text-[#E5C07B] text-xs">★</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-200">{booking.service}</p>
                            <p className="text-xs text-slate-500">{booking.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300 whitespace-nowrap">{booking.technician}</td>
                      <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap">{booking.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                          booking.status === 'Upcoming' 
                            ? 'bg-[#E5C07B]/10 text-[#E5C07B] border-[#E5C07B]/20' 
                            : 'bg-[#059669]/10 text-[#059669] border-[#059669]/20'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {recentBookings.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-sm">
                No recent bookings found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
