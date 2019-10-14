const cache = require('../cache.js');
const getTitles = require('../get-titles.js/index.js');

const origNow = Date.now;

afterEach(() => {
  Date.now = origNow;
});

describe('Cheack geting headers to cache', () => {
  test('Cache return array', async () => {
    const getDataCached = cache(getTitles, 1000);
    const result = await getDataCached();
    expect(result.length).toBeGreaterThan(0);
  });
});

describe('Request handling', () => {
  test('One request to new data in one time', async () => {
    const reqMock = jest.fn();
    reqMock.mockReturnValue(Promise.resolve(1));
    const reqCached = cache(reqMock, 1000);
    await Promise.all([reqCached(),  reqCached()]);
    expect(reqMock).toBeCalledTimes(1);
  });

  test('New request when cached data is old', async () => {
    Date.now = () => 150;
    const reqMock = jest.fn();
    reqMock.mockReturnValue(Promise.resolve(1));
    const reqCached = cache(reqMock, 50);
    await reqCached();
    Date.now = () => 250;
    await reqCached();
    expect(reqMock).toBeCalledTimes(2);
  });
});
