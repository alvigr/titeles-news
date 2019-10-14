const Parser = require('rss-parser');
const parser = new Parser();

const getTitles = async () => {
  let feed = await parser.parseURL('https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en');
  const titles = [];
  console.log('Parse titles')
  feed.items.forEach(item => {
    titles.push(item.title);
  });

  return titles;
};

module.exports = getTitles;