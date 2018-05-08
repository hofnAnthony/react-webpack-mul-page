import queryString from './queryString.js'
import localCache from './local_cache.js'
import uuid from './uuid.js'
import { formatNum } from './numformat.js'

// 是否为本地开发
const isDev = () => {
  if (window.location.href.indexOf('localhost') !== -1 || window.location.href.indexOf('192.168') !== -1) {
    return true
  }
  return false
}

const addParam2Url = (url, key, val) => {
  if (url.indexOf('?') === -1) {
    url += `?${key}=${val}`
  } else {
    url += `&${key}=${val}`
  }
  return url
}

/**
 * 如果当前页面有渠道信息，则自动传入到传入的 url 地址
 * @param {string} url
 */
const addCh2Url = (url) => {
  let ch = queryString('ch')
  if (ch) {
    url = addParam2Url(url, 'ch', ch)
  }
  return url
}

/**
 * 把对象变成字符串
 * eg: {name:'11',age:18}  => 'name=11&age=18'
 * @param {object} data
 */
const urlParam = (data) => {
  let paramStr = ''
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      paramStr += `${key}=${encodeURIComponent(data[key])}&`
    }
  }
  return paramStr.substr(0, paramStr.length - 1)
}

export {
  queryString,
  localCache,
  uuid,
  formatNum,
  isDev,
  addCh2Url,
  urlParam
}
