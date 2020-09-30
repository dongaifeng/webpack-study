import "@babel/polyfill";

require('./index.css')

import pc from './my.jpg'

let img = new Image();
img.src = pc;
img.setAttribute('width', '100px')
let app = document.getElementById('app');
app.appendChild(img);
const fn = async () => {
  const res = await getName()
  console.log(res);
}
function getName() {
  return new Promise(resolve => {
    resolve('我叫董爱疯你')
  })
}

fn()