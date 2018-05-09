function queryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)

  if (r != null) {
    return decodeURI(r[2])
  }
  return ''
}

export default queryString
