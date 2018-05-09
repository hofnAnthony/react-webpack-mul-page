import React, { Component } from 'react'
import BROWSER, { isGuiHua, guihuaVersion, isWeiXin } from 'lcgc_utils/ua'
import { setShare, openShare } from 'lcgc_share'
import { Toast } from 'antd-mobile'

// 案例1：判断浏览器UserAgent信息
console.log(BROWSER)
console.log('guihua:', isGuiHua())
console.log('guihuaVersion:', guihuaVersion())
console.log('isWeixin:', isWeiXin())

window._hmt = []
window.successForApp = () => {
  Toast.info('APP分享成功', 3, null, false)
}

window.cancleForApp = () => {
  Toast.info('APP分享取消', 3, null, false)
}

let shareInfo = {
  title: '右上角分享默认分享的标题',
  desc: '右上角分享的描述',
  url: window.location.href,
  imgUrl: 'https://guihua-static.licaigc.com/dazhaxie.png',
  successFunc: 'successForApp',
  cancelFunc: 'cancleForApp'
}

// 案例2：设置分享信息
setShare(shareInfo)

// 案例3：渲染组件
class BasicDemo extends Component {
  render() {
    return (
      <div>
        <div
          className="u-btn"
          onClick={() => {
            openShare(shareInfo)
          }}
        >
          分享成功回调测试_cache
        </div>
        <div
          className="u-btn"
          onClick={() => {
            openShare({ ...shareInfo, title: '111111' })
          }}
        >
          按钮分享文案：111111
        </div>
        <div
          className="u-btn"
          onClick={() => {
            openShare({ ...shareInfo, title: '222222' })
          }}
        >
          按钮分享文案：222222
        </div>

        <hr />
        <div
          className="u-btn"
          onClick={() => {
            setShare({ ...shareInfo, title: '333333' })
          }}
        >
          设置右上角分享文案：333333
        </div>

        <hr />
        <div
          className="u-btn"
          onClick={() => {
            openShare({ ...shareInfo, platforms: 'wx_timeline' })
          }}
        >
          仅朋友圈
        </div>
        <div
          className="u-btn"
          onClick={() => {
            openShare({ ...shareInfo, platforms: 'wx_session' })
          }}
        >
          仅微信好友
        </div>
        <div
          className="u-btn"
          onClick={() => {
            openShare({ ...shareInfo, platforms: 'weibo' })
          }}
        >
          仅微博
        </div>
        <div
          className="u-btn"
          onClick={() => {
            openShare({ ...shareInfo, platforms: 'qq' })
          }}
        >
          仅QQ
        </div>
        <div
          className="u-btn"
          onClick={() => {
            openShare({ ...shareInfo, platforms: 'link' })
          }}
        >
          仅支持复制链接
        </div>

        <hr />
        <div
          className="u-btn"
          onClick={() => {
            openShare({ ...shareInfo, platforms: 'wx_session,wx_timeline' })
          }}
        >
          朋友圈,微信好友
        </div>
        <div
          className="u-btn"
          onClick={() => {
            openShare({ ...shareInfo, platforms: 'weibo,qq' })
          }}
        >
          微博,QQ
        </div>

        <hr />
        <div
          className="u-btn"
          onClick={() => {
            openShare({ ...shareInfo, platforms: 'wx_session' })
          }}
        >
          微信
        </div>
        <div
          className="u-btn"
          onClick={() => {
            openShare({ ...shareInfo, platforms: 'wx_session,wx_timeline' })
          }}
        >
          微信,朋友圈
        </div>
        <div
          className="u-btn"
          onClick={() => {
            openShare({ ...shareInfo, platforms: 'wx_session,wx_timeline,qq' })
          }}
        >
          微信,朋友圈,QQ
        </div>
        <div
          className="u-btn"
          onClick={() => {
            openShare({ ...shareInfo, platforms: 'wx_session,wx_timeline,qq,weibo' })
          }}
        >
          微信,朋友圈,QQ,微博
        </div>
      </div>
    )
  }
}

ReactDOM.render(<BasicDemo />, document.getElementById('container'))
