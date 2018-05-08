function queryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)

  if (r != null) {
    return decodeURI(r[2])
  }
  return ''
}

// 获取地址上的所有参数
export function urlParam() {
  return window.location.search.substr(1)
}

export default queryString
