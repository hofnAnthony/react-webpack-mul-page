/**
 * 采用事件委托和配置样式、属性的方式，快速完成百度事件统计的功能
 *
 * 使用方法：
 * 1. 给 body 添加  u-baidu-statistics 样式
 * 2. 给需要添加点击统计的按钮添加上样式 u-baidu-statistics__event
 * 3. 如果需要自定义上传的信息，则配置这三个参数
 *    data-baidu-category 类别   default: DOM 标签内的文字
 *    data-baidu-action   交互动作   default : click
 *    data-baidu-desc     描述      default : 页面地址
 */
import { event } from '../log'

const BAIDU_STATISTICS_CLASSNAME = 'u-baidu-statistics'
const BAIDU_STATISTICS_EVENT_CLASSNAME = 'u-baidu-statistics__event'

window.onload = () => {
  let domContainer = document.querySelector(`.${BAIDU_STATISTICS_CLASSNAME}`)
  if (domContainer) {
    domContainer.addEventListener('click', (e) => {
      if (window._hmt) {
        let tar = e.target
        // svg 的 className 是一个数组，会报错
        if (tar.className.indexOf && tar.className.indexOf(BAIDU_STATISTICS_EVENT_CLASSNAME) !== -1) {
          // 要监控的目标类型名称
          let categoay = tar.getAttribute('data-baidu-category') || tar.innerText || ''
          // 交互动作名称
          let action = tar.getAttribute('data-baidu-action') || 'click'
          // 备注信息
          let opt_label = tar.getAttribute('data-baidu-desc') || window.location.href

          event(action, categoay, opt_label)
        }
      }
    })
  }
}
