'use strict';

const path = require('path');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../build'),
  config: (file = '') => path.resolve(__dirname, file),
};

module.exports = PATHS;
