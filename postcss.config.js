/**
 * 2017-09-14 16:37:06
 * webpack1.x 只能配置在这边，或者使用 postcss-pxtoremrc
 * https://github.com/ant-design/ant-design-mobile/issues/298
 * donggw2030521 的回答（最后一个回答）
 *
 * 目前只针对JS里面的引用的样式会自动转换，styl目前不转换
 */
module.exports = {
  plugins: {
    autoprefixer: {
      remove: false,
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
    },
    /**
     * 这里只对Antd-mobile的样式进行自动px转rem
     */
    "postcss-pxtorem": {
      rootValue: 10,
      propWhiteList: []
    }
  }
}
