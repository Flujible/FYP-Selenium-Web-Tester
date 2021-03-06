const redisClient = require('redis').createClient(process.env.REDIS_URL);
const parseString = require('xml2js').parseString;

let getResult = (guid) => {
  return new Promise(function(resolve, reject) {
    redisClient.hget(guid, 'result', function (err, result) {
      if (err) return reject(err);
      parseString(result, (err, data) => {
        if (err) console.error(err);
        return resolve(data);
      });
    });
  });
};

module.exports = {
  //Show all keys with their status in an array of objects
  index: (_, res) => {
    redisClient.keys('*', function (err, keys) {
      if (err) return res.error(err);
      let promises = [];
      keys.forEach(key => {
        console.log(key);
        promises.push(new Promise(resolve => {
          redisClient.hget(key, 'status', (err1, status) => {
            redisClient.hget(key, 'timestamp', (err2, timestamp) => {
              console.log({key, status, timestamp});
              resolve(err1 || err2 || { key, status, timestamp });
            });
          });
        }));
      });
        Promise.all(promises).then(results => {
          res.send(results);
        });
      }
    );
  },
  //Show a specific key and its data
  show: (req, res) => {
    let guid = req.params.guid;
    getResult(guid).then((result) => {
      redisClient.hget(guid, 'steps', (err1, testSteps) => {
        redisClient.hget(guid, 'url', (err2, testUrl) => {
          if (err1 || err2) return reject(err1 || err2);
          if(result) {
            res.send({guid, data: result.testsuites.testsuite, steps: testSteps, url: testUrl});
          } else {
            res.send({guid, data: "", steps: testSteps, url: testUrl});
          }
        });
      });
    });
  }
};
