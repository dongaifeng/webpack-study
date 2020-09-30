# webpack-study

### 安装
npm install webpack webpack-cli -D
不推荐全局安装，这会使你的项目webpack锁定版本，造成webpack依赖因与webpack版本不同产生冲突。
### 特性

- webpack默认只支持js，json。
- 支持comminJs，es6的moudule，AMD等模块。
### 启动
项目安装启动方式：

1.  ./node_modules/.bin/webpack
1. script中添加命令： "dev": "webpack"
1. npx webpack方式启动

npm run 命令会创建一个shell脚本，这个脚本会把当前项目下的node_modules的绝对路径添加到电脑系统的环境变量里。
### 配置项 webpack.config.js
#### entry 入口
入口文件有单入口，多入口方式，默认是：‘./src/index.js'
```javascript
// 单入口 “” 或者 [] 适合单页面应用
entry:"./src/index.js" 
// 多入口 {}  适合多页面应用
entry:{
 index:"./src/index.js",
 login:"./src/login.js"
}
```


#### output 出口
打包压缩后的文件输出的位置，默认 './dist/main.js'
```javascript
output: {
 filename: "bundle.js",// 输出文件的名称
 path: path.resolve(__dirname, "dist")// 输出文件到磁盘的目录，必须是绝对路径
},

// 多入口
output: {
 filename: "[name][chunkhash:8].js",//利用占位符
 path: path.resolve(__dirname, "dist")
},
```
webpack的占位符：

- [name] ： 模块名称，就是入口文件名
- [chunkhash:8] ： chunk 内容的 hash 保留前8位
- [hash] ： hash值
- [contexthash:6] ： 文件内容 hash，每个资源生成的 hash 都是不同的，保留前6位
- [ext] 文件的扩展名 .后面的
#### mode 环境
production, development, none
#### module 模块
module.rules 配置loader规则
loader处理webpack不支持的文件，模块，一个loader只干一件事。
[各种loader的使用方法](https://webpack.docschina.org/loaders/)
loader的使用：
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,  // 用正则匹配要使用这个loader的文件
        use: {
          loader: 'file-loader',
          options: { // 这个loader的选项，每个loader有各自的选项
            name: '[name]_[hash].[ext]',  // 输出文件的名称
            outputPath: 'img/'  // 存放目录 把output当做根目录
          }
        }
      },

      // 对css文件使用的loader
      {
        test: /\.css$/,
        exclude: '', // 
        include: '',
        use: ["style-loader", "css-loader"] // 使用多个loader 执行顺序从右到左 从上到下
       }
    ]
  }
}
```


#### plugins 插件配置
piugin可以在webpack运行到某个阶段，做一些事情，类似生命周期
[webpack的各种plugin使用方法](https://webpack.docschina.org/plugins/html-webpack-plugin/)
```javascript
// webpack的插架都是需要new的 参数是插件的配置项 
plugins: [ 
  
  	// htmlWebpackPlugin,会在打包结束后，⾃动⽣成⼀个html⽂件，并引入把打包⽣成的js
  	// 默认可使用ejs模板，它有自己的loader，所以要去除style-loader，使用它自己的
  	// 在html中使用 htmlWebpackPlugin.options.title 可获取配置项
    new htmlWebpackPlugin({
      title: 'my demo',
      filename: 'app.html',
      template: './src/index.html'
    }),
  	
  // 用于清楚dist目录的冗余代码
    new CleanWebpackPlugin(),
  
  // 生成单独的css文件
  	new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:6].css'
    })
  ]

// index.html
<title><%= htmlWebpackPlugin.options.title %></title>
```
html-webpack-plugin配置项：

- title: ⽤来⽣成⻚⾯的 title 元素 
- filename: 输出的 HTML ⽂件名，默认是 index.html, 也可以直接配置带有⼦⽬录。
- template: 模板⽂件路径，⽀持加载器，⽐如 html!./index.html 
- inject: true | 'head' | 'body' | false ,注⼊所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。 
- favicon: 添加特定的 favicon 路径到输出的 HTML ⽂件中。 
- minify: {} | false , 传递 html-minifier 选项给 minify 输出 
- hash: true | false, 如果为 true, 将添加⼀个唯⼀的 webpack 编译 hash 到所 有包含的脚本和 CSS ⽂件，对于解除 cache 很有⽤。 
- cache: true | false，如果为 true, 这是默认值，仅仅在⽂件修改之后才会发布⽂ 件。 
- showErrors: true | false, 如果为 true, 这是默认值，错误信息会写⼊到 HTML ⻚⾯中 
- chunks: 允许只添加某些块 (⽐如，仅仅 unit test 块) 
- chunksSortMode: 允许控制块在添加到⻚⾯之前的排序⽅式，⽀持的值：'none' | 'default' | {function}-default:'auto' 
- excludeChunks: 允许跳过某些块，(⽐如，跳过单元测试的块)
#### sourceMap
源代码与打包后的映射关系，通过sourceMap定位到源码。
```javascript
devtool: 'cheap-module-eval-source-map'  // 开发环境

