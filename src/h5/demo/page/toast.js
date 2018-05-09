import React, { Component } from 'react'
import { WebViewTip } from 'lcgc_webview'

class ToastDemo extends Component {
  render() {
    return (
      <div>
        <div
          className="u-btn"
          onClick={() => {
            WebViewTip.toast('你真棒，真棒')
          }}
        >
          默认时间后toast消失
        </div>
        <div
          className="u-btn"
          onClick={() => {
            WebViewTip.toast('对，说的就是你', 5)
          }}
        >
          5s后toast消失
        </div>
        <hr />

        <div
          className="u-btn"
          onClick={() => {
            WebViewTip.loading()
            setTimeout(() => {
              WebViewTip.hide()
            }, 3000)
          }}
        >
          loading无内容，且可自动关闭
        </div>
        <div
          className="u-btn"
          onClick={() => {
            WebViewTip.loading('搬砖中...')
            setTimeout(() => {
              WebViewTip.hide()
            }, 3000)
          }}
        >
          loading有内容，且可自动关闭
        </div>
        <hr />

        <div
          className="u-btn"
          onClick={() => {
            WebViewTip.dialog({
              title: '我是标题',
              content: '我是内容',
              onConfirm: () => {
                WebViewTip.toast('我是确定，你点击了我')
              },
              onCancel: () => {
                WebViewTip.toast('取消取消取消')
              }
            })
          }}
        >
          成功弹出弹窗，且按钮名称为“取消”、“确定”
        </div>

        <div
          className="u-btn"
          onClick={() => {
            WebViewTip.dialog({
              title: '我是标题',
              content: '我是内容',
              confirm: '去存钱',
              onConfirm: () => {
                WebViewTip.toast('我是确定，你点击了我')
              },
              onCancel: () => {
                WebViewTip.toast('取消取消取消')
              }
            })
          }}
        >
          成功弹出弹窗，且按钮名称为“取消”、“去存钱”
        </div>

        <div
          className="u-btn"
          onClick={() => {
            WebViewTip.dialog({
              title: '我是标题',
              content: '我是内容',
              cancel: '再看一哈',
              onConfirm: () => {
                WebViewTip.toast('我是确定，你点击了我')
              },
              onCancel: () => {
                WebViewTip.toast('取消取消取消')
              }
            })
          }}
        >
          成功弹出弹窗，且按钮名称为“再看一哈”、“确定”
        </div>

        <div
          className="u-btn"
          onClick={() => {
            WebViewTip.dialog({
              title: '我是标题',
              content: '我是内容',
              cancel: '再看一哈',
              confirm: '去存钱',
              onConfirm: () => {
                WebViewTip.toast('我是确定，你点击了我')
              },
              onCancel: () => {
                WebViewTip.toast('取消取消取消')
              }
            })
          }}
        >
          成功弹出弹窗，且按钮名称为“再看一哈”、“去存钱”
        </div>
      </div>
    )
  }
}

ReactDOM.render(<ToastDemo />, document.getElementById('container'))
