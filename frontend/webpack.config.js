const path = require('path');
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: 'production', // Set mode to development or production
  entry: './src/app.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {

    static: {
      directory: path.resolve(__dirname),//serve index.html (remove 'dist' if index.html in root folder
    },
    open: true, //opens browser window automatically
  },

  devtool: 'eval-cheap-module-source-map',

  plugins: [
    new Dotenv()
  ]

};