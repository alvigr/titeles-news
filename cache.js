const cache = (request, time) => {
  let resultPromise;
  let reqestSent = false;
  let completedAt = 0;

  return () => {
    let now = Date.now();
    if (now - completedAt > time && !reqestSent) {
      return resultPromise = new Promise ((resolve) => {
        reqestSent = true;
        resolve(request());
      }).finally((data) => {
        completedAt = Date.now();
        reqestSent = false;
        return data;
      })
    } else {
      return resultPromise;
    }
  };
};

module.exports = cache;
