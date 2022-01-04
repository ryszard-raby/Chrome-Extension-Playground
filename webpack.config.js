const path = require('path');

module.exports = {
  entry: ['./app.js'],
  output: {
    path: path.resolve(__dirname, 'chrome-extension'),
    filename: 'content.js',
  },
  mode: 'development',
  watch: true,
  target: 'node'
}