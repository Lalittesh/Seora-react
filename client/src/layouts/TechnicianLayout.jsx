import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function TechnicianLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/technician' },
    { name: 'Bookings', path: '/technician/bookings' },
    { name: 'Jobs', path: '/technician/jobs' },
    { name: 'Profile', path: '/technician/profile' },
  ];

  return (
    <div className="min-h-screen bg-[#05070E] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#090D18] border-r border-white/5 p-6 flex flex-col">
        <div className="mb-10 flex items-center gap-3">
           <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#C99E47] via-[#FBE8B5] to-[#C99E47] p-[1px]">
            <div className="w-full h-full bg-[#090D18] rounded-[7px] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#FBE8B5]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 9.5L12 22L22 9.5L12 2Z" fill="none" stroke="currentColor" strokeWidth="2"></path>
              </svg>
            </div>
          </div>
          <span className="font-display text-xl font-bold tracking-widest text-[#E5C07B]">TECH</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                location.pathname === item.path 
                  ? 'bg-white/10 text-[#FBE8B5]' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/10 mt-auto">
          <button type="button" onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default TechnicianLayout;
