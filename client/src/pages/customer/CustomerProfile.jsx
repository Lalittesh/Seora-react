import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../services/api';

function CustomerProfile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const me = await authApi.me();
        setProfile({
          name: me.name,
          email: me.email,
          phone: me.phone,
          role: me.role === 'customer' ? 'Customer' : me.role
        });
      } catch {
        setError('Unable to load data.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <p className="text-slate-400">Loading...</p>;
  }

  if (error || !profile) {
    return <p className="text-slate-400">{error || 'Something went wrong.'}</p>;
  }

  return (
    <div className="space-y-8 relative font-sans max-w-6xl mx-auto">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] radial-glow-sapphire rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] radial-glow-gold rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div>
        <h1 className="text-3xl font-serifHeading text-white font-bold mb-2">My Profile</h1>
        <p className="text-slate-400">Manage your personal information and account settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div className="space-y-8">
          <div className="luxury-card-border group">
            <div className="glass-card rounded-[1.4rem] p-8 relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5C07B] to-transparent opacity-50"></div>
              
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E5C07B] to-[#1D4ED8] p-[2px] shadow-lg mb-6 group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-[#090D18] flex items-center justify-center">
                   <span className="text-3xl font-serifHeading text-[#E5C07B] font-bold">{profile.name.charAt(0)}</span>
                </div>
              </div>

              <h2 className="text-xl font-serifHeading text-white font-bold">{profile.name}</h2>
              <p className="text-[#E5C07B] text-xs uppercase tracking-widest font-bold mt-1 mb-4">{profile.role}</p>
              
              <div className="w-full space-y-3 mt-2 border-t border-white/10 pt-6 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Email</span>
                  <span className="text-slate-200">{profile.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Phone</span>
                  <span className="text-slate-200">{profile.phone}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="luxury-card-border">
            <div className="glass-card rounded-[1.4rem] p-8">
              <h3 className="text-lg font-serifHeading text-white font-bold mb-6 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mr-3"></span>
                Account Settings
              </h3>
              
              <div className="space-y-4">
                <button className="w-full py-3 rounded-xl border border-[#E5C07B]/30 bg-[#E5C07B]/5 text-center text-sm font-bold tracking-wider uppercase text-[#E5C07B] hover:bg-[#E5C07B]/10 transition-all">
                  Change Password
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl border border-red-500/30 bg-red-500/5 text-center text-sm font-bold tracking-wider uppercase text-red-500 hover:bg-red-500/10 transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 luxury-card-border h-fit">
          <div className="glass-card rounded-[1.4rem] p-8 relative overflow-hidden">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
              <h2 className="text-xl font-serifHeading text-white font-bold flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] mr-3"></span>
                Personal Information
              </h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Full Name</p>
                  <p className="text-white text-lg font-medium">{profile.name}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Email Address</p>
                  <p className="text-white text-lg font-medium">{profile.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Phone Number</p>
                  <p className="text-white text-lg font-medium">{profile.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
