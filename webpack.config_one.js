const path = require('path');

const htmlwebpackplugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = {

  entry: './src/reactDemo.js',
  // entry: './src/index.js',

  mode: 'development',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[hash].js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use:['style-loader', 'css-loader']
        // use:[MiniCssExtractPlugin.loader, 'css-loader']
      },

      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'file-loader',
          options:{
            name: '[name].[ext]',
            outputPath: 'images',
          }
        }
      },

      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: {
          loader: 'file-loader',
          options:{
            name: '[name].[ext]',
          }
        }
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1"
                  },
                  corejs: 2,//新版本需要指定核⼼库版本
                  useBuiltIns: "usage"//按需注⼊
                }
              ],

              "@babel/preset-react"
            ]
          }
        }
      }

    ]
  },

  plugins: [
    new htmlwebpackplugin({
      title: '首页',
      template: './src/index.html',
      filename: 'index.html'
    }),

    new CleanWebpackPlugin(),

    // new MiniCssExtractPlugin({
    //   filename: 'css/[name]_[contenthash:6].css'
    // }),

    new webpack.HashedModuleIdsPlugin()
  ],

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    contentBase: './dist',
    open: true,
    port: 7777,
    hot: true,
    hotOnly: true
  }
}