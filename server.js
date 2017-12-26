var express = require("express"),
  mongoose = require("mongoose"),
  Item = require("./api/models/itemModel"),
  bodyParser = require("body-parser"),
  app = express(),
  routes = require("./api/routes/itemRoutes"),
  port = process.env.PORT || 8080,
  cors = require("cors");

mongoose.connect(
  "mongodb://krunal:yadav@ds239965.mlab.com:39965/krunaldb",
  { useMongoClient: true }
);
var connection = mongoose.connection;
connection.on(
  "error",
  console.error.bind(console, "There is a problem while connecting MongoDB")
);

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// for cross origin resource sharing, used when you are consuming APIs from cross domain
app.use(cors());

//setup routes
routes(app);

// handle not found route
app.use(function(req, res) {
  res.status(404).send({
    url: req.originalUrl + " not found"
  });
});

// binds and listens for connections on specified host and port
var server = app.listen(port, function() {
  console.log("Server listens at: " + server.address().port);
});
