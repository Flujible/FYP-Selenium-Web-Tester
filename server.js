// Grab the dependancies that we need
let express = require("express");
let app = express();
let path = __dirname + '/views/';
let nunjucks = require('nunjucks');
let bodyParser = require('body-parser');

let index = require('./controllers/index');
let err404 = require('./controllers/err404');
let test = require('./controllers/test');
let results = require('./controllers/results');
const api = require('./controllers/api');

require('dotenv').load({
	silent: true
});

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

app.use(express.static('public'));

//This allows us to use POST (crashes without) I think by converting the body into JSON so that index.sendForm can use it
app.use(bodyParser.json());
//This allows us to actually see the values, as without it we get 'undefined', but I dont know how or why it works
app.use(bodyParser.urlencoded({extended: true}));

//Returns the requested page of the site to the user
app.get("/", logRequest, index.show);

app.get("/results/", logRequest, results.index);
app.get("/results/:id", logRequest, results.show);

app.get('/test/:name', logRequest, test.retrieve);
app.get('/test', logRequest, test.show);
app.post("/test", logRequest, test.createTest);

app.get('/api/results', logRequest, api.index);
app.get('/api/results/:guid', logRequest, api.show);

//For any other page, show 404
app.use("*", err404.show);

//Run the server with confirmation message
app.listen(port, function () {
	console.log("Server started! Listening on " + port);
});
