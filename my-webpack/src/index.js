// 浏览器不识别此语法 需要对模块编译 变成浏览器可识别
import { add } from './other.js'
import { more } from './more.js'

add(1,2)
more(3,4)
console.log('哈哈哈哈')