const getHeaders = require('../get-headers.js');

describe('Cheack geting headers', () => {
  test('getHeaders return array', async () => {
    const result = await getHeaders();
    expect(result.length).toBeTruthy()
  })
});