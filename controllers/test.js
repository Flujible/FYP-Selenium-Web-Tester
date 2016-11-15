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

let sendForm = (req, res) => {
  let userName = req.body.username;
  let userEmail = req.body.useremail;
  console.log("Username: " + userName + " Email: " + userEmail);
  res.render('formAccept.njk');
};

let createTest = (req, res) => {
  let test = {
    url: req.body.url,
    idType: req.body.idOrClass,
    id: req.body.elementID,
    action: req.body.act,
    value: req.body.textEnt
  }
  console.log(test);

  // let url = req.body.url;
  // let idType = req.body.idOrClass;
  // let id = req.body.elementID;
  // let action = req.body.act;
  // let text = req.body.textEnt;
  //
  // console.log("URL: " + url + "\n" +
  //             "ID Type: " + idType + "\n" +
  //             "ID: " + id + "\n" +
  //             "Action: " + action + "\n" +
  //             "Text: " + text + "\n");
  res.render('formAccept.njk');
};

module.exports = {
  show: show,
  retrieve: retrieve,
  sendForm: sendForm,
  createTest: createTest
};
