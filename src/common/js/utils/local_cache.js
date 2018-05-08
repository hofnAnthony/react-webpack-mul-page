/**
 * @author zhongxia
 * @time   2017-10-10 11:27:10
 * 本地缓存工具栏
 * 不支持 localStorage 则使用 cooke 来进行保存
 */

export default {
  isLocalStorage: (() => { // 是否支持localStorage
    if (window.localStorage) {
      return true
    } else {
      return false
    }
  })(),

  set(key, value) { // 设置缓存
    if (this.isLocalStorage) {
      window.localStorage.setItem(key, value)
    } else {
      let expireDays = 365 // 失效时间
      let exDate = new Date()
      exDate.setTime(exDate.getTime() + expireDays * 24 * 60 * 60 * 1000)
      document.cookie = key + '=' + escape(value) + ';expires=' + exDate.toGMTString()
    }
  },

  get(key) { // 读取缓存
    if (this.isLocalStorage) {
      return window.localStorage.getItem(key)
    } else {
      let arr
      let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
      arr = document.cookie.match(reg)
      if (arr) {
        return unescape(arr[2])
      } else {
        return null
      }
    }
  },

  del(key) { // 删除缓存
    if (this.isLocalStorage) {
      localStorage.removeItem(key)
    } else {
      let exDate = new Date()
      exDate.setTime(exDate.getTime() - 1)
      let read_val = this.read(key)
      if (read_val != null) document.cookie = key + '=' + read_val + ';expires=' + exDate.toGMTString()
    }
  },

  getAndDel(key) { // 读取并删除缓存
    let val = this.get(key)
    this.del(key)
    return val
  }
}
