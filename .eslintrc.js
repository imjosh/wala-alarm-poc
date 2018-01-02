// http://eslint.org/docs/user-guide/configuring
module.exports = {
  extends: 'airbnb-base',

  // add your custom rules here
  'rules': {
    'no-use-before-define': 0,
    'no-param-reassign': 0,
    'comma-dangle': 0,
    'arrow-parens': 0,
    'no-console': 0,

    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'linebreak-style': ["error", "windows"],
    'max-len': ['error', 172],
    'no-underscore-dangle': 0
  }
}