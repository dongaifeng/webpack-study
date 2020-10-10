const path = require('path');
const { DllPlugin } = require('webpack');

module.exports = {
  entry: {
    react: ['react', 'react-dom'],
    lodash: ['lodash']
  },

  output: {
    path: path.resolve(__dirname, './dll'),
    filename: '[name]-dll.js',
    library: '[name]'
  },

  mode: 'development',

  plugins: [
    new DllPlugin({
      path: path.join(__dirname, './dll', '[name]-mainfest.json'),
      // name 必须和 library 一致
      name: '[name]',

    })
  ]
}