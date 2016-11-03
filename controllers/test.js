let show = (req, res) => {
  //Assigns URL parameters to variables
  //URL parameters get stored in an object
  // let urlQueries = req.query;
  // let user_id = urlQueries.id;
  // let token = urlQueries.token;
  // let geo = urlQueries.geo;

  //Returns the variables to be displayed on the page
  // res.send(user_id + ' ' + token + ' ' + geo);
  res.render('test.njk');
};

let retrieve = (req, res) => {
  res.render('test.njk', {name: req.params.name});
}

module.exports = {
  show: show,
  retrieve: retrieve
};
