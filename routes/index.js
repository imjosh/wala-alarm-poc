const config = require('../config');
const { walabot } = require('./walabot');
const request = require('request');
const { sendWebHook } = require('../ifttt');

module.exports = function index(app) {
  // walabot routes
  app.use('/walabot', walabot);

  // dashboard
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
    console.log('Got Alexa alarm webhook from IFTTT');
    request(
      {
        uri: 'http://localhost:8000/walabot/isAwake',
        method: 'GET'
      },
      (err, _res, body) => {
        if (err) {
          console.error(`get isAwake failed: ${err}`);
          return;
        }

        console.log(body);
        if (body !== 'True') {
          // user is still in bed, activate wakeup device
          console.log('Walabot says your still in bed, sending webhook to ifttt');
          sendWebHook(1, 'on');
        } else {
          console.log("Looks like you're awake.  Not sending webhook to ifttt");
        }
      }
    );
  });
};
