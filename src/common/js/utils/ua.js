const UA = (() => {
  const u = navigator.userAgent
  return {
    // 是否为移动终端
    mobile: !!u.match(/AppleWebKit.*Mobile.*/),
    // ios终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    // android终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
    // 是否iPad
    iPad: u.indexOf('iPad') > -1,
    // 是否微信 （2015-01-22新增）
    weixin: u.indexOf('MicroMessenger') > -1,
    // 是否QQ
    qq: u.match(/\sQQ/i) === ' qq',
    // 是否为好规划
    guihua: u.toLowerCase().indexOf('guihua') !== -1,
    // 是否为她理财
    tailicai: u.toLowerCase().indexOf('talicai') !== -1,
    // 是否为timi
    timi: u.toLowerCase().indexOf('timi') !== -1,
    // 是否为基金豆
    jijindou: u.toLowerCase().indexOf('fund') !== -1
  }
})()

export const guihuaVersion = () => {
  const u = navigator.userAgent
  return u.toLowerCase().split('guihua/')[1]
}

export const talicaiVersion = () => {
  const u = navigator.userAgent
  return u.toLowerCase().split('talicai/')[1]
}

export const timiVersion = () => {
  const u = navigator.userAgent
  return u.toLowerCase().split('timi/')[1]
}

export const jijindouVersion = () => {
  const u = navigator.userAgent
  return u.toLowerCase().split('fund/')[1]
}

export const isGuiHua = () => {
  return UA.guihua
}

export const isTalicai = () => {
  return UA.tailicai
}

export const isTimi = () => {
  return UA.timi
}

export const isJijindou = () => {
  return UA.jijindou
}

export const isGuihuaWeb = () => {
  if (window.location.href.indexOf('guihua.com') !== -1 || window.location.href.indexOf('haoguihua.cn') !== -1) {
    return true
  }
  return false
}

export const isTalicaiWeb = () => {
  if (window.location.href.indexOf('talicai.com') !== -1) {
    return true
  }
  return false
}

export const isTimiWeb = () => {
  if (window.location.href.indexOf('timitime.com') !== -1) {
    return true
  }
  return false
}

export const isJijindouWeb = () => {
  if (window.location.href.indexOf('jijindou.com') !== -1) {
    return true
  }
  return false
}

// 如果不是好规划，她理财，Timi，基金豆 则认为不在 APP内
export const isWebView = () => {
  return isGuiHua() || isTalicai() || isTimi() || isJijindou()
}

export const isWeiXin = () => {
  return UA.weixin
}

export const isQQ = () => {
  return UA.qq
}

export const isIOS = () => {
  return UA.ios
}

export const isAndroid = () => {
  return UA.android
}

export const isiPad = () => {
  return UA.iPad
}

export const isMobile = () => {
  return UA.mobile
}

/**
 * 比较版本号 ，大于等于返回 true
 * compareVersion('3.7.0','3.1.2')  // return true
 * @param {string} version1  版本1
 * @param {string} version2  版本2
 */
export const compareVersion = (version1, version2) => {
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
