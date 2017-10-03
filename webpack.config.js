const path = require('path');

module.exports = {
  entry: './src/install.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'vue-rest.bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
};
