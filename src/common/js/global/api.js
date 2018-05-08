/**
 * 通用的一些接口，支持使用 Promise 的方式和回调的方式来进行调用
 */

import Axios from 'axios'
import CONST from './const.js'

// 避免影响其他使用 Axios的全局拦截
const instance = Axios.create()
instance.interceptors.response.use(resp => resp.data.data)

/**
  读取接口判断是否登录
  // 回调的方式
  isLogin((loginState) => {
    console.log('isLogin', loginState);
  })

  // promise 的方式
  isLogin().then(loginState => {
    console.log('isLogin', loginState);
  })
 */
export const isLogin = (cb) => {
  return instance.get(CONST.URLS.IS_LOGIN_URL).then(data => {
    cb && cb(data)
    return data
  })
}

/**
 * 获取微信的分享配置参数
 */
export const getWxConfig = (cb) => {
  return instance.get(CONST.URLS.GET_WXCONFIG_URL, { params: { url: window.encodeURIComponent(window.location.href.split('#')[0]) } }).then(data => {
    cb && cb(JSON.parse(data || '{}'))
    return data
  })
}

/**
 * 获取规划总投资金额，收益金额，用户量
 */
export const getTotalData = (cb) => {
  return instance.get(CONST.URLS.TOTAL_DATA).then(data => {
    cb && cb(data)
    return data
  })
}
