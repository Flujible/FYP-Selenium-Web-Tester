let guid = require("guid");

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
  let test = {
    guid: newGuid.value,
    url: req.body.url,
    idType: req.body.idOrClass,
    id: req.body.elementID,
    action: req.body.act,
    value: req.body.textEnt
  }
  console.log(test);
  res.render('formAccept.njk');
};

module.exports = {
  show: show,
  retrieve: retrieve,
  createTest: createTest
};
