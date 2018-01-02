const request = require('request');
const config = require('./config');
const actions = require('./actions');

function sendWebHook(actionId, trigger) {
  const uri = actions.getWebHookUrl(actionId, trigger);
  request(
    {
      uri,
      method: 'POST'
    },
    (err, res, body) => {
      if (err) {
        console.error(`send ifttt webhook failed: ${err}`);
        return;
      }

      // fix me wrap in try - body is json on error, text on success
      // const bodyObj = JSON.parse(body);
      // if (bodyObj.errors.length) {
      //   console.error(`send ifttt webhook failed: ${JSON.stringify(bodyObj.errors)}`);
      //   return;
      // }
      // console.log(`sent ifttt webhook. action: ${actionId}, trigger: ${trigger}`);

      console.log(body);
    }
  );
}

module.exports = {
  sendWebHook
};
