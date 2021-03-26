const path = require('path');

const htmlwebpackplugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const webpack = require('webpack');
// const DllReferencePlugin = webpack.DllReferencePlugin 

const MyWebpackPlugin = require('./myPlugin/my-webpack-plugin')

const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size:os.cpus().length })

console.log("环境变量：", process.env.Node_ENV)

module.exports = {

  entry: './src/useMyLoader.js',

  mode: 'development',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[hash].js',
    publicPath: './'
  },

  resolveLoader: {
    modules: ['node_modules', './myLoader']
  },

  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
         
          {
            loader: './myLoader/replaceName.js',
            options: {
              name:'哈哈哈'
            }
          },

          'addTimeLoader',
        ]
      }

    ]
  },

  plugins: [

    new htmlwebpackplugin({
      title: '首页',
      template: './src/index.html',
      filename: 'index.html'
    }),

    new MyWebpackPlugin({
      name: '我的插件'
    })

  ],

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    contentBase: './dist',
    open: true,
    port: 7777,
    hot: true,
    hotOnly: true
  },

  resolve: {
    modules: [ path.resolve(__dirname, './node_modules') ],
    alias: {
      '@': path.join(__dirname, './page'),
      'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js')
    }
  }
}