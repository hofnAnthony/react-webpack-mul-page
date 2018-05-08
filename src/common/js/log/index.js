
/**
 * 事件统计信息
 * eg: 统计分享次数，点击次数
 * @param {string} action  功能
 * @param {string} categary 分类
 * @param {string} desc 描述
 */
export const event = (action, categary, desc) => {
  window._hmt && window._hmt.push(['_trackEvent', categary, action, desc])
  window._log && window._log.event(action, `${categary}-${desc}`)
}

/**
 * 统计页面相关信息，数据放在对象里面
 * eg: page({loadTime:'100ms',isLogin:true})
 * eg: page('自定义页面信息')
 * @param {any} info
 */
export const page = (info) => {
  window._log && window._log.page(info)
}

/**
 * 收集错误信息
 * eg: error('404-not-found')
 * eg: error('该用户不是新用户')
 * @param {string} infoStr 错误信息
 */
export const error = (infoStr) => {
  window._log && window._log.error(infoStr)
}
