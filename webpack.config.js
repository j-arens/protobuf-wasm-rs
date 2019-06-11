const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  entry: './src/index.js',
  output: {
    filename: 'index.bundle.js',
  },
};
