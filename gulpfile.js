var reqdir = require('require-dir')

global.REGEX = /\{\{\{(\S*?)\}\}\}/g
global.REGEX_RELATIVE = /\{\{\#\{(\S*?)\}\}\}/g
global.REG_BUILD = '/build/$1'
global.REG_RELATIVE_BUILD = '/build/$1'
global.MANIFEST = __dirname + '/static/rev-manifest.json'

//合并部署后，可能需要修改路径,使用全路径的方式，否则图片和字体文件找不到
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


reqdir('./src/gulp/')
