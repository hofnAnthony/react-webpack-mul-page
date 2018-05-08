const mkdirp = require('mkdirp')
const _ = require('underscore')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const option = process.argv.slice(2)
const name = option[0]
const temp_type = option[1] || 'v1'

const copyFolder = function (srcDir, tarDir, cb) {
  fs.readdir(srcDir, function (err, files) {
    let count = 0
    let checkEnd = function () {
      ++count === files.length && cb && cb()
    }

    if (err) {
      checkEnd()
      return
    }

    files.forEach(function (file) {
      const srcPath = path.join(srcDir, file)
      const tarPath = path.join(tarDir, file)

      fs.stat(srcPath, function (err, stats) {
        if (err) {
          console.log(err)
          return
        }
        if (stats.isDirectory()) {
          if (fs.existsSync(tarPath)) {
            copyFolder(srcPath, tarPath, checkEnd)
          } else {
            fs.mkdir(tarPath, function (err) {
              if (err) {
                console.log(err)
                return
              }
              copyFolder(srcPath, tarPath, checkEnd)
            })
          }
        } else {
          if (name) {
            let context = {
              name: name
            }
            fs.writeFileSync(tarPath, _.template(fs.readFileSync(srcPath, 'utf8'))(context))
          }
        }
      })
    })
    // 为空时直接回调
    files.length === 0 && cb && cb()
  })
}

if (name) {
  let dir = path.join(__dirname, '../src/h5/' + name + '/')
  let template = path.join(__dirname, 'template/activity/' + temp_type + '/')

  if (fs.existsSync(dir)) {
    console.log(chalk.red('This directory is already existed'))
  } else {
    mkdirp.sync(dir)

    copyFolder(template, dir)

    console.log(chalk.green('Build success!'))
  }
} else {
  console.log(chalk.red('No component name provided, try `npm run create MyComponent` instead.'))
}
