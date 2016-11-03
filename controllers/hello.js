let show = (req, res) => {
  res.render('test.njk', {name: req.params.name})
  console.log("=" + req.params.name + "=");
};

module.exports = {
  show: show
};
