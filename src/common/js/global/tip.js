/**
  暂时不做web的封装，因为直接使用HTML5的弹窗会方便点，不用做web和客户端的兼容。【暂不推荐使用,除非只是客户端展示的页面】

  时间：2018-03-07 15:56:46
  1.显示toast
  gh://toast?msg=提示消息&t=3(单位秒可选)
  2.显示loading
  gh://loading?msg=提示消息(可选)
  3.关闭loading
  gh://loading/hide
  4.显示弹框
  gh://dialog?tag=1(弹框编号)&title=提示标题&content=提示内容&cancel=取消(可选)&confirm=确定(可选)。
  前端需要实现对应的回调
  onCancel1() , onConfirm1()
  onCancel2() , onConfirm2()
  ...根据tag的值依次类推
*/
import { urlParam } from '../utils'

const URLS = {
  TOAST: 'gh://toast',
  LOADING: 'gh://loading',
  HIDE: 'gh://loading/hide',
  DIALOG: 'gh://dialog'
}

/**
 * Toast
 * @param {string} msg Toast内容
 * @param {number} duration 显示时间
 */
export const toast = (msg, duration = 3) => {
  window.location.href = `${URLS.TOAST}?msg=${msg}&t=${duration}`
}

/**
 * Loading
 * @param {string} msg Loading内容
 */
export const loading = (msg = '') => {
  window.location.href = `${URLS.LOADING}?msg=${msg}`
}

/**
 * 隐藏Loading
 */
export const hide = () => {
  window.location.href = URLS.HIDE
}

/**
 * 弹窗
 * title, content, confirm, cancle , tag
 * title: 标题
 * content: 内容
 * confirm： 确定按钮文案
 * cancle: 取消按钮文案
 * tag： 调用回调的标识  eg:tag=1 => onCancle1, onConfirm1
 */
export const dialog = (options) => {
  const { onCancel, onConfirm, ...info } = options
  info.tag = info.tag || 1
  window['onCancel' + info.tag] = onCancel || function () { }
  window['onConfirm' + info.tag] = onConfirm || function () { }
  window.location.href = `${URLS.DIALOG}?${urlParam(info)}`
}

export default {
  toast, loading, hide, dialog
}
