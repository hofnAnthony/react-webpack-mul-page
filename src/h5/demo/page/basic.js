import React, { Component } from 'react'
import { isGuiHua, isWeiXin, isWebView, isTalicai, isTimi, isJijindou } from 'lcgc_utils/ua'
import { setShare, openShare } from 'lcgc_share'
import { event, page, error } from 'lcgc_log'

// 日志统计功能
window._hmt = []
event('demo', 'test', '测试')
page({ name: 'zhongxia', loadTime: '100ms' })
page('自定义页面信息日志记录')
error('接口请求报错')

// 案例1：判断浏览器UserAgent信息
console.log('guihua:', isGuiHua())
console.log('isWeixin:', isWeiXin())
console.log('isWebView:', isWebView())
console.log('isTalicai:', isTalicai())
console.log('isTimi:', isTimi())
console.log('isJijindou:', isJijindou())

window.successForApp = () => {
  alert('APP分享成功')
}

window.cancleForApp = () => {
  alert('APP分享取消')
}

// 案例2：设置分享信息
setShare(
  {
    title: '默认分享的标题',
    desc: '默认分享的描述',
    url: window.location.href,
    imgUrl: 'https://guihua-static.licaigc.com/dazhaxie.png',
    successFunc: 'successForApp',
    cancelFunc: 'cancleForApp'
  },
  true
)

// 案例3：渲染组件
class BasicDemo extends Component {
  render() {
    const svg = '<svg src="{svg{{h5/demo/imgs/badge_1.svg}}}"></svg>'
    const arr = [
      { icon: '<svg src="{svg{{h5/demo/imgs/2_1.svg}}}"></svg>' },
      { icon: '<svg src="{svg{{h5/demo/imgs/2_1.svg}}}"></svg>' },
      { icon: '<svg src="{svg{{h5/demo/imgs/2_1.svg}}}"></svg>' },
      { icon: '<svg src="{svg{{h5/demo/imgs/2_1.svg}}}"></svg>' }
    ]
    return (
      <div>
        <div
          className="u-btn u-baidu-statistics__event"
          data-baidu-category="图片"
          data-baidu-action="click"
          data-baidu-desc="描述"
        >
          百度自定义事件统计_cache
        </div>

        <div
          className="u-btn"
          onClick={() => {
            openShare()
          }}
        >
          按钮触发分享
        </div>

        <hr />
        <p>使用本地图片【默认使用七牛上的图片】</p>
        <img src="{{#{h5/demo/imgs/null.png}}}" />

        <hr />
        <p>使用svg图片</p>
        <i dangerouslySetInnerHTML={{ __html: svg }} />

        {arr.map(item => {
          return <i dangerouslySetInnerHTML={{ __html: item.icon }} />
        })}
      </div>
    )
  }
}

ReactDOM.render(<BasicDemo />, document.getElementById('container'))