//线上不推荐开启,如果需要开启，使用：
devtool:"cheap-module-source-map", // 线上⽣成配置
```


#### WebpackDevServer
每次改完代码都需要重新打包⼀次，打开浏览器，刷新⼀次。使⽤webpackdevserver来改善体验。
安装：npm install webpack-dev-server -D
配置：
```javascript
"scripts": {
 "server": "webpack-dev-server"
 },
```


```javascript
devServer: {
    contentBase: './dist', // 告诉服务器从那个目录获取内容
      
    open: true, // 是否打开浏览器
      
    port: 8080, // 端口
      
    after: function(app, server) {},  // 往服务器加一个中间件， 加到所有中间件最后
      
    before: function(app, server) {},  // 往服务器加一个中间件， 加到所有中间件最前
      
    // 如果要请求后台接口会出现跨域，可以将请求前面加个/api, 然后devServer会截获每个请求里的/api 并把他替换成 后端的ip
    proxy: {  // 将项目里的请求 代理 到 8080的服务器
      'api': {
        target: 'http://localhost:8080',
        pathRewrite: { '^/api': ''}  // 所有接口中有 /api 的 全部替换成 '',意思就是删除 /api
      }
    },
      
    publicPath: '/assets/', // 服务器静态资源访问路径
      
    hotOnly: true // 开启热模块更新
  }
```


#### HMR热模块替换
webpack本身自带的插件 webpack.HashedModuleIdsPlugin 可实现每次修改业务代码 浏览器自动刷新。
但是** 不⽀持抽离出的css**，所以使用之前我们要 style-loader。
```javascript
// 在devServer中开启hot
devServer: {
    contentBase: './dist',
    open: true,
    port: 7777,
    hot: true,  // 启用 webpack 的 Hot Module Replacement 功能
    hotOnly: true // 启用热模块替换，而无需页面刷新作为构建失败时的回退。
 }，

 // 使用HMR 插件
plugins: [
  new webpack.HashedModuleIdsPlugin()
],
```
js模块改变的时候，需要使⽤module.hot.accept来观察模块更新 从⽽更新
```javascript
if (module.hot) {
   module.hot.accept("./myjsFile.js", function() { // 监听文件改变
   		// 业务代码
   });
}
```
#### Babel
Babel是JavaScript编译器，能将ES6代码转换成ES5代码.
Babel在执⾏编译的过程中，会从项⽬根⽬录下的 .babelrc JSON⽂件中读取配置。
没有该⽂件会从loader的options地⽅读取配置。


1. babel-loader是webpack 与 babel的通信桥梁，不会做把es6转成es5的⼯作。 
1. @babel/core 把es6转成es5
1. @babel/preset-env⾥包含了es，6，7，8转es5的转换规则。
1. @babel/polyfill 垫片，把es的新特性都装进来，来弥 补低版本浏览器中缺失的特性比如Promise



安装：npm i babel-loader @babel/core @babel/preset-env -D
    npm install --save @babel/polyfill
```javascript
//index.js 顶部
import "@babel/polyfill";
```


```javascript
{
 test: /\.js$/,
 exclude: /node_modules/,
 use: {
 	loader: "babel-loader",
 	options: {
 		presets: ["@babel/preset-env"]
 	}
 }
}
```


因为进入 @babel/polyfill 会污染业务模块，使业务代码体积变大，所以需要设置按需引入。


```javascript
// index.js 顶部 
// 删除 @babel/polyfill的引入
// import "@babel/polyfill";

// 修改webpack.config.js 配置
{
   test: /\.js$/,
   exclude: /node_modules/,
   use: {
     loader: "babel-loader",
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
         ]
       ]
     }
   }
 }
```


**useBuiltIns** 选项是 babel 7 的新功能，这个选项告诉 babel 如何配 置 @babel/polyfill 。 它有三个参数可以使⽤： 

-  entry: 需要在 webpack 的⼊ ⼝⽂件⾥ import "@babel/polyfill" ⼀次。 babel 会根据你的使⽤情况导⼊垫 ⽚，没有使⽤的功能不会被导⼊相应的垫⽚。 
- usage: 不需要 import ，全⾃动检 测，但是要安装 @babel/polyfill 。（试验阶段） 
- false: 如果你 import "@babel/polyfill" ，它不会排除掉没有使⽤的垫⽚，程序体积会庞⼤。(不推荐)



也可以新建.babelrc⽂件，把options部分移⼊到该⽂件中。
[官网](https://www.babeljs.cn/)
#### 课堂杂项
npm run 会创建一个shell脚本，这个脚本会把当前项目的node_modules的绝对路径放到系统的环境变量里，所以它才能执行。
pre npm前置钩子命令
post npm后置钩子命令
env命令：查看环境变量。


```javascript
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "predev": "rimraf ./dist", // predev dev前置命令 必须跟dev一样
  "dev": "webpack",
  "postdev": "cd ./dist && touch index.html" // postdev dev的后置命令
},
```
&& 先执行完上一个 再执行下一个
& 前后两个命令同时执行
cross-env模块 是在win下兼容linux命令。
npm script 传参：
```javascript
// 执行dev 命令时，传入 Node_env环境变量
"dev": "Node_env=prod webpack",
 
// js文件中获取 环境变量
 process.env.Node_env
```


