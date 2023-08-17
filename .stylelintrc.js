'use strict';

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-prettier/recommended',
    'stylelint-config-standard-scss',
  ],
  rules: {
    // `[-_]+` was originally just `-`, but we use `--` and `__` in SCSS to
    // indicate modifiers and children respectively.
    'selector-class-pattern': '^([a-z][a-z0-9]*)([-_]+[a-z0-9]+)*$',
  },
};
