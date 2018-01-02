const request = require('request');
const config = require('./config');
const { execFile } = require('child_process');
const { spawn } = require('child_process');

const { path, authtoken, subdomain } = config.ngrok;

function init() {
  if (!authtoken) {
    start();
    return;
  }

  // install ngrok authtoken
  execFile(path, ['authtoken', authtoken], (error, stdout) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
    start();
  });
}

function start() {
  const args = ['http'];
  if (subdomain) {
    args.push(`-subdomain=${subdomain}`);
  }
  args.push(config.httpPort);
  const child = spawn(path, args);
  child.on('error', err => {
    console.error(`Error starting ngrok: ${err}`);
  });

  // delay to let ngrok setup tunnel
  // todo: implement async retry with retry limit and backoff
  setTimeout(() => {
    getUri();
  }, 1000);
}

function getUri() {
  // use ngrok client api to get tunnel url
  request(
    {
      uri: `${config.ngrok.dashboard}/api/tunnels`,
      method: 'GET'
    },
    (err, res, body) => {
      if (err) {
        console.error('ngrok tunnel failed to start');
        return;
      }
      const tunnel = JSON.parse(body).tunnels[0].public_url.split('/')[2];
      if (tunnel) {
        console.log(`ngrok tunnel created successfully. Dashboard: ${config.ngrok.dashboard}`);
        config.webhooks.alarm = `${tunnel}/webhooks/alarm`;
        console.log(`webhook url = http(s)://${config.webhooks.alarm}`);
      } else {
        console.error('There was a problem creating the ngrok tunnel');
      }
      config.ngrok.tunnel = tunnel;
    }
  );
}

module.exports = {
  init
};
