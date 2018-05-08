/**
 * 线上和预发布环境添加Sentry的错误统计
 */

import Raven from 'raven-js'
global.Raven = Raven

if (window.location.href.indexOf('guihua.com') !== -1) {
  Raven.config('https://61482b3d319d4c738df1f4da492eb538@sentry.lcgc.work/15').install()
}
