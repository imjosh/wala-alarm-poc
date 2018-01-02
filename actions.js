/* When you configure the webhook trigger for an IFTTT applet, you will specify the field label as "trigger" and a
   unique value like "action1_on" or "action1_off", etc.  Make sure the field label values here match the applet
   configuration
*/

const actions = [];

actions.push({
  actionId: 1,
  label: 'Lights',
  onTrigger: 'action1_on',
  offTrigger: 'action1_off'
});

// you could add more actions here
// actions.push({
//   actionId: 2,
//   label: 'Music',
//   onTrigger: 'action2_on',
//   offTrigger: 'action2_off'
// });

// actions.push({
//   actionId: 3,
//   label: 'Siren',
//   onTrigger: 'action3_on',
//   offTrigger: 'action3_off'
// });

// actions.push({
//   actionId: 4,
//   label: 'Emergency',
//   onTrigger: 'action4_on'
//   // offTriggers aren't required
// });

module.exports = {
  actions,
  getWebHookUrl
};

function getActionById(actionId) {
  return actions.find(action => action.actionId === actionId);
}

function getTriggerVal(actionId, trigger) {
  const action = getActionById(actionId);
  return action[`${trigger}Trigger`];
}

function getWebHookUrl(actionId, trigger) {
  // trigger = 'on' | 'off'
  const triggerVal = getTriggerVal(actionId, trigger);
  return buildWebHookUrl(triggerVal);
}

function buildWebHookUrl(triggerVal) {
  const config = require('./config');
  return `https://maker.ifttt.com/trigger/${triggerVal}/with/key/${config.ifttt_key}`;
}
