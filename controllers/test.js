let guid = require("guid");
let redisClient = require('redis').createClient(process.env.REDIS_URL);

let show = (req, res) => {
  //Assigns URL parameters to variables
  //URL parameters get stored in an object
  let urlQueries = req.query;
  let name = urlQueries.name;

  //Returns the variables to be displayed on the page
  if(name) {
    res.render('test.njk', {name: 'name'});
  } else {
    res.render('test.njk');
  }
};

let retrieve = (req, res) => {
  res.render('test.njk', {name: req.params.name});
};

let createTest = (req, res) => {
  let newGuid = guid.create();
  while (!guid.isGuid(newGuid)) {
    newGuid = guid.create();
  }

  let key = newGuid.value.toString();

  let data = {
    url: req.body.url,
    steps: [],
    status: "pending",
    //Returns the number of milliseconds since 1 Jan 1970 00:00:00 UTC
    timestamp: Date.now()
  };

  let input = req.body;
  let rows = input.idOrClass.length;

  for (var i = 0; i < rows; i++) {
    input.act[i] = input.act[i].replace(/\s+/g, '');
    data.steps.push({
      id: input.idOrClass[i],
      element: input.elementID[i],
      action: input.act[i],
      value: input.textEnt[i],
    });
  }

  data.steps = JSON.stringify(data.steps);

  console.log(data);

  redisClient.hmset(key, data, (err, result) => {
    console.log('ERR: ', err);
    console.log('RES: ', result);

    res.redirect(`/results?id=${newGuid}`);

    // DEBUG
    redisClient.hgetall(key, (_, object) => console.log(object));
  });
};

module.exports = {
  show: show,
  retrieve: retrieve,
  createTest: createTest
};
