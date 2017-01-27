const redisClient = require('redis').createClient(process.env.REDIS_URL);
const parseString = require('xml2js').parseString;

module.exports = {
  //Show all keys with their status in an array of objects
  index: (req, res) => {
    redisClient.keys('*', function (err, keys) {
      if (err) {
        return res.error(err);
      } else {
        let promises = [];
        keys.forEach(key => {
          console.log(key);
          promises.push(new Promise(resolve => {
            redisClient.hget(key, 'status', (err, status) => {
              resolve(err || { key, status });
            });
          }));
        });
        Promise.all(promises).then(results => {
          res.send(results);
        });
      }
    });
  },
  show: (req, res) => {
    guid = req.params.guid;
    redisClient.hget(guid, 'result', function (err, result) {
      if (err) {return res.error(err);
      } else {
        parseString(result, (err, data) => {
          res.send({guid, data: data.testsuites.testsuite});
        })
      }
    });
  }
}
