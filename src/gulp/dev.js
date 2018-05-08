var gulp = require('gulp')
var watch = require('gulp-watch')
var IMG_FILE = global.IMG_FILE

gulp.task(
  'dev',
  [
    'serve',
    'webpack-js',
    'base-js',
    'build-html',
    'build-pug',
    'build-server-pug',
    'build-img'
  ],
  function() {
    process.env.NODE_ENV = 'development'
    global.is_production = false

    watch('src/common/js/lib/*.js', function() {
      gulp.start('base-js')
    })

    watch('static/build/webpack/**/*.js', function() {
      gulp.start(['webpack-js', 'build-npm-file'])
    })

    watch('static/build/**/*.css', function() {
      gulp.start(['webpack-css'])
    })

    watch('src/**/*.html', function() {
      gulp.start('build-html')
    })

    watch('src/**/*.pug', function() {
      gulp.start('build-pug')
      gulp.start('build-server-pug')
    })

    watch(IMG_FILE, function() {
      gulp.start('build-img')
    })
  }
)
