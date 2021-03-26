const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser'); // 对文件进行编译成ast
const traverse = require('@babel/traverse').default; // 解析ast

const { transformFromAst } = require('@babel/core');

class Webpack {
  constructor(options) {
    // 保存配置信息
    this.entry = options.entry;
    this.output = options.output;
    this.module = [];
  }

  run() {
    const info = this.parse(this.entry);
    this.module.push(info);

    for(let i = 0; i < this.module.length; i++) {
      const item = this.module[i];
      const { dependencies } = item;

      if(dependencies) {
        for(let j in dependencies) {
          const info = this.parse( dependencies[j] );
          this.module.push(info)
        }
      }
    }

   

    // 转换数据结构
    const obj = {}
    this.module.forEach(item => {
      obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code
      }
    });
    console.log('info--------->', obj)

    // 生成文件
    this.file(obj)
  }

  parse(entryFile) {
    
    const content = fs.readFileSync(entryFile, 'utf-8');
    const dependencies = {}

    // 使用babel/parser解析内容，返回ast
    const ast = parser.parse(content, {
      sourceType: "module",
    });

    // 获取模块的路径
    traverse(ast, {
      ImportDeclaration({ node }) {
        // node.source.value是相对路径：./other，我们要拼接成绝对路径：./src/other
        const src = path.dirname(entryFile);
        const newPathName = './' + path.join(src, node.source.value).replace('\\', '/')
        dependencies[node.source.value] = newPathName
      }
    })

    // 编译: 把代码处理成浏览器可执行的代码，按照 @babel/preset-env 的规则
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })

    return { entryFile, dependencies, code }
  }

  file(code) {
    const filepath = path.join(this.output.path, this.output.filename)
    const graph = JSON.stringify(code);

    const bundle = `(function(graph){

      function require(module){
        var exports = {};
        var localRequire = function(relativePath){
          return require(graph[module].dependencies[relativePath])
        }

        (function(require, exports, code){
          eval(code)
        })(localRequire, exports, graph[module].code);

        return exports;
      }

      require('${this.entry}')
    })(${graph})`;

    // 写入文件
    fs.writeFileSync(filepath, bundle, 'utf-8')
  }
}

module.exports = Webpack