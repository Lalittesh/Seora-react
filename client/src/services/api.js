const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:5000/api' : '');

const getToken = () => localStorage.getItem('seora_token');

const request = async (path, { method = 'GET', body, auth = false } = {}) => {
  if (!API_URL) {
    const err = new Error('API URL is not configured. Set VITE_API_URL in your environment.');
    err.status = 0;
    throw err;
  }

  const headers = { 'Content-Type': 'application/json' };

  if (auth) {
    const token = getToken();
    if (!token) {
      const err = new Error('Not authenticated');
      err.status = 401;
      throw err;
    }
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });

  let data = {};
  const text = await response.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    const err = new Error(data.message || 'Something went wrong.');
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
};

export const api = {
  get: (path, auth = false) => request(path, { method: 'GET', auth }),
  post: (path, body, auth = false) => request(path, { method: 'POST', body, auth }),
  put: (path, body, auth = false) => request(path, { method: 'PUT', body, auth })
};

export const authApi = {
  register: (payload) => api.post('/auth/register', payload),
  login: (payload) => api.post('/auth/login', payload),
  me: () => api.get('/auth/me', true)
};

export const technicianApi = {
  list: (service) => {
    const query = service ? `?service=${encodeURIComponent(service)}` : '';
    return api.get(`/technicians${query}`);
  },
  getById: (id) => api.get(`/technicians/${id}`),
  me: () => api.get('/technicians/me', true),
  updateMe: (payload) => api.put('/technicians/me', payload, true)
};

export const bookingApi = {
  create: (payload) => api.post('/bookings', payload, true),
  my: () => api.get('/bookings/my', true),
  getById: (id) => api.get(`/bookings/${id}`, true),
  cancel: (id) => api.put(`/bookings/${id}/cancel`, {}, true),
  requests: () => api.get('/bookings/requests', true),
  accept: (id) => api.put(`/bookings/${id}/accept`, {}, true),
  reject: (id) => api.put(`/bookings/${id}/reject`, {}, true),
  jobs: () => api.get('/bookings/jobs', true),
  start: (id) => api.put(`/bookings/${id}/start`, {}, true),
  complete: (id) => api.put(`/bookings/${id}/complete`, {}, true),
  history: () => api.get('/bookings/history', true)
};

export const capitalizeServiceName = (value) => {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export const formatBookingDate = (dateValue) => {
  if (!dateValue) return '';
  const d = new Date(dateValue);
  if (Number.isNaN(d.getTime())) return String(dateValue);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

export const mapTechnicianCard = (tech) => ({
  id: tech._id,
  name: tech.user?.name || 'Technician',
  phone: tech.user?.phone || '',
  location: tech.user?.location || '—',
  experience: tech.experience ?? 0,
  hourlyRate: tech.hourlyRate ?? 0,
  rating: tech.rating ?? 0,
  service: tech.service?.name || '',
  serviceId: tech.service?._id || tech.service,
  status: tech.availability ? 'Available' : 'Busy'
});

export const mapTechnicianBookingRequest = (b) => ({
  id: b._id,
  customer: b.customer?.name || 'Customer',
  phone: b.customer?.phone || '',
  service: b.service?.name || '',
  date: formatBookingDate(b.date),
  time: b.time,
  hours: b.hours,
  address: b.serviceAddress,
  amount: b.totalAmount,
  status: 'Pending'
});

export const jobStatusLabel = (status) => {
  switch (status) {
    case 'accepted':
      return 'Upcoming';
    case 'in-progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status;
  }
};

export const mapTechnicianJob = (b) => ({
  id: b._id,
  customer: b.customer?.name || 'Customer',
  phone: b.customer?.phone || '',
  service: b.service?.name || '',
  date: formatBookingDate(b.date),
  rawDate: b.date,
  time: b.time,
  hours: b.hours,
  address: b.serviceAddress,
  amount: b.totalAmount,
  status: jobStatusLabel(b.status),
  backendStatus: b.status
});
