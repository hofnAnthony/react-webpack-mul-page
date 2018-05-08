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

function deleteFolder(path) {
  var files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach(function(file, index) {
      var curPath = path + '/' + file
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        deleteFolder(curPath)
      } else {
        // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

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
    return gulp
      .src(['static/build/**/*.js', '!static/build/**/*.min.js'])
      .pipe(gulp.dest('static/build'))
  }
)

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

gulp.task('css-js-replace', ['release-rev'], function() {
  return gulp
    .src(['static/dist/**/*.css', 'static/dist/**/*.js'])
    .pipe(replace(global.REGEX_RELATIVE, relativeReplaceFunc))
    .pipe(replace(global.REGEX, replaceFunc))
    .pipe(gulp.dest('static/dist'))
})

gulp.task('html-replace', ['css-js-replace'], function() {
  return gulp
    .src('static/build/**/*.+(html|jsp|pug)')
    .pipe(replace(global.REGEX, replaceFunc))
    .pipe(gulp.dest('static'))
})

gulp.task('set-release', function() {
  global.is_production = true
  process.env.NODE_ENV = 'production'
})

gulp.task('release', ['set-release', 'html-replace'], function(cb) {
  del(['static/build'], cb)
  deleteFolder('static/dist/webpack')
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
