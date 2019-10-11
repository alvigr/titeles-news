const request = require('supertest')
const app = require('../index.js')
const cache = require('../cache.js');

describe('GET /', () => {
  test('It should respond array', async () => {
    const response = await request(app).get('/');
    expect(response.body.length).toBeTruthy();
  })
});

describe('Request handling', () => {
  test('One request to new data in one time', async () => {
    const reqMock = jest.fn()
    reqMock.mockReturnValue(Promise.resolve(1))
    const reqCached = cache(reqMock, 1000)
    await Promise.all([reqCached(),  reqCached()])
    expect(reqMock).toBeCalledTimes(1)
  })
})
