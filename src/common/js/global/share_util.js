import GH_APP from './gh_app.js'
import * as API from './api.js'
import { isGuiHua } from './user_agent.js'

/**
 * 设置分享信息
 * @param {object} shareInfo
 * @param {boolean} [weixinShare=true]
 * @param {boolean} [guihuaShare=true]
 */
export function setShare(shareInfo, weixinShare = true, guihuaShare = true) {
  if (weixinShare && wx) {
    API.getWxConfig(config => {
      let desc = {
        title: shareInfo.title,
        desc: shareInfo.desc,
        link: shareInfo.url,
        imgUrl: shareInfo.imgUrl
      }
      if (shareInfo.success) {
        desc.success = shareInfo.success
      }
      wx.config(config)
      wx.ready(function() {
        wx.onMenuShareAppMessage(desc)
        wx.onMenuShareTimeline(desc)
        wx.onMenuShareQQ(desc)
      })
    })
  }

  if (guihuaShare) {
    GH_APP.setShareInfo(shareInfo)
  }
}

/**
 * 点击按钮，弹出分享
 * @export
 * @param {any} shareInfo  分享信息
 */
export function openShare(shareInfo) {
  shareInfo = shareInfo || {}
  if (isGuiHua()) {
    GH_APP.openShare(shareInfo)
  } else {
    showShareTip()
  }
}

/**
 * 点击按钮，分享图片
 * @export
 * @param {any} shareInfo  分享信息
 */
export function openSharePic(shareInfo) {
  shareInfo = shareInfo || {}
  if (isGuiHua()) {
    GH_APP.openSharePic(shareInfo)
  } else {
    // 目前场景在APP中使用，微信中暂无该场景
  }
}
