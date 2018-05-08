/**
 * 该文件会先构建出来，放在common/js/dist目录下
 * 然后在html文件里面直接引用
 */
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

global.React = React
global.ReactDOM = ReactDOM
