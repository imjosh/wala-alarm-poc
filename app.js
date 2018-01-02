require('dotenv').config();
require('./ngrok').init();
const config = require('./config');
const express = require('express');
const { sendWebHook } = require('./ifttt');

const app = express();
app.use(express.static(`${__dirname}/dist`));
app.listen(config.httpPort);
console.log(`Web server listening on ${config.localExternalIp}:${config.httpPort}`);

/* setup routes */

// hello world
app.get('/', (req, res) => {
  let msg = '<html><h1>wala-alarm-poc</h1><p><b>Web server</b>: ok!</p><br>';
  if (config.ngrok.tunnel) {
    msg += `<p><b>ngrok tunnel url</b>: http(s)://${config.ngrok.tunnel}</p><br>`;
    msg += `<p><b><a href="${config.ngrok.dashboard}">Local ngrok dashboard</a></b></p><br>`;
  } else {
    msg += '<p style="color:red"><b>ngrok tunnel did not start?</b></p><br>';
  }
  if (config.webhooks.alarm) {
    msg += `<p><b>Webhook configured on</b>: http(s)://${config.webhooks.alarm}</p>`;
  } else {
    msg += '<p style="color:red"><b>No webhooks configured...ngrok failed to start?</b>';
  }
  msg += '</html>';
  res.send(msg);
});

// alarm webhook
app.post('/webhooks/alarm', (req, res) => {
  // acknowledge webhook immediately
  res.sendStatus(200);
  console.log('got alarm webhook');

  /* todo: do something useful here */
  sendWebHook(1, 'on');
});
