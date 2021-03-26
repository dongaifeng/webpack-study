const { compilation } = require("webpack")

class MyWebpackPlugin {
  constructor(options) {
    this.name = options.name
  }

  // compiler是 webpack 的主要引擎, 暴露各个时期的生命周期钩子函数
  // compiler 继承了 Tapable，根据不同的钩子类型，在某些钩子上访问 tap， tapAsync， tapPromise
  // compiler 支持文件监听系统，在文件修改时重新编译，可通过 CLI命令 进入监听模式。
  apply(compiler) {
    // console.log('compiler', compiler)

    // 调用钩子的固定写法，第一个参数伟插件名，第二个参数为回调函数
    // 回调函数的参数各不相同
    compiler.hooks.emit.tapAsync('MyWebpackPlugin', (compilation, cb) => {
      // console.log('compilation:', compilation)
      // ompilation 对象代表了一次单一的版本构建和生成资源。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，一次新的编译将被创建，从而生成一组新的编译资源。一个编译对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。编译对象也提供了很多关键点回调供插件做自定义处理时选择使用
      // compiler 对象代表的是不变的webpack环境，是针对webpack的
      // compilation 对象针对的是随时可变的项目文件，只要文件有改动，compilation就会被重新创建。
      compilation.assets['readme.txt'] = {
        source: () => 'hello word',
        size: () => 20
      }

      cb() // 最后一定要调用cb
    })
  }
}

module.exports = MyWebpackPlugin