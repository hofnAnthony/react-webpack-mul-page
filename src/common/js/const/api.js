import { isDev, UA } from '../utils'
const { isGuiHua, isTalicai, isTimi, isJiJinDou } = UA

const API_URL_GUIHUA = {
  // 获取微信的token
  GET_WXCONFIG: '/j/utils/share',
  // 获取微信用户信息
  GET_WXUSERINFO: '/j/h5/share/weixin/mine',
  // 从接口获取是否登录
  IS_LOGIN: '/j/utils/is_login'
}

const API_URL_TALICAI = {
  // 获取微信的token
  GET_WXCONFIG: '/j/utils/share',
  // 获取微信用户信息
  GET_WXUSERINFO: '/j/h5/share/weixin/mine',
  // 从接口获取是否登录
  IS_LOGIN: '/j/utils/is_login'
}

const API_URL_TIMI = {
  // 获取微信的token
  GET_WXCONFIG: '/j/utils/share',
  // 获取微信用户信息
  GET_WXUSERINFO: '/j/h5/share/weixin/mine',
  // 从接口获取是否登录
  IS_LOGIN: '/j/utils/is_login'
}

const API_URL_JIJINDOU = {
  // 获取微信的token
  GET_WXCONFIG: '/j/utils/share',
  // 获取微信用户信息
  GET_WXUSERINFO: '/j/h5/share/weixin/mine',
  // 从接口获取是否登录
  IS_LOGIN: '/j/utils/is_login'
}

const addTestUrl = URLS => {
  const BASE_URL = 'http://www.haoguihua.cn'
  let newUrls = URLS
  if (isDev()) {
    for (const key in newUrls) {
      if (newUrls.hasOwnProperty(key)) {
        newUrls[key] = `${BASE_URL}${newUrls[key]}`
      }
    }
  }
  return newUrls
}

export default (() => {
  if (isGuiHua()) {
    return addTestUrl(API_URL_GUIHUA)
  }
  if (isTalicai()) {
    return addTestUrl(API_URL_TALICAI)
  }
  if (isTimi()) {
    return addTestUrl(API_URL_TIMI)
  }
  if (isJiJinDou()) {
    return addTestUrl(API_URL_JIJINDOU)
  }
  return addTestUrl(API_URL_GUIHUA)
})()
