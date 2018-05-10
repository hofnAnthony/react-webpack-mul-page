var gulp = require('gulp')
var eslint = require('gulp-eslint')

function gulpEslint() {
  return gulp.src(['src/**/*.js',
    'src/**/*.jsx',
    '!node_modules/**',
    '!src/common/js/lib/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
}

module.exports = {
  gulpEslint
}
