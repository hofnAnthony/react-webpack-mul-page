/**
 * TODO: 新增她理财，基金豆的分享功能
 * 抛出几个方法,传的参数否是shareInfo即可
 * 1. openShare       点击按钮触发分享
 * 2. openSharePic    分享图片
 * 3. setShareInfo    点击右上角分享按钮
 */

import { isGuiHua, isTalicai, isTimi, isJiJinDou } from '../../utils/ua.js'
import GuihuaShare from './guihua'
import TalicaiShare from './talicai'
import JijindouShare from './jijindou'
import TimiShare from './timi'

export default (() => {
  if (isGuiHua()) {
    // 好规划APP默认会从GH_APP变量获取分享信息
    window.GH_APP = GuihuaShare
    return GuihuaShare
  }
  if (isTalicai()) {
    return TalicaiShare
  }
  if (isTimi()) {
    return TimiShare
  }
  if (isJiJinDou()) {
    return JijindouShare
  }
})()
