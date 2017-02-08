let show = (req, res) => {
  res.render('results/show.njk', {id: req.params.id});
};

let index = (req, res) => {
  res.render('results/index.njk', {id: req.query.id});
};

// in the browser set a timeout so every 5 seconds the api gets queried to show the results


module.exports = {
  index: index,
  show: show
};
