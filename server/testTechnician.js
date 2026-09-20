const http = require('http');

const request = (options, data = null) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk.toString());
      res.on('end', () => resolve({ statusCode: res.statusCode, body: JSON.parse(body || '{}') }));
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
  
  // Create a customer
  const custReg = await request({ ...baseUrl, path: '/api/auth/register', method: 'POST' }, {
    name: 'CustTechTest', email: 'custtech@example.com', phone: '111', password: 'pass', role: 'customer'
  });
  const custLogin = await request({ ...baseUrl, path: '/api/auth/login', method: 'POST' }, {
    email: 'custtech@example.com', password: 'pass'
  });
  const custToken = custLogin.body.token;

  // Create a technician
  const techReg = await request({ ...baseUrl, path: '/api/auth/register', method: 'POST' }, {
    name: 'TechTechTest', email: 'techtech@example.com', phone: '222', password: 'pass', role: 'technician'
  });
  const techLogin = await request({ ...baseUrl, path: '/api/auth/login', method: 'POST' }, {
    email: 'techtech@example.com', password: 'pass'
  });
  const techToken = techLogin.body.token;

  console.log('1. GET /api/technicians returns technicians');
  let res = await request({ ...baseUrl, path: '/api/technicians', method: 'GET' });
  let found = Array.isArray(res.body) && res.body.length > 0;
  console.log('Status:', res.statusCode, found ? 'Success' : 'Failed');
  const techId = found ? res.body[0]._id : null;
  const passwordExposed = found ? res.body[0].user.password !== undefined : false;

  console.log('10. Password is never returned');
  console.log(passwordExposed ? 'Failed' : 'Success');

  console.log('2. Service filtering works');
  res = await request({ ...baseUrl, path: '/api/technicians?service=Plumber', method: 'GET' });
  console.log('Status:', res.statusCode, Array.isArray(res.body) ? 'Success' : 'Failed');

  if (techId) {
    console.log('3. GET /api/technicians/:id returns one technician');
    res = await request({ ...baseUrl, path: `/api/technicians/${techId}`, method: 'GET' });
    console.log('Status:', res.statusCode, res.body._id === techId ? 'Success' : 'Failed');
  }

  console.log('4. Technician can access /api/technicians/me');
  res = await request({
    ...baseUrl, path: '/api/technicians/me', method: 'GET',
    headers: { ...baseUrl.headers, 'Authorization': `Bearer ${techToken}` }
  });
  console.log('Status:', res.statusCode, res.body.user ? 'Success' : 'Failed');

  console.log('5. Customer cannot access technician-only profile endpoints');
  res = await request({
    ...baseUrl, path: '/api/technicians/me', method: 'GET',
    headers: { ...baseUrl.headers, 'Authorization': `Bearer ${custToken}` }
  });
  console.log('Status:', res.statusCode, res.statusCode === 403 ? 'Success' : 'Failed');

  console.log('6. Technician can update allowed profile fields (and 8. Invalid service, 9. Negative checks)');
  // 6, 7, 8, 9
  // Try valid update
  res = await request({
    ...baseUrl, path: '/api/technicians/me', method: 'PUT',
    headers: { ...baseUrl.headers, 'Authorization': `Bearer ${techToken}` }
  }, { name: 'UpdatedName', experience: 5 });
  console.log('Valid update status:', res.statusCode, res.body.experience === 5 && res.body.user.name === 'UpdatedName' ? 'Success' : 'Failed');

  // Negative experience
  res = await request({
    ...baseUrl, path: '/api/technicians/me', method: 'PUT',
    headers: { ...baseUrl.headers, 'Authorization': `Bearer ${techToken}` }
  }, { experience: -1 });
  console.log('Negative experience status:', res.statusCode, res.statusCode === 400 ? 'Rejected as expected' : 'Failed');

  // Invalid service
  res = await request({
    ...baseUrl, path: '/api/technicians/me', method: 'PUT',
    headers: { ...baseUrl.headers, 'Authorization': `Bearer ${techToken}` }
  }, { service: 'NonExistentService' });
  console.log('Invalid service status:', res.statusCode, res.statusCode === 400 ? 'Rejected as expected' : 'Failed');

  // Try modifying rating (should be ignored since we didn't add it in controller body unpacking)
  res = await request({
    ...baseUrl, path: '/api/technicians/me', method: 'PUT',
    headers: { ...baseUrl.headers, 'Authorization': `Bearer ${techToken}` }
  }, { rating: 5, totalRatings: 100 });
  
  res = await request({
    ...baseUrl, path: '/api/technicians/me', method: 'GET',
    headers: { ...baseUrl.headers, 'Authorization': `Bearer ${techToken}` }
  });
  console.log('7. Technician cannot modify rating or totalRatings');
  console.log(res.body.rating !== 5 && res.body.totalRatings !== 100 ? 'Success' : 'Failed');

  console.log('Finished testing.');
};

runTests();
