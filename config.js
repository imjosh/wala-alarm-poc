/* WARNING: If your code will be publicly visible, e.g. if you commit this project to a public github repository,
   don't store secrets in this file! - see the my.env file
*/
const { env } = process;
const config = {};

/* user configurable settings */

/* You will create IFTTT applets that trigger on an incoming webhook request.
   To obtain your webhook key: enable the Webhook service: https://ifttt.com/maker_webhooks
   -> click 'Connect' -> click 'Settings' https://ifttt.com/services/maker_webhooks/settings

   The webhook URL will be 'https://maker.ifttt.com/use/{your key}
   The key is the random looking text after the last slash.
*/

config.ifttt_key = env.ifttt_key || '';
config.actions = require('./actions');

config.ngrok = {};
// If you have a ngrok account (free or paid), you can enter the authtoken here (not required)
// config.ngrok.authtoken = env.ngrok_authtoken || 'e.g. putyourtokenhere';
config.ngrok.authtoken = env.ngrok_authtoken || '';

/* Free ngrok accounts are assigned a dynamic subdomain every time the ngrok process starts.
   So, any webhooks you setup in ifttt will have to be reconfigured when that happens (ok for testing purposes).

   For a more stable setup, paid ngrok accounts allow you to create a custom subdomain which won't change.
   If you don't want to pay for an ngrok account, you could use ddns and open an incoming port on your router,
   or some other arrangement.
*/

//   Leave this setting blank if you don't have a paid ngrok account
config.ngrok.subdomain = env.ngrok_subdomain || '';

config.httpPort = 8000;

//
/* other settings */
config.ngrok.path = process.platform === 'win32' ? `${env.HOMEPATH}\\ngrok.exe` : `${env.HOME}/ngrok`;
config.ngrok.dashboard = 'http://127.0.0.1:4040';
config.webhooks = {};
config.webhooks.alarm = '';

// Get local ip address
const nics = require('os').networkInterfaces();

Object.keys(nics).forEach(key => {
  const nic = nics[key];
  nic.forEach(ip => {
    if (ip.family === 'IPv4' && ip.internal === false) {
      config.localExternalIp = ip.address;
    }
  });
});

module.exports = config;
