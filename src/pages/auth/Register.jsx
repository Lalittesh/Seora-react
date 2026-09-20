import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (role === 'customer') {
      navigate('/customer');
    } else {
      navigate('/technician');
    }
  };

  return (
    <div className="min-h-screen bg-[#05070E] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Ambient Background Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] radial-glow-sapphire rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] radial-glow-gold rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      {/* Increased max width for the register form because it has more fields */}
      <div className="luxury-card-border w-full max-w-lg z-10 relative my-8">
        <div className="glass-card rounded-[1.4rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5C07B] to-transparent opacity-50"></div>

          <div className="text-center mb-10">
            <h1 className="font-display gold-gradient-text text-3xl mb-2 tracking-[0.15em]">SEORA</h1>
            <h2 className="text-2xl font-serifHeading text-white font-bold">Create Account</h2>
            <p className="text-slate-400 text-sm mt-2">Join our network of premium professionals</p>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="John Doe"
                  className="w-full bg-[#090D18]/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B]/50 transition-all placeholder:text-slate-600" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Phone</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="(555) 000-0000"
                  className="w-full bg-[#090D18]/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B]/50 transition-all placeholder:text-slate-600" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Email</label>
              <input 
                type="email" 
                required 
                placeholder="john@example.com"
                className="w-full bg-[#090D18]/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B]/50 transition-all placeholder:text-slate-600" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Password</label>
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  className="w-full bg-[#090D18]/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B]/50 transition-all placeholder:text-slate-600" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  className="w-full bg-[#090D18]/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B]/50 transition-all placeholder:text-slate-600" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Register As</label>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                    role === 'customer' 
                      ? 'border-[#E5C07B] bg-[#E5C07B]/10 text-[#E5C07B]' 
                      : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'
                  }`}
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('technician')}
                  className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                    role === 'technician' 
                      ? 'border-[#E5C07B] bg-[#E5C07B]/10 text-[#E5C07B]' 
                      : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'
                  }`}
                >
                  Technician
                </button>
              </div>
            </div>

            {role === 'technician' && (
              <div className="space-y-5 pt-6 border-t border-white/10 mt-6 transition-all duration-300 ease-in-out">
                <h3 className="text-white text-sm font-semibold tracking-wide flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5C07B] mr-2"></span>
                  Technician Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Service</label>
                    <div className="relative">
                      <select required className="w-full bg-[#090D18]/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B]/50 transition-all appearance-none">
                        <option value="" className="bg-[#090D18]">Select a service...</option>
                        <option value="plumber" className="bg-[#090D18]">Plumber</option>
                        <option value="electrician" className="bg-[#090D18]">Electrician</option>
                        <option value="carpenter" className="bg-[#090D18]">Carpenter</option>
                        <option value="cleaner" className="bg-[#090D18]">Cleaner</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Location</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="City or ZIP code"
                      className="w-full bg-[#090D18]/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B]/50 transition-all placeholder:text-slate-600" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Experience (Years)</label>
                    <input 
                      type="number" 
                      min="0" 
                      required 
                      placeholder="e.g. 5"
                      className="w-full bg-[#090D18]/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B]/50 transition-all placeholder:text-slate-600" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Hourly Rate ($)</label>
                    <input 
                      type="number" 
                      min="0" 
                      required 
                      placeholder="e.g. 50"
                      className="w-full bg-[#090D18]/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B]/50 transition-all placeholder:text-slate-600" 
                    />
                  </div>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full py-4 mt-8 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-sm font-bold tracking-[0.15em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right"
            >
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account? <Link to="/login" className="text-[#E5C07B] font-medium hover:text-[#FBE8B5] transition-colors ml-1">Login here</Link>
          </p>
          
          <div className="mt-6 text-center">
            <Link to="/" className="inline-flex items-center text-xs text-slate-500 hover:text-white transition-colors">
              <span className="mr-2">←</span> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
