import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [role, setRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const data = await login(email, password);
      if (data.role !== role) {
        logout();
        setError(`This account is registered as a ${data.role}. Please select the correct role.`);
        setSubmitting(false);
        return;
      }
      navigate(data.role === 'customer' ? '/customer' : '/technician');
    } catch (err) {
      setError(err.status === 401 ? 'Invalid email or password.' : err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070E] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Ambient Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] radial-glow-sapphire rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] radial-glow-gold rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div className="luxury-card-border w-full max-w-md z-10 relative">
        <div className="glass-card rounded-[1.4rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5C07B] to-transparent opacity-50"></div>

          <div className="text-center mb-10">
            <h1 className="font-display gold-gradient-text text-3xl mb-2 tracking-[0.15em]">SEORA</h1>
            <h2 className="text-2xl font-serifHeading text-white font-bold">Welcome Back</h2>
            <p className="text-slate-400 text-sm mt-2">Sign in to continue to your dashboard</p>
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-400 text-center">{error}</p>
          )}
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Email</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-[#090D18]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B]/50 transition-all placeholder:text-slate-600" 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Password</label>
                <span className="text-xs text-slate-500 cursor-not-allowed" title="Not available in this version">Forgot password?</span>
              </div>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#090D18]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B]/50 transition-all placeholder:text-slate-600" 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Login As</label>
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

            <button 
              type="submit"
              disabled={submitting}
              className="w-full py-4 mt-6 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-sm font-bold tracking-[0.15em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right disabled:opacity-60"
            >
              {submitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Don't have an account? <Link to="/register" className="text-[#E5C07B] font-medium hover:text-[#FBE8B5] transition-colors ml-1">Register here</Link>
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

export default Login;
