// Grab the dependancies that we need
let express = require("express");
let app = express();
let path = __dirname + '/views/';
let nunjucks = require('nunjucks');
let hello = require('./controllers/hello');

//Set the port to 8080 if the environment variable doesnt specify
let port = process.env.PORT || 8080;

nunjucks.configure(app.get('views'), {
  autoescape: true, //This stops scripts from being interpreted when entering into forms
  noCache: true, //Never store a cache and recompile templates each time
  watch: true, //Reload templates when they are changed (server side)
  express: app //Tells nunjucks we are using an express app called 'app'
})

// Prints request type and what the user is accessing to the console
let logRequest = (req, res, next) => {
  console.log("Method: " + req.method + ". Accessing: " + req.url);
  next();
};

//Returns the root of the site to the user
app.get("/", logRequest, function(req, res) {
  //sends the HTML file back to the user when requesting the page
  res.render(path + "index.njk");
});

app.get("/contact", logRequest, function(req, res) {
  res.render(path + "contact.njk");
});

app.get('/test', logRequest, function(req, res) {
  //Assigns URL parameters to variables
  //URL parameters get stored in an object
  let urlQueries = req.query;
  let user_id = urlQueries.id;
  let token = urlQueries.token;
  let geo = urlQueries.geo;

  //Returns the variables to be displayed on the page
  // res.send(user_id + ' ' + token + ' ' + geo);
  res.render(path + "test.njk");
});

app.get('/hello/:name', logRequest, hello.show);

app.use("*", function(req, res) {
  res.sendFile(path + "404.html");
});

app.listen(port, function() {
  console.log("Server started! Listening on " + port);
});
