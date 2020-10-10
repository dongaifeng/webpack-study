
// const loaderUtils = require("loader-utils");  //官⽅方推荐处理理loader,query的⼯工具

module.exports = function ( source ) {

  // const options = loaderUtils.getOptions(this
  const options = this.query
  console.log('source:', source)
  console.log('options:', options)

  const callback = this.async()
  setTimeout(() => {    
    const result = source.replace("aaa", options.name);    
    callback(null, result)
  }, 1000);

}