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

module.exports = {
  show: show,
  retrieve: retrieve,
  sendForm: sendForm
};
