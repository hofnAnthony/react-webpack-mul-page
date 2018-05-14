/**
 * 该文件主要内容
 * 1. 构建 HTML，CSS，JS，图片，第三方库的资源文件，服务端渲染使用的pug文件
 * 2. 启动 BrowserSync 服务器，支持修改代码，自动刷新页面
 */
var gulp = require('gulp')
var replace = require('gulp-replace')
var include = require('gulp-include')
var gulpif = require('gulp-if')
var cache = require('gulp-cached')
var pug = require('gulp-pug')
var notify = require('gulp-notify')
var svginline = require('./svginline')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload

var REGEX = global.REGEX
var REGEX_RELATIVE = global.REGEX_RELATIVE
var REG_BUILD = global.REG_BUILD
var IMG_FILE = global.IMG_FILE

// 静态服务器 + 监听 html,css,js 文件
gulp.task('serve', ['webpack-js', 'base-js', 'build-html', 'build-pug', 'build-server-pug', 'build-img'], function() {
  // 根据环境来判断是否采用 nodejs 来启动
  if (process.env.SOLAR_FE_NODEJS) {
    browserSync.init({
      proxy: 'http://127.0.0.1:29999',
      port: 10000,
      open: true,
      notify: false,
      logLevel: 'silent'
    })
  } else {
    browserSync.init({
      port: 10000,
      server: 'static',
      open: true,
      notify: false,
      logLevel: 'silent'
    })
  }
})

// 第三方依赖包复制到构建后的文件夹里面
gulp.task('base-dist-js', function() {
  return gulp
    .src('src/common/js/dist/*.js')
    .pipe(include())
    .pipe(gulp.dest('static/build/common/js/dist'))
})

// 不需要打包的依赖包，复制到构建后的文件夹里面
gulp.task('base-js', ['base-dist-js'], function() {
  return gulp
    .src('src/common/js/lib/*.js')
    .pipe(include())
    .pipe(gulp.dest('static/build/common/js/lib'))
})

// 图片资源文件，复制到构建文件夹里面
gulp.task('build-img', function() {
  return gulp
    .src(IMG_FILE)
    .pipe(gulpif(!global.is_production, cache()))
    .pipe(gulp.dest('static/build'))
    .pipe(gulpif(!global.is_production, reload({ stream: true })))
})

// 构建pug
gulp.task('build-pug', function() {
  return gulp
    .src(['src/h5/**/*.pug'])
    .pipe(
      pug({ pretty: true }).on(
        'error',
        notify.onError(error => {
          return `pug went wrong, ${error}`
        })
      )
    )
    .pipe(gulpif(!global.is_production, cache()))
    .pipe(svginline({ basePath: './src' }))
    .pipe(gulpif(!global.is_production, replace(REGEX, REG_BUILD)))
    .pipe(gulpif(!global.is_production, gulp.dest('static/h5'), gulp.dest('static/build/h5')))
    .pipe(gulpif(!global.is_production, reload({ stream: true })))
})

// 构建服务端pug，支持使用服务端渲染
gulp.task('build-server-pug', ['build-common-pug'], function() {
  return gulp
    .src(['src/h5/**/*.pug'])
    .pipe(gulpif(!global.is_production, cache()))
    .pipe(svginline({ basePath: './src' }))
    .pipe(gulpif(!global.is_production, replace(REGEX, REG_BUILD)))
    .pipe(gulpif(!global.is_production, gulp.dest('static/views'), gulp.dest('static/build/views')))
    .pipe(gulpif(!global.is_production, reload({ stream: true })))
})

// pug的模板文件，复制到构建包
gulp.task('build-common-pug', function() {
  return gulp
    .src(['src/common/**/*.pug'])
    .pipe(gulpif(!global.is_production, cache()))
    .pipe(svginline({ basePath: './src' }))
    .pipe(gulpif(!global.is_production, replace(REGEX, REG_BUILD)))
    .pipe(gulpif(!global.is_production, gulp.dest('static/common'), gulp.dest('static/build/common')))
    .pipe(gulpif(!global.is_production, reload({ stream: true })))
})

// 构建html
gulp.task('build-html', function() {
  return gulp
    .src(['src/h5/**/*.html'])
    .pipe(gulpif(!global.is_production, cache()))
    .pipe(svginline({ basePath: './src' }))
    .pipe(gulpif(!global.is_production, replace(REGEX, REG_BUILD)))
    .pipe(gulpif(!global.is_production, gulp.dest('static/h5'), gulp.dest('static/build/h5')))
    .pipe(gulpif(!global.is_production, reload({ stream: true })))
})

// 使用webpack构建js
gulp.task('webpack-js', function() {
  return gulp
    .src('static/build/webpack/**/*.js')
    .pipe(gulpif(!global.is_production, cache()))
    .pipe(svginline({ basePath: './src' }))
    .pipe(gulpif(!global.is_production, replace(REGEX_RELATIVE, REG_BUILD)))
    .pipe(gulpif(!global.is_production, replace(REGEX, REG_BUILD)))
    .pipe(gulp.dest('static/build'))
    .pipe(gulpif(!global.is_production, reload({ stream: true })))
})

// js中引用第三方组件库，组件库里面的资源，打包出来
gulp.task('build-npm-file', function() {
  return gulp
    .src('static/build/webpack/**/*.+(png|gif|jpg|eot|woff|ttf|otf|svg|ico)')
    .pipe(gulpif(!global.is_production, cache()))
    .pipe(gulp.dest('static'))
    .pipe(gulpif(!global.is_production, reload({ stream: true })))
})

// webpack构建css
gulp.task('webpack-css', function() {
  return gulp
    .src('static/build/webpack/**/*.css')
    .pipe(gulpif(!global.is_production, cache()))
    .pipe(gulpif(!global.is_production, replace(REGEX_RELATIVE, REG_BUILD)))
    .pipe(gulpif(!global.is_production, replace(REGEX, REG_BUILD)))
    .pipe(gulp.dest('static/build'))
    .pipe(gulpif(!global.is_production, reload({ stream: true })))
})
