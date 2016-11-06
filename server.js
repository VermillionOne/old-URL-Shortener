// Grab our dependencies
const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const globalTunnel = require('global-tunnel');
const path = require('path');

// define constants
const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/public');

// Configure our Application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// Setup URI proxy
globalTunnel.initialize({
  tunnel: 'neither',
  host: 'linkr.com',
  port: 3000,
});


// Tell express where to look for static assets
app.use(express.static(publicPath));

// Set ejs as our templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Set the routes
// Routes file for views
app.use('/', require('./app/routes/routes'));
// Routes File for accessing API
app.use(require('./app/routes/api/index'));

exports.server = app.listen(port, () => {
    // console.log('Server Active On ', port);
});
