import React, { Component } from "react";
import ReactDom from "react-dom";
import styles from './index.less'
import css from './index.css'

import _ from "lodash";

import { a, b } from "./treeShakingTest";

a()

// 使用下 要不会被摇树掉
console.log(_.join(['a','b','c','****']))

function aaa() {
  console.log('aaaaaa')
}

class App extends Component {
  render() {
    return <div>
      hello world
      <p>
        尽快答复回来看实际发货呢
      </p>
    </div>;
  }
}


ReactDom.render(<App />, document.getElementById("app"));