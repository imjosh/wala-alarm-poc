require('dotenv').config();
require('./ngrok').init();
const config = require('./config');
const express = require('express');
// const { spawn } = require('child_process');

const app = express();

// const args = ['./walabot/app.py'];
// args.push(config.httpPort);
// const child = spawn('/usr/bin/python', args);
// child.on('error', err => {
//   console.error(`Error starting Walabot python script: ${err}`);
// });

// route configuration
require('./routes')(app);

// start express web server
app.use(express.static(`${__dirname}/dist`));
app.listen(config.httpPort);
console.log(`Web server listening on ${config.localExternalIp}:${config.httpPort}`);
