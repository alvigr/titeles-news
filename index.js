const express = require('express');
const getTitles = require('./get-titles.js/index.js');
const cache = require('./cache.js');
const app = express();

const PORT = process.env.PORT || 3000; // eslint-disable-line

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server listening on port ${PORT}`);
});

const getTitlesCached = cache(getTitles, 10000);

app.get('/', async (req, res) => { 
  try {
    res.status(200).send(await getTitlesCached());
  } catch (error) {
    res.status(500).send({  message: error.message });
  }
});
 
module.exports = app;
