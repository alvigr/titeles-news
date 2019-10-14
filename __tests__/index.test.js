const request = require('supertest');
const app = require('../index.js');

describe('GET /', () => {
  test('It should respond array', async () => {
    const response = await request(app).get('/');
    expect(response.body.length).toBeGreaterThan(0);
  });
});
 