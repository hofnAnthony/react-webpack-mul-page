import React, { Component } from 'react'
import { setShare, openShare, openSharePic } from 'common/js/share'

let shareInfo = {
  title: '右上角分享默认分享的标题',
  desc: '右上角分享的描述',
  url: window.location.href,
  imgUrl: 'https://guihua-static.licaigc.com/dazhaxie.png'
}

// 案例2：设置分享信息
setShare(shareInfo)

class Demo extends Component {
  render() {
    return (
      <div>
        <div
          className="u-btn"
          onClick={() => {
            openShare(shareInfo)
          }}
        >
          按钮触发分享
        </div>

        <div
          className="u-btn"
          onClick={() => {
            openSharePic(shareInfo)
          }}
        >
          分享图片
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, document.getElementById('container'))
