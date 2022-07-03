'use strict';

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    entry: {
      popup: PATHS.src + '/popup.ts',
      background: PATHS.src + '/background.ts',
      welcome: PATHS.src + '/welcome.ts',
      signin: PATHS.src + '/signin.ts',
      activity: PATHS.src + '/activity.ts',
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
  });

module.exports = config;
