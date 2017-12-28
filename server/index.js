const express = require('express');
const path = require('path');
const routes = require('./routes');
// const passport = require('passport');
const bodyParser = require('body-parser')
var fs = require('fs');

const app = express();
const http = require('http');

// BodyParser
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));
app.use('/', routes);



const port = process.env.PORT || 3001;
app.listen(port);
console.log(`Garage.io listening on ${port}`);

