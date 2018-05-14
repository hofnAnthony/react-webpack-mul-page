var reqdir = require('require-dir')

// 匹配绝对路径资源的标识
global.REGEX = /\{\{\{(\S*?)\}\}\}/g

// 匹配相对路径资源的标识
global.REGEX_RELATIVE = /\{\{\#\{(\S*?)\}\}\}/g

// 匹配符替换的路径
global.REG_BUILD = '/build/$1'

// 文件hash值的的键值对文件
global.MANIFEST = __dirname + '/static/rev-manifest.json'

// 部署后的文件路径
global.DIST_DIR_RELATIVE = '/dist/'
global.DIST_DIR = JSON.parse(process.env.SOLAR_ASSETS_QINIU_URL || '"/dist/"')

// 七牛的KEY
global.AK = JSON.parse(process.env.SOLAR_QINIU_AK || null)
global.SK = JSON.parse(process.env.SOLAR_QINIU_SK || null)

// 图片文件路径
global.IMG_FILE = [
  'src/**/*.+(png|gif|jpg|eot|woff|ttf|otf|svg|ico)',
  '!src/old/**/*.+(png|gif|jpg|eot|woff|ttf|otf|svg|ico)',
  '!src/common/**/*.+(png|gif|jpg|eot|woff|ttf|otf|svg|ico)'
]

// 静态资源已上传到七牛，因此删除一些无用的静态资源
global.GULP_DEL_DIST_FILE = JSON.parse(process.env.GULP_DEL_DIST_FILE || false)

reqdir('./src/gulp/')
