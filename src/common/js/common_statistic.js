import queryString from './utils/queryString'
import './mods/baidu_statistic.js'
import './mods/add_event_statistic.js'
import './mods/raven.js'

function setCookie(name, value) {
  let Days = 365
  let exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${escape(value)};path=/;expires=${exp.toGMTString()}`
}

let ch = queryString('ch')
if (ch) {
  setCookie('channel', ch)
}
