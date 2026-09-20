const http = require('http');

const API = 'http://localhost:5000/api';

const request = (path, { method = 'GET', body, token } = {}) =>
  new Promise((resolve, reject) => {
    const url = new URL(API + path);
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const req = http.request(
      { hostname: url.hostname, port: url.port, path: url.pathname + url.search, method, headers },
      (res) => {
        let text = '';
        res.on('data', (c) => (text += c));
        res.on('end', () => {
          let data = {};
          try {
            data = JSON.parse(text || '{}');
          } catch {
            data = { message: text };
          }
          resolve({ status: res.statusCode, data });
        });
      }
    );
    req.on('error', reject);
    if (body !== undefined) req.write(JSON.stringify(body));
    req.end();
  });

const run = async () => {
  const id = Date.now();
  const custEmail = `p4cust${id}@test.com`;
  const techEmail = `p4tech${id}@test.com`;
  let ok = 0;
  let fail = 0;
  const assert = (name, cond) => {
    console.log(`${cond ? 'PASS' : 'FAIL'}: ${name}`);
    cond ? ok++ : fail++;
  };

  await request('/auth/register', {
    method: 'POST',
    body: { name: 'P4 Customer', email: custEmail, phone: '111', password: 'pass123', role: 'customer' }
  });
  await request('/auth/register', {
    method: 'POST',
    body: { name: 'P4 Tech', email: techEmail, phone: '222', password: 'pass123', role: 'technician' }
  });

  const custLogin = await request('/auth/login', {
    method: 'POST',
    body: { email: custEmail, password: 'pass123' }
  });
  const techLogin = await request('/auth/login', {
    method: 'POST',
    body: { email: techEmail, password: 'pass123' }
  });

  assert('Customer login', custLogin.status === 200 && custLogin.data.token);
  assert('Technician login', techLogin.status === 200 && techLogin.data.token);

  const custToken = custLogin.data.token;
  const techToken = techLogin.data.token;

  const me = await request('/auth/me', { token: custToken });
  assert('/auth/me customer', me.status === 200 && me.data.role === 'customer');

  await request('/technicians/me', {
    method: 'PUT',
    token: techToken,
    body: {
      name: 'P4 Tech',
      phone: '222',
      location: 'Test City',
      service: 'Plumber',
      experience: 5,
      hourlyRate: 60,
      availability: true
    }
  });

  const techList = await request('/technicians?service=Plumber');
  const tech = (techList.data || []).find((t) => t.user?.email === techEmail);
  assert('Technician listed by service', Boolean(tech));

  const create = await request('/bookings', {
    method: 'POST',
    token: custToken,
    body: {
      technician: tech._id,
      service: tech.service._id || tech.service,
      date: '2026-12-01',
      time: '10:00',
      hours: 2,
      serviceAddress: '123 Test St'
    }
  });

  assert('Booking created pending', create.status === 201 && create.data.status === 'pending');
  const expectedTotal = tech.hourlyRate * 2;
  assert('Server totalAmount', create.data.totalAmount === expectedTotal);

  const orders = await request('/bookings/my', { token: custToken });
  assert('Customer orders include booking', (orders.data || []).some((b) => b._id === create.data._id));

  const requests = await request('/bookings/requests', { token: techToken });
  assert('Technician sees request', (requests.data || []).some((b) => b._id === create.data._id));

  const accepted = await request(`/bookings/${create.data._id}/accept`, { method: 'PUT', token: techToken });
  assert('Accept booking', accepted.status === 200 && accepted.data.status === 'accepted');

  const jobs = await request('/bookings/jobs', { token: techToken });
  assert('Job listed after accept', (jobs.data || []).some((b) => b._id === create.data._id));

  const started = await request(`/bookings/${create.data._id}/start`, { method: 'PUT', token: techToken });
  assert('Start job', started.status === 200 && started.data.status === 'in-progress');

  const completed = await request(`/bookings/${create.data._id}/complete`, { method: 'PUT', token: techToken });
  assert('Complete job', completed.status === 200 && completed.data.status === 'completed');

  const ordersAfter = await request('/bookings/my', { token: custToken });
  const final = (ordersAfter.data || []).find((b) => b._id === create.data._id);
  assert('Customer sees completed status', final?.status === 'completed');

  const noJwt = await request('/bookings/my');
  assert('Protected route without JWT', noJwt.status === 401);

  const badJwt = await request('/bookings/my', { token: 'not-a-jwt' });
  assert('Invalid JWT rejected', badJwt.status === 401);

  console.log(`\nPhase 4 flow: ${ok} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
