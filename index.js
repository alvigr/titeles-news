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
  try {
    res.status(200).send(await getHeadersCached());
  } catch (error) {
    res.status(500).send({  message: error.message });
  }
});
 
module.exports = app;
