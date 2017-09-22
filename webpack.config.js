const path = require('path');

module.exports = {
  entry: './src/vue-rest/index.js',
  output: {
    path: path.resolve(__dirname, 'bin'),
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
