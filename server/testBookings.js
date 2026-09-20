const http = require('http');

const request = (options, data = null) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk.toString()));
      res.on('end', () => {
        let parsed = {};
        try {
          parsed = JSON.parse(body || '{}');
        } catch {
          parsed = { raw: body };
        }
        resolve({ statusCode: res.statusCode, body: parsed });
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
};

const runTests = async () => {
  const baseUrl = {
    hostname: 'localhost',
    port: 5000,
    headers: { 'Content-Type': 'application/json' }
  };

  const unique = Date.now();
  const custEmail = `bookcust${unique}@example.com`;
  const techEmail = `booktech${unique}@example.com`;
  const otherEmail = `bookother${unique}@example.com`;

  let pass = 0;
  let fail = 0;
  const check = (name, ok) => {
    console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
    if (ok) pass++;
    else fail++;
  };

  await request({ ...baseUrl, path: '/api/auth/register', method: 'POST' }, {
    name: 'Book Cust', email: custEmail, phone: '1', password: 'pass123', role: 'customer'
  });
  await request({ ...baseUrl, path: '/api/auth/register', method: 'POST' }, {
    name: 'Book Tech', email: techEmail, phone: '2', password: 'pass123', role: 'technician'
  });
  await request({ ...baseUrl, path: '/api/auth/register', method: 'POST' }, {
    name: 'Other Cust', email: otherEmail, phone: '3', password: 'pass123', role: 'customer'
  });

  const custLogin = await request({ ...baseUrl, path: '/api/auth/login', method: 'POST' }, {
    email: custEmail, password: 'pass123'
  });
  const techLogin = await request({ ...baseUrl, path: '/api/auth/login', method: 'POST' }, {
    email: techEmail, password: 'pass123'
  });
  const otherLogin = await request({ ...baseUrl, path: '/api/auth/login', method: 'POST' }, {
    email: otherEmail, password: 'pass123'
  });

  const custToken = custLogin.body.token;
  const techToken = techLogin.body.token;
  const otherToken = otherLogin.body.token;

  check('Auth tokens issued', Boolean(custToken && techToken && otherToken));

  const techList = await request({ ...baseUrl, path: '/api/technicians', method: 'GET' });
  const technician = (techList.body || []).find(
    (t) => t.user && t.user.email === techEmail
  ) || techList.body[0];

  check('Technician available for booking', Boolean(technician && technician._id));
  if (!technician) {
    console.log(`\nDone: ${pass} passed, ${fail} failed`);
    process.exit(1);
  }

  const serviceId = technician.service._id || technician.service;
  const hourlyRate = technician.hourlyRate;
  const hours = 2;

  const createRes = await request(
    {
      ...baseUrl,
      path: '/api/bookings',
      method: 'POST',
      headers: { ...baseUrl.headers, Authorization: `Bearer ${custToken}` }
    },
    {
      technician: technician._id,
      service: serviceId,
      date: '2026-10-01',
      time: '10:00',
      hours,
      serviceAddress: '123 Test Street',
      totalAmount: 99999
    }
  );

  check('Customer creates booking', createRes.statusCode === 201);
  check(
    'Total amount calculated server-side',
    createRes.body.totalAmount === hourlyRate * hours
  );
  check(
    'Password not in booking response',
    !createRes.body.customer?.password &&
      !createRes.body.technician?.user?.password
  );

  const bookingId = createRes.body._id;

  const techCreate = await request(
    {
      ...baseUrl,
      path: '/api/bookings',
      method: 'POST',
      headers: { ...baseUrl.headers, Authorization: `Bearer ${techToken}` }
    },
    {
      technician: technician._id,
      service: serviceId,
      date: '2026-10-02',
      time: '11:00',
      hours: 1,
      serviceAddress: '456 St'
    }
  );
  check('Technician cannot create booking', techCreate.statusCode === 403);

  const myBookings = await request({
    ...baseUrl,
    path: '/api/bookings/my',
    method: 'GET',
    headers: { ...baseUrl.headers, Authorization: `Bearer ${custToken}` }
  });
  check(
    'Customer views own bookings',
    myBookings.statusCode === 200 && Array.isArray(myBookings.body) && myBookings.body.length >= 1
  );

  const requests = await request({
    ...baseUrl,
    path: '/api/bookings/requests',
    method: 'GET',
    headers: { ...baseUrl.headers, Authorization: `Bearer ${techToken}` }
  });
  check(
    'Technician sees pending requests',
    requests.statusCode === 200 &&
      Array.isArray(requests.body) &&
      requests.body.some((b) => b._id === bookingId)
  );

  const acceptRes = await request({
    ...baseUrl,
    path: `/api/bookings/${bookingId}/accept`,
    method: 'PUT',
    headers: { ...baseUrl.headers, Authorization: `Bearer ${techToken}` }
  });
  check('Technician accepts booking', acceptRes.statusCode === 200 && acceptRes.body.status === 'accepted');

  const badAccept = await request({
    ...baseUrl,
    path: `/api/bookings/${bookingId}/accept`,
    method: 'PUT',
    headers: { ...baseUrl.headers, Authorization: `Bearer ${techToken}` }
  });
  check('Invalid transition rejected (accept again)', badAccept.statusCode === 400);

  const startRes = await request({
    ...baseUrl,
    path: `/api/bookings/${bookingId}/start`,
    method: 'PUT',
    headers: { ...baseUrl.headers, Authorization: `Bearer ${techToken}` }
  });
  check('Technician starts job', startRes.statusCode === 200 && startRes.body.status === 'in-progress');

  const completeRes = await request({
    ...baseUrl,
    path: `/api/bookings/${bookingId}/complete`,
    method: 'PUT',
    headers: { ...baseUrl.headers, Authorization: `Bearer ${techToken}` }
  });
  check('Technician completes job', completeRes.statusCode === 200 && completeRes.body.status === 'completed');

  const jobs = await request({
    ...baseUrl,
    path: '/api/bookings/jobs',
    method: 'GET',
    headers: { ...baseUrl.headers, Authorization: `Bearer ${techToken}` }
  });
  check('Technician jobs list', jobs.statusCode === 200 && Array.isArray(jobs.body));

  const history = await request({
    ...baseUrl,
    path: '/api/bookings/history',
    method: 'GET',
    headers: { ...baseUrl.headers, Authorization: `Bearer ${custToken}` }
  });
  check(
    'History includes completed booking',
    history.statusCode === 200 &&
      history.body.some((b) => b._id === bookingId && b.status === 'completed')
  );

  const otherView = await request({
    ...baseUrl,
    path: `/api/bookings/${bookingId}`,
    method: 'GET',
    headers: { ...baseUrl.headers, Authorization: `Bearer ${otherToken}` }
  });
  check('Unauthorized user cannot view booking', otherView.statusCode === 403);

  const noJwt = await request({
    ...baseUrl,
    path: '/api/bookings/my',
    method: 'GET'
  });
  check('Protected route requires JWT', noJwt.statusCode === 401);

  const cancelBookingFlow = await request(
    {
      ...baseUrl,
      path: '/api/bookings',
      method: 'POST',
      headers: { ...baseUrl.headers, Authorization: `Bearer ${custToken}` }
    },
    {
      technician: technician._id,
      service: serviceId,
      date: '2026-11-01',
      time: '09:00',
      hours: 1,
      serviceAddress: '789 Cancel Ave'
    }
  );
  const cancelId = cancelBookingFlow.body._id;

  const cancelOk = await request({
    ...baseUrl,
    path: `/api/bookings/${cancelId}/cancel`,
    method: 'PUT',
    headers: { ...baseUrl.headers, Authorization: `Bearer ${custToken}` }
  });
  check('Customer can cancel pending booking', cancelOk.statusCode === 200 && cancelOk.body.status === 'cancelled');

  const rejectBookingFlow = await request(
    {
      ...baseUrl,
      path: '/api/bookings',
      method: 'POST',
      headers: { ...baseUrl.headers, Authorization: `Bearer ${custToken}` }
    },
    {
      technician: technician._id,
      service: serviceId,
      date: '2026-11-02',
      time: '14:00',
      hours: 1,
      serviceAddress: 'Reject Rd'
    }
  );
  const rejectId = rejectBookingFlow.body._id;

  const rejectRes = await request({
    ...baseUrl,
    path: `/api/bookings/${rejectId}/reject`,
    method: 'PUT',
    headers: { ...baseUrl.headers, Authorization: `Bearer ${techToken}` }
  });
  check('Technician rejects booking', rejectRes.statusCode === 200 && rejectRes.body.status === 'rejected');

  const cancelRejected = await request({
    ...baseUrl,
    path: `/api/bookings/${rejectId}/cancel`,
    method: 'PUT',
    headers: { ...baseUrl.headers, Authorization: `Bearer ${custToken}` }
  });
  check('Cannot cancel rejected booking', cancelRejected.statusCode === 400);

  const techApis = await request({ ...baseUrl, path: '/api/technicians', method: 'GET' });
  check('Technician APIs still work', techApis.statusCode === 200 && Array.isArray(techApis.body));

  console.log(`\nDone: ${pass} passed, ${fail} failed`);
  process.exit(fail > 0 ? 1 : 0);
};

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
