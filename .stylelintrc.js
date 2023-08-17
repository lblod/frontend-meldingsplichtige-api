'use strict';

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-prettier/recommended',
    'stylelint-config-standard-scss',
  ],
  rules: {
    'selector-class-pattern': '^([a-z][a-z0-9]*)((-)+[a-z0-9]+)*$',
  },
};
