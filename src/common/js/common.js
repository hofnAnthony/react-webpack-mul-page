/**
 * 该文件会先构建出来，放在common/js/dist目录下
 * 然后在html文件里面直接引用
 */
import 'babel-polyfill'
import queryString from './utils/queryString.js'
import jQuery from 'jquery/dist/jquery.min.js'
import React from 'react'
import ReactDOM from 'react-dom'

global.$ = jQuery
global.jQuery = jQuery
global.React = React
global.ReactDOM = ReactDOM

global.requestAnimationFrame =
  window.requestAnimationFrame ||
  (callback => {
    setTimeout(callback, 0)
  })

if (queryString('debug')) {
  if (jQuery) {
    jQuery.getScript('https://guihua-static.licaigc.com/lib/vconsole.min.js?v=3.0.0.0', () => {
      window.vConsole = new window.VConsole()
    })
  }
}
