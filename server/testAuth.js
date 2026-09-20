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
  
  console.log('1. Customer registration');
  const custReg = await request({ ...baseUrl, path: '/api/auth/register', method: 'POST' }, {
    name: 'Customer One', email: 'cust1@example.com', phone: '12345', password: 'password123', role: 'customer'
  });
  console.log('Status:', custReg.statusCode, custReg.body.email ? 'Success' : 'Failed');

  console.log('\n2. Technician registration');
  const techReg = await request({ ...baseUrl, path: '/api/auth/register', method: 'POST' }, {
    name: 'Tech One', email: 'tech1@example.com', phone: '54321', password: 'password123', role: 'technician'
  });
  console.log('Status:', techReg.statusCode, techReg.body.email ? 'Success' : 'Failed');

  console.log('\n3. Duplicate email registration');
  const dupReg = await request({ ...baseUrl, path: '/api/auth/register', method: 'POST' }, {
    name: 'Customer Dup', email: 'cust1@example.com', phone: '12345', password: 'password123', role: 'customer'
  });
  console.log('Status:', dupReg.statusCode, dupReg.statusCode === 400 ? 'Rejected as expected' : 'Failed');

  console.log('\n5. Customer login');
  const custLogin = await request({ ...baseUrl, path: '/api/auth/login', method: 'POST' }, {
    email: 'cust1@example.com', password: 'password123'
  });
  console.log('Status:', custLogin.statusCode, custLogin.body.token ? 'Success' : 'Failed');
  const custToken = custLogin.body.token;

  console.log('\n6. Technician login');
  const techLogin = await request({ ...baseUrl, path: '/api/auth/login', method: 'POST' }, {
    email: 'tech1@example.com', password: 'password123'
  });
  console.log('Status:', techLogin.statusCode, techLogin.body.token ? 'Success' : 'Failed');

  console.log('\n7. Wrong password login');
  const wrongLogin = await request({ ...baseUrl, path: '/api/auth/login', method: 'POST' }, {
    email: 'cust1@example.com', password: 'wrongpassword'
  });
  console.log('Status:', wrongLogin.statusCode, wrongLogin.statusCode === 401 ? 'Rejected as expected' : 'Failed');

  console.log('\n9. /api/auth/me works with valid JWT');
  const meValid = await request({
    ...baseUrl, path: '/api/auth/me', method: 'GET',
    headers: { ...baseUrl.headers, 'Authorization': `Bearer ${custToken}` }
  });
  console.log('Status:', meValid.statusCode, meValid.body.email ? 'Success' : 'Failed');

  console.log('\n10. /api/auth/me rejects requests without JWT');
  const meNoJwt = await request({ ...baseUrl, path: '/api/auth/me', method: 'GET' });
  console.log('Status:', meNoJwt.statusCode, meNoJwt.statusCode === 401 ? 'Rejected as expected' : 'Failed');

  console.log('\n11. Invalid/expired JWT is rejected');
  const meInvJwt = await request({
    ...baseUrl, path: '/api/auth/me', method: 'GET',
    headers: { ...baseUrl.headers, 'Authorization': 'Bearer invalidtoken123' }
  });
  console.log('Status:', meInvJwt.statusCode, meInvJwt.statusCode === 401 ? 'Rejected as expected' : 'Failed');

  console.log('\nFinished testing.');
};

runTests();
