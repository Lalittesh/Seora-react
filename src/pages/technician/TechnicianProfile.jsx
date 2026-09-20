import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TechnicianProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '(555) 123-4567',
    role: 'Technician',
    location: 'Downtown Area, New York',
    service: 'Plumber',
    experience: '8 Years',
    rate: '85',
    rating: '4.9',
    availability: 'Mon - Fri (9am - 5pm)'
  });

  const [formData, setFormData] = useState({ ...profile });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile({ ...formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setIsEditing(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="space-y-12 relative font-sans max-w-6xl mx-auto pb-10">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] radial-glow-sapphire rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] radial-glow-gold rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div>
        <h1 className="text-3xl font-serifHeading text-white font-bold mb-2">My Profile</h1>
        <p className="text-slate-400">Manage your professional information and account settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Left Column: Overview & Account */}
        <div className="space-y-8">
          {/* Profile Card */}
          <div className="luxury-card-border">
            <div className="glass-card rounded-[1.4rem] p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1D4ED8] via-[#60A5FA] to-[#1D4ED8] opacity-80"></div>
              
              <div className="w-24 h-24 mx-auto rounded-full bg-[#05070E] border-2 border-[#E5C07B]/30 flex items-center justify-center mb-6 relative group">
                <div className="absolute inset-0 rounded-full border border-[#E5C07B] opacity-0 scale-150 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                <span className="text-3xl relative z-10">👨‍🔧</span>
              </div>
              
              <h2 className="text-2xl font-serifHeading text-white font-bold mb-1">{profile.name}</h2>
              <p className="text-sm text-[#E5C07B] font-bold tracking-widest uppercase mb-6">{profile.role}</p>

              <div className="space-y-4 text-left border-t border-white/5 pt-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Email</p>
                  <p className="text-sm text-slate-200 truncate">{profile.email}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Phone</p>
                  <p className="text-sm text-slate-200">{profile.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Location</p>
                  <p className="text-sm text-slate-200">{profile.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="luxury-card-border">
            <div className="glass-card rounded-[1.4rem] p-8">
              <h3 className="text-sm font-bold tracking-widest uppercase text-white mb-6 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-3"></span>
                Account
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

        {/* Right Column: Professional Details Edit Form */}
        <div className="lg:col-span-2">
          <div className="luxury-card-border h-full">
            <div className="glass-card rounded-[1.4rem] p-8 md:p-10 h-full">
              
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                <h3 className="text-xl font-serifHeading text-white font-bold flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#E5C07B] mr-3"></span>
                  Professional Information
                </h3>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-xs font-bold tracking-[0.1em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Phone Number</label>
                      <input 
                        type="text" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B] transition-all"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Location</label>
                      <input 
                        type="text" 
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Service Type</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B] transition-all appearance-none [&>option]:bg-[#05070E]"
                      >
                        <option value="Plumber">Plumber</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Carpenter">Carpenter</option>
                        <option value="Cleaner">Cleaner</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Experience</label>
                      <input 
                        type="text" 
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Hourly Rate ($)</label>
                      <input 
                        type="text" 
                        name="rate"
                        value={formData.rate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Availability</label>
                      <input 
                        type="text" 
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B] transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-8 flex gap-4 border-t border-white/5">
                    <button 
                      onClick={handleSave}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-sm font-bold tracking-[0.1em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right"
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="px-8 py-3 rounded-xl border border-white/20 bg-transparent text-white text-sm font-bold tracking-[0.1em] uppercase hover:bg-white/5 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Service Type</p>
                    <p className="text-lg text-white font-bold">{profile.service}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Experience</p>
                    <p className="text-lg text-white font-bold">{profile.experience}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Hourly Rate</p>
                    <p className="text-lg text-[#E5C07B] font-display font-bold">${profile.rate} / hr</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Rating</p>
                    <p className="text-lg text-white font-bold flex items-center">
                      <span className="text-[#E5C07B] mr-2">★</span> {profile.rating}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Typical Availability</p>
                    <p className="text-lg text-white font-bold">{profile.availability}</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TechnicianProfile;
