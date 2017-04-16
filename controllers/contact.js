let show = (req, res) => {
  res.render('contact.njk');
};

let submit = (req, res) => {
  res.redirect('/thanks');
};

module.exports = {
  show: show,
  submit: submit,
};
