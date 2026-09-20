import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'customer') {
      navigate('/customer');
    } else {
      navigate('/technician');
    }
  };

  return (
    <div className="min-h-screen bg-[#05070E] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/[0.02] border border-white/5 rounded-2xl p-8">
        <h2 className="text-3xl font-serifHeading text-white font-bold mb-6 text-center">Welcome Back</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <input type="email" required className="w-full bg-[#090D18] border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#E5C07B]" />
          </div>
          
          <div>
            <label className="block text-sm text-slate-400 mb-1">Password</label>
            <input type="password" required className="w-full bg-[#090D18] border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#E5C07B]" />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Login As</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#090D18] border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#E5C07B]"
            >
              <option value="customer">Customer</option>
              <option value="technician">Technician</option>
            </select>
          </div>

          <button type="submit" className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-sm font-bold tracking-wider">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account? <Link to="/register" className="text-[#E5C07B] hover:underline">Register here</Link>
        </p>
        
        <div className="mt-4 text-center">
          <Link to="/" className="text-xs text-slate-500 hover:text-white">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
