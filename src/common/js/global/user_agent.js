/**
 * 获取手机系统和浏览器类型
 */
const BROWSER = {
  versions: getVersions(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

export default BROWSER

function getVersions() {
  const u = navigator.userAgent
  return {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
    qq: u.match(/\sQQ/i) === ' qq', // 是否QQ
    guihua: u.indexOf('Guihua') !== -1, // 是否为好规划
    tailicai: u.indexOf('talicai') !== -1 // 是否为好规划
  }
}

export function guihuaVersion() {
  const u = navigator.userAgent
  return u.split('Guihua/')[1]
}

export function isGuiHua() {
  return BROWSER.versions.guihua
}

export function isTalicai() {
  return BROWSER.versions.tailicai
}

export function isWeiXin() {
  return BROWSER.versions.weixin
}

export function isQQ() {
  return BROWSER.versions.qq
}

export function isIOS() {
  return BROWSER.versions.iPhone
}

export function isAndroid() {
  return BROWSER.versions.android
}

export function isiPad() {
  return BROWSER.versions.iPad
}

export function isMobile() {
  return BROWSER.versions.mobile
}

/**
 * 比较版本号 ，大于等于返回 true
 * @param {string} version1  版本1
 * @param {string} version2  版本2
 */
export function compareVersion(version1, version2) {
  version1 = version1.split('.')
  version2 = version2.split('.')
  if (parseInt(version1[0], 10) > parseInt(version2[0], 10)) {
    return true
  } else if (parseInt(version1[0], 10) < parseInt(version2[0], 10)) {
    return false
  } else {
    if (parseInt(version1[1], 10) > parseInt(version2[1], 10)) {
      return true
    } else if (parseInt(version1[1], 10) < parseInt(version2[1], 10)) {
      return false
    } else {
      if (parseInt(version1[2], 10) > parseInt(version2[2], 10)) {
        return true
      } else if (parseInt(version1[2], 10) < parseInt(version2[2], 10)) {
        return false
      }
    }
  }
  return true
}
