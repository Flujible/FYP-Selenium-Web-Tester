let guid = require("guid");
let redisClient = require('redis').createClient(process.env.REDIS_URL);

let show = (req, res) => {
  //Assigns URL parameters to variables
  //URL parameters get stored in an object
  let urlQueries = req.query;
  let name = urlQueries.name;
  // let token = urlQueries.token;
  // let geo = urlQueries.geo;

  //Returns the variables to be displayed on the page
  // res.send(user_id + ' ' + token + ' ' + geo);
  if(name) {
    res.render('test.njk', {name: name});
  } else {
    res.render('test.njk');
  }
};

let retrieve = (req, res) => {
  res.render('test.njk', {name: req.params.name});
}

let createTest = (req, res) => {
  let newGuid = guid.create()
  while (!guid.isGuid(newGuid)) {
    newGuid = guid.create();
  }

  let key = newGuid.value.toString();

  let data = {
    url: req.body.url,
    idOrClass: req.body.idOrClass.join(','),
    elementID: req.body.elementID.join(','),
    action: req.body.act.join(','),
    value: req.body.textEnt.join(','),
    done: false
  };

  redisClient.hmset(key, data, (err, result) => {
    console.log('ERR: ', err);
    console.log('RES: ', result);

    res.render('formAccept.njk', { err });

    // DEBUG
    redisClient.hgetall(key, (_, object) => console.log(object));
  });

  // let test = {
  //   guid: newGuid.value,
  //   url: req.body.url,
  //   idType: req.body.idOrClass,
  //   id: req.body.elementID,
  //   action: req.body.act,
  //   value: req.body.textEnt,
  //   done: false
  // }
  // redisClient.hmset(newGuid.value.toString(),
  //                   "url", req.body.url.toString(),
  //                   "idOrClass", req.body.idOrClass.toString(),
  //                   "elementID", req.body.elementID.toString(),
  //                   "action", req.body.act.toString(),
  //                   "value", req.body.textEnt.toString(),
  //                   "done", false
  //                   )
  // console.log(test);
  // console.log("----------------------------------------------");
  // redisClient.hgetall(newGuid.value.toString(), function(err, object) {
  //   console.log(object);
  // });
  // res.render('formAccept.njk');
};

module.exports = {
  show: show,
  retrieve: retrieve,
  createTest: createTest
};
