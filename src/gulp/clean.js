var del = require('del')

function gulpClean(cb) {
  del(['static'], cb)
}

function gulpCleanDist(cb) {
  if (global.GULP_DEL_DIST_FILE) {
    console.log('remove dist files expect html file...')
    del(['static/dist/h5', 'static/common', 'static/dist/common'], cb)
  }
}

module.exports = {
  gulpClean,
  gulpCleanDist
}
