var path = require('path')

// 定义全局变量，正则及路径
global.REGEX = /{{{(\S*?)}}}/g
global.REGEX_RELATIVE = /{{#{(\S*?)}}}/g
global.REG_BUILD = '/build/$1'
global.REG_RELATIVE_BUILD = '/build/$1'
global.MANIFEST = path.resolve(__dirname, '../../static/rev-manifest.json')

global.SVG_REG = /[\s\S]*?<svg([\s\S]*?)>([\s\S]*?)<\/svg>/m
global.SVG_VIEWBOX_REG = /viewBox=['"]([\s\S]*?)['"]{1}?/m
global.SVG_WIDTH_REG = /width=['"]([\s\S]*?)['"]{1}?/m
global.SVG_HEIGHT_REG = /height=['"]([\s\S]*?)['"]{1}?/m
global.SVG_CLASS_REG = /\sclass=['"]([\s\S]*?)['"]{1}?/m

// 合并部署后，可能需要修改路径,使用全路径的方式，否则图片和字体文件找不到
global.DIST_DIR = JSON.parse(process.env.SOLAR_ASSETS_QINIU_URL || '"/dist/"')
global.DIST_DIR_RELATIVE = '/dist/'
global.AK = JSON.parse(process.env.SOLAR_QINIU_AK || null)
global.SK = JSON.parse(process.env.SOLAR_QINIU_SK || null)

// 静态资源已上传到七牛，因此删除一些无用的静态资源
global.GULP_DEL_DIST_FILE = JSON.parse(process.env.GULP_DEL_DIST_FILE || false)

global.IMG_FILE = [
  'src/**/*.+(png|gif|jpg|eot|woff|ttf|otf|svg|ico)',
  '!src/old/**/*.+(png|gif|jpg|eot|woff|ttf|otf|svg|ico)',
  '!src/common/**/*.+(png|gif|jpg|eot|woff|ttf|otf|svg|ico)'
]
global.NPM_FILE = 'static/webpack/**/*.+(png|gif|jpg|eot|woff|ttf|otf|svg|ico)'
global.AUDIO_FILE = ['src/**/*.+(ogg|mp3|wav)']
