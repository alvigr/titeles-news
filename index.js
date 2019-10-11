const express = require('express');
const getHeaders = require('./get-headers.js');
const app = express();

const PORT = process.env.PORT || 3000; // eslint-disable-line

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server listening on port ${PORT}`);
});

const cache = (req, time) => {
  let resultPromis
  let reqestSent = false;
  let completedAt = 0;

  return () => {
    let now = (new Date()).getTime();

    if (now - completedAt > time && !reqestSent) {
      return resultPromis = new Promise ((resolve, reject) => {
        reqestSent = true;
        resolve(req())
      }).then((data) => {
        let time = new Date();
        completedAt = time.getTime();
        reqestSent = false;
        return data;
      })
    } else {
      return resultPromis
    }
  }
};

const getHeadersCached = cache(getHeaders, 10000)

app.get('/', async (req, res) => { 
  res.send(await getHeadersCached())
})
 
module.exports = app;
