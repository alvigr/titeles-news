const express = require('express');
const getHeaders = require('./get-headers.js');
const cache = require('./cache.js');
const app = express();

const PORT = process.env.PORT || 3000; // eslint-disable-line

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server listening on port ${PORT}`);
});

const getHeadersCached = cache(getHeaders, 10000);

app.get('/', async (req, res) => { 
  res.send(await getHeadersCached());
})
 
module.exports = app;
