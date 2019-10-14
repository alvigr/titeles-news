const getTitles = require('../get-titles.js');

describe('Cheack geting titles', () => {
  test('getTitles return array', async () => {
    const result = await getTitles();
    expect(result.length).toBeGreaterThan(0);
  });
});
