// Grab the dependancies that we need
let express = require("express");
let app = express();
let path = __dirname + '/views/';
let nunjucks = require('nunjucks');

let index = require('./controllers/index.js');
let err404 = require('./controllers/err404.js');
let test = require('./controllers/test.js');

//Set the port to 8080 if the environment variable doesnt specify
let port = process.env.PORT || 8080;

nunjucks.configure(app.get('views'), {
  autoescape: true, //This stops scripts from being interpreted when entering into forms
  noCache: true, //Never store a cache and recompile templates each time
  watch: true, //Reload templates when they are changed (server side)
  express: app //Tells nunjucks we are using an express app called 'app'
});

// Prints request type and what the user is accessing to the console
let logRequest = (req, res, next) => {
  console.log("Method: " + req.method + ". Accessing: " + req.url);
  next();
};

//Returns the requested page of the site to the user
app.get("/", logRequest, index.show);

app.get('/test/:name', logRequest, test.retrieve);
app.get('/test', logRequest, test.show);

//For any other page, show 404
app.use("*", err404.show);

app.listen(port, function() {
  console.log("Server started! Listening on " + port);
});
