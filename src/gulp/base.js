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
var REG_RELATIVE_BUILD = global.REG_RELATIVE_BUILD
var IMG_FILE = global.IMG_FILE

function gulpServe() {
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
}

function gulpBaseDistJs() {
  return gulp
    .src('src/common/js/dist/*.js')
    .pipe(include())
    .pipe(gulp.dest('static/build/common/js/dist'))
}


function gulpBaseJs() {
  return gulp
    .src('src/common/js/lib/*.js')
    .pipe(include())
    .pipe(gulp.dest('static/build/common/js/lib'))
}


function gulpBuildImg() {
  return gulp
    .src(IMG_FILE)
    .pipe(gulpif(!global.is_production, cache()))
    .pipe(gulp.dest('static/build'))
    .pipe(gulpif(!global.is_production, reload({ stream: true })))
}


function gulpBuildPug() {
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
    .pipe(
      gulpif(
        !global.is_production,
        gulp.dest('static/h5'),
        gulp.dest('static/build/h5')
      )
    )
    .pipe(gulpif(!global.is_production, reload({ stream: true })))
}


function gulpBuildServerPug() {
  return gulp
    .src(['src/h5/**/*.pug'])
    .pipe(gulpif(!global.is_production, cache()))
    .pipe(svginline({ basePath: './src' }))
    .pipe(gulpif(!global.is_production, replace(REGEX, REG_BUILD)))
    .pipe(
      gulpif(
        !global.is_production,
        gulp.dest('static/views'),
        gulp.dest('static/build/views')
      )
    )
    .pipe(gulpif(!global.is_production, reload({ stream: true })))
}


function gulpBuildCommonPug() {
  return gulp
    .src(['src/common/**/*.pug'])
    .pipe(gulpif(!global.is_production, cache()))
    .pipe(svginline({ basePath: './src' }))
    .pipe(gulpif(!global.is_production, replace(REGEX, REG_BUILD)))
    .pipe(
      gulpif(
        !global.is_production,
        gulp.dest('static/common'),
        gulp.dest('static/build/common')
      )
    )
    .pipe(gulpif(!global.is_production, reload({ stream: true })))
}


function gulpBuildHtml() {
  return gulp
    .src(['src/h5/**/*.html'])
    .pipe(gulpif(!global.is_production, cache()))
    .pipe(svginline({ basePath: './src' }))
    .pipe(gulpif(!global.is_production, replace(REGEX, REG_BUILD)))
    .pipe(
      gulpif(
        !global.is_production,
        gulp.dest('static/h5'),
        gulp.dest('static/build/h5')
      )
    )
    .pipe(gulpif(!global.is_production, reload({ stream: true })))
}


function gulpWebpackJs() {
  return gulp
    .src('static/build/webpack/**/*.js')
    .pipe(gulpif(!global.is_production, cache()))
    .pipe(svginline({ basePath: './src' }))
    .pipe(
      gulpif(!global.is_production, replace(REGEX_RELATIVE, REG_RELATIVE_BUILD))
    )
    .pipe(gulpif(!global.is_production, replace(REGEX, REG_BUILD)))
    .pipe(gulp.dest('static/build'))
    .pipe(gulpif(!global.is_production, reload({ stream: true })))
}


function gulpBuildNpmFile() {
  return gulp
    .src('static/build/webpack/**/*.+(png|gif|jpg|eot|woff|ttf|otf|svg|ico)')
    .pipe(gulpif(!global.is_production, cache()))
    .pipe(gulp.dest('static'))
    .pipe(gulpif(!global.is_production, reload({ stream: true })))
}


function gulpWebpackCss() {
  return gulp
    .src('static/build/webpack/**/*.css')
    .pipe(gulpif(!global.is_production, cache()))
    .pipe(
      gulpif(!global.is_production, replace(REGEX_RELATIVE, REG_RELATIVE_BUILD))
    )
    .pipe(gulpif(!global.is_production, replace(REGEX, REG_BUILD)))
    .pipe(gulp.dest('static/build'))
    .pipe(gulpif(!global.is_production, reload({ stream: true })))
}

module.exports = {
  gulpServe,
  gulpBaseJs,
  gulpBaseDistJs,
  gulpBuildImg,
  gulpBuildPug,
  gulpBuildServerPug,
  gulpBuildCommonPug,
  gulpBuildHtml,
  gulpWebpackJs,
  gulpWebpackCss,
  gulpBuildNpmFile
}
