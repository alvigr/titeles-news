const cache = (request, time) => {
  let resultPromis;
  let reqestSent = false;
  let completedAt = 0;

  return () => {
    let now = Date.now();
    if (now - completedAt > time && !reqestSent) {
      return resultPromis = new Promise ((resolve, reject) => {
        reqestSent = true;
        resolve(request());
      }).then((data) => {
        completedAt = Date.now();
        reqestSent = false;
        return data;
      })
    } else {
      return resultPromis;
    }
  };
};

module.exports = cache;
