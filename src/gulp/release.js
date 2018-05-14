/**
 * 主要任务
 * 1. 构建出线上版本代码
 * 2. 生成文件的hash值
 * 3. 替换代码中使用 {{{xxx}}} 的资源文件路径，改成带有hash值的文件路径
 * 4. 配置了七牛的key，则把文件上传到七牛，并且删除已上传的文件
 */

var rev = require('gulp-rev')
var gulp = require('gulp')
var replace = require('gulp-replace')
var del = require('del')
var qiniu = require('gulp-qiniu')
var fs = require('fs')

// 使用上传七牛后的资源
function replaceFunc(match, p1) {
  var manifest = require(global.MANIFEST)
  return global.DIST_DIR + manifest[p1]
}

// 使用本地的资源
function relativeReplaceFunc(match, p1) {
  var manifest = require(global.MANIFEST)
  return global.DIST_DIR_RELATIVE + manifest[p1]
}

// 设置为prod环境
gulp.task('set-release', function() {
  global.is_production = true
  process.env.NODE_ENV = 'production'
})

// 打包prod版本的代码
gulp.task(
  'release-js',
  [
    'webpack-js',
    'webpack-css',
    'build-npm-file',
    'base-js',
    'build-img',
    'build-html',
    'build-pug',
    'build-server-pug',
    'build-common-pug'
  ],
  function() {
    return gulp.src(['static/build/**/*.js', '!static/build/**/*.min.js']).pipe(gulp.dest('static/build'))
  }
)

// 根据文件生成hash码
gulp.task('release-rev', ['release-js'], function() {
  return gulp
    .src(
      [
        'static/build/**/*.css',
        'static/build/**/*.js',
        'static/build/**/*.+(png|gif|jpg|eot|woff|ttf|otf|svg|ico)',
        'static/build/**/*.+(mp3|ogg|wav)'
      ],
      { base: './static/build' }
    )
    .pipe(gulp.dest('static/build/'))
    .pipe(rev())
    .pipe(gulp.dest('static/dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('static'))
})

// 给 css ， js 文件 添加上 hash值
gulp.task('css-js-replace', ['release-rev'], function() {
  return gulp
    .src(['static/dist/**/*.css', 'static/dist/**/*.js'])
    .pipe(replace(global.REGEX_RELATIVE, relativeReplaceFunc))
    .pipe(replace(global.REGEX, replaceFunc))
    .pipe(gulp.dest('static/dist'))
})

// 给 html，jsp，pug 文件引用的资源文件添加hash值
gulp.task('html-replace', ['css-js-replace'], function() {
  return gulp
    .src('static/build/**/*.+(html|jsp|pug)')
    .pipe(replace(global.REGEX, replaceFunc))
    .pipe(gulp.dest('static'))
})

gulp.task('release', ['set-release', 'html-replace'], function(cb) {
  del(['static/build', 'static/dist/webpack'], cb)
  // 上传七牛
  if (global.AK && global.SK) {
    return gulp.src('static/dist/**').pipe(
      qiniu(
        {
          accessKey: global.AK,
          secretKey: global.SK,
          bucket: 'guihua-assets'
        },
        { dir: '/' }
      )
    )
  } else {
    return gulp.src('')
  }
})
