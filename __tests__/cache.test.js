const cache = require('../cache.js');
const getHeaders = require('../get-headers.js');

describe('Cheack geting headers to cache', () => {
  test('Cache return array', async () => {
    const getDataCached = cache(getHeaders, 1000)
    const result = await getDataCached();
    expect(result.length).toBeTruthy()
  })
});