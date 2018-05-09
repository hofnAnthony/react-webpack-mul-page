/* global WEIXIN_CONFIG:false */
/**
 * 通用的一些接口，支持使用 Promise 的方式和回调的方式来进行调用
 */

import Axios from 'axios'
import { API_URL } from '../const'

// 避免影响其他使用 Axios的全局拦截
const instance = Axios.create()
instance.interceptors.response.use(resp => resp.data.data)

/**
 * 是否登录
 */
export const isLogin = cb => {
  return instance.get(API_URL.IS_LOGIN)
}

/**
 * 获取微信的分享配置参数
 * 如果常量里面有值，直接返回，没有的话，则去接口请求
 */
export const getWxConfig = cb => {
  if (typeof WEIXIN_CONFIG !== 'undefined') {
    return new Promise((resolve, reject) => {
      resolve(WEIXIN_CONFIG || {})
    })
  } else {
    return instance.get(API_URL.GET_WXCONFIG, {
      params: { url: encodeURIComponent(window.location.href.split('#')[0]) }
    })
  }
}

/**
 * 获取微信的分享配置参数
 */
export const getWxUserInfo = cb => {
  return instance.get(API_URL.GET_WXUSERINFO)
}
