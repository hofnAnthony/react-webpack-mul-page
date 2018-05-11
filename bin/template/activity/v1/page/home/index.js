import './_index.less'
import React, { Component } from 'react'
import { setShare } from 'lcgc_share'

setShare(
  {
    title: '分享的标题测试',
    desc: '分享的描述测试',
    link: `${window.location.href}`,
    imgUrl: 'https://guihua-static.licaigc.com/dazhaxie.png'
  },
  true
)

class ProductList extends Component {
  render() {
    return (
      <div>
        <p>这个是一个模板页面</p>
      </div>
    )
  }
}

ReactDOM.render(<ProductList />, document.getElementById('container'))
