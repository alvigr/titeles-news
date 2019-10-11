const cache = (request, time) => {
  let resultPromis
  let reqestSent = false;
  let completedAt = 0;

  return () => {
    let now = (new Date()).getTime();

    if (now - completedAt > time && !reqestSent) {
      return resultPromis = new Promise ((resolve, reject) => {
        reqestSent = true;
        resolve(request())
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

module.exports = cache;
