const path = require('path');


module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js' ),
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    clean: true,
    filename: '[name].[contenthash:8].js'
  }
}