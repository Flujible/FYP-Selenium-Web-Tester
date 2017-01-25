let retrieve = (req, res) => {

  res.render('results.njk', {id: req.query.id, result: "/api/results/req.query.id"});


// in the browser set a timeout so every 5 seconds the api gets queried to show the results

};

module.exports = {
  retrieve: retrieve
};
