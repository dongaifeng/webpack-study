const path = require('path');

const htmlwebpackplugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')

module.exports = {

  entry: './src/reactDemo.js',
  // entry: './src/index.js',

  mode: 'production',

  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[hash].js',
    publicPath: './'
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        include: path.resolve(__dirname, './src'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
      },

      {
        test: /\.css$/,
        include: path.resolve(__dirname, './src'),
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },

      {
        test: /\.(png|jpe?g|gif)$/,
        include: path.resolve(__dirname, './src'),
        use: {
          loader: 'file-loader',
          options: {
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
          options: {
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
      filename: 'index.html',

      // minify: {
      //   // 压缩HTML⽂件
      //   removeComments: true, // 移除HTML中的注释
      //   collapseWhitespace: true, // 删除空⽩符与换⾏符
      //   minifyCSS: true // 压缩内联css
      // }
    }),

    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:6].css'
    }),

    // new OptimizeCSSAssetsPlugin({
    //   cssProcessor: require("cssnano"), //引⼊cssnano配置压缩选项
    //   cssProcessorOptions: {
    //     discardComments: { removeAll: true }
    //   }
    // }),

    // 清除⽆⽤ css
    new PurifyCSS({
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径⽂件
        path.resolve(__dirname, './src/*.html'),
        path.resolve(__dirname, './src/*.js')
      ])
    })

  ],

  // devtool: 'cheap-module-eval-source-map',

  // devServer: {
  //   contentBase: './dist',
  //   open: true,
  //   port: 7777,
  //   hot: true,
  //   hotOnly: true
  // },

  resolve: {
    modules: [path.resolve(__dirname, './node_modules')],
    alias: {
      '@': path.join(__dirname, './page'),
      'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js')
    }
  },

  optimization: {
    usedExports: true,

    splitChunks: {
      chunks: 'all',
      minSize: 40000,//最⼩尺⼨，当模块⼤于30kb

      // 缓存组 查找到对应的引用 独立打包
      cacheGroups: {
        lodash: {
          test: /lodash/,
          name: 'lodash',
          minChunks: 1
        },

        react: {
          test: /react|react-dom/,
          name: 'react',
          minChunks: 1
        }
      }
    }
  }
}