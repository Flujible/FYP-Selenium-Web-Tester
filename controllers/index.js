let show = (req, res) => {
  res.render('index.njk');
};

let sendForm = (req, res) => {
  let userName = req.body.username;
  let userEmail = req.body.useremail;
  console.log("Username: " + userName + " Email: " + userEmail);
  res.render('index.njk');
};

module.exports = {
  show: show,
  sendForm: sendForm
};
