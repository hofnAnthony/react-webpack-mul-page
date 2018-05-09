import queryString from './queryString.js'
import * as UA from './ua.js'

const uuid = (len, radix) => {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  let i
  radix = radix || chars.length

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    let r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

// 是否为本地开发
const isDev = () => {
  if (window.location.href.indexOf('localhost') !== -1 || window.location.href.indexOf('192.168') !== -1) {
    return true
  }
  return false
}

/**
 * 把对象变成字符串
 * eg: {name:'11',age:18}  => 'name=11&age=18'
 * @param {object} data
 */
const urlParam = data => {
  let paramStr = ''
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      paramStr += `${key}=${encodeURIComponent(data[key])}&`
    }
  }
  return paramStr.substr(0, paramStr.length - 1)
}

/**
 * 把数字转换成带千位浮的字符串
 * @param  {number} number 需要转换的数字
 * formatNum(1000)  // 1,000
 * formatNum(1000,'-') // 1-000
 */
const formatNum = (number, thousand) => {
  number = number || 0
  thousand = thousand || ','
  let i, j
  let negative = number < 0 ? '-' : ''
  i = parseInt((number = Math.abs(+number || 0)), 10) + ''
  j = (j = i.length) > 3 ? j % 3 : 0
  return negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand)
}

export { queryString, uuid, formatNum, isDev, urlParam, UA }
