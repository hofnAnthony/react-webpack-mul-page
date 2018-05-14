/**
 * 1. 删除构建的文件夹
 * 2. 删除已上传七牛的资源文件
 */
var gulp = require('gulp')
var del = require('del')

gulp.task('clean', function(cb) {
  del(['static'], cb)
})

gulp.task('clean_dist', function(cb) {
  if (global.GULP_DEL_DIST_FILE) {
    console.log('remove dist files expect html file...')
    del(['static/dist/h5', 'static/common', 'static/dist/common', 'static/dist/webpack'], cb)
  }
})
