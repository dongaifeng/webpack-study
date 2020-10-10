const path = require('path');

const htmlwebpackplugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const webpack = require('webpack');
const DllReferencePlugin = webpack.DllReferencePlugin 

console.log("环境变量：", process.env.Node_ENV)

module.exports = {

  entry: './src/reactDemo.js',
  // entry: './src/index.js',

  mode: 'development',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[hash].js',
    publicPath: './'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './src'),
        use:['style-loader', 'css-loader']
        // use:[MiniCssExtractPlugin.loader, 'css-loader']
      },

      {
        test: /\.(png|jpe?g|gif)$/,
        include: path.resolve(__dirname, './src'),
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
        include: path.resolve(__dirname, './src/webfont'),
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
      },

      {
        test: /\.less$/,
        include: path.resolve(__dirname, './src'),
        use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
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

    new webpack.HotModuleReplacementPlugin(),

    new DllReferencePlugin({
      manifest: require('./dll/lodash-mainfest.json')
    }),

    new DllReferencePlugin({
      manifest: require('./dll/react-mainfest.json')
    }),

    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, './dll/react-dll.js')
    }),

    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, './dll/lodash-dll.js')
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