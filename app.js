require('dotenv').config();
require('./ngrok').init();
const config = require('./config');
const express = require('express');

const app = express();

// route configuration
require('./routes')(app);

// start express web server
app.use(express.static(`${__dirname}/dist`));
app.listen(config.httpPort);
console.log(`Web server listening on ${config.localExternalIp}:${config.httpPort}`);
