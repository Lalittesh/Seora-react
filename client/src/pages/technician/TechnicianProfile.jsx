import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { technicianApi } from '../../services/api';

const mapProfile = (tech) => ({
  name: tech.user?.name || '',
  email: tech.user?.email || '',
  phone: tech.user?.phone || '',
  role: 'Technician',
  location: tech.user?.location || '',
  service: tech.service?.name || 'Plumber',
  experience: String(tech.experience ?? 0),
  rate: String(tech.hourlyRate ?? 0),
  rating: String(tech.rating ?? 0),
  availability: tech.availability ? 'Available' : 'Busy'
});

function TechnicianProfile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const tech = await technicianApi.me();
        const mapped = mapProfile(tech);
        setProfile(mapped);
        setFormData(mapped);
      } catch {
        setError('Unable to load data.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaveError('');
    setSaving(true);
    try {
      const updated = await technicianApi.updateMe({
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        service: formData.service,
        experience: Number(formData.experience) || 0,
        hourlyRate: Number(formData.rate) || 0,
        availability: formData.availability === 'Available'
      });
      const mapped = mapProfile(updated);
      setProfile(mapped);
      setFormData(mapped);
      setIsEditing(false);
    } catch (err) {
      setSaveError(err.message || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setIsEditing(false);
    setSaveError('');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <p className="text-slate-400">Loading...</p>;
  }

  if (error || !profile || !formData) {
    return <p className="text-slate-400">{error || 'Something went wrong.'}</p>;
  }

  return (
    <div className="space-y-12 relative font-sans max-w-6xl mx-auto pb-10">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] radial-glow-sapphire rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] radial-glow-gold rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div>
        <h1 className="text-3xl font-serifHeading text-white font-bold mb-2">My Profile</h1>
        <p className="text-slate-400">Manage your professional information and account settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div className="space-y-8">
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
                  <p className="text-sm text-slate-200">{profile.location || '—'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="luxury-card-border">
            <div className="glass-card rounded-[1.4rem] p-8">
              <h3 className="text-sm font-bold tracking-widest uppercase text-white mb-6 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-3"></span>
                Account
              </h3>

              <div className="space-y-4">
                <button
                  type="button"
                  disabled
                  title="Password change is not available yet"
                  className="w-full py-3 rounded-xl border border-white/10 bg-white/[0.02] text-center text-sm font-bold tracking-wider uppercase text-slate-500 cursor-not-allowed opacity-60"
                >
                  Change Password
                </button>
                <p className="text-[10px] text-slate-500 text-center -mt-2">Not available in this version</p>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl border border-red-500/30 bg-red-500/5 text-center text-sm font-bold tracking-wider uppercase text-red-500 hover:bg-red-500/10 transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

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
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-xs font-bold tracking-[0.1em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {saveError && <p className="mb-4 text-sm text-red-400">{saveError}</p>}

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
                      <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Experience (Years)</label>
                      <input
                        type="number"
                        min="0"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Hourly Rate ($)</label>
                      <input
                        type="number"
                        min="0"
                        name="rate"
                        value={formData.rate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Availability</label>
                      <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B] transition-all appearance-none [&>option]:bg-[#05070E]"
                      >
                        <option value="Available">Available</option>
                        <option value="Busy">Busy</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-8 flex gap-4 border-t border-white/5">
                    <button
                      type="button"
                      disabled={saving}
                      onClick={handleSave}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#C99E47] via-[#FBE8B5] to-[#C99E47] text-[#090D18] text-sm font-bold tracking-[0.1em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all diamond-glow bg-[length:200%_auto] hover:bg-right disabled:opacity-60"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
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
                    <p className="text-lg text-white font-bold">{profile.experience} Years</p>
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
