var gulp = require('gulp')
var configName = process.argv[2]
var config = require('./gulpconfig.json')
var basePath = './src/gulp/'
require(basePath + 'const') // 全局常量
var baseList = config.base.task
var taskList = config[configName].task
taskList = [...taskList, ...baseList]

var baseFunc = require(basePath + 'base.js')
var taskPath
if (config[configName].path) {
  taskPath = basePath + config[configName].path
} else {
  taskPath = basePath + configName + '.js'
}

var taskFunc = require(taskPath)
var taskFuncObj = Object.assign(baseFunc, taskFunc)

function transFuncName(taskName) {
  var reg = /[-_](\w)/g
  taskName = taskName.charAt(0).toUpperCase() + taskName.slice(1)
  return 'gulp' + taskName.replace(reg, function(all, letter) {
    return letter.toUpperCase()
  })
}

function batchTask(list) {
  var task
  var func
  for (var i = 0; i < list.length; i++) {
    task = list[i]
    task.deps = task.deps || []

    if (task.funcName !== undefined) {
      func = taskFuncObj[task.funcName]
    } else {
      func = taskFuncObj[transFuncName(task)]
    }

    gulp.task(task.name, task.deps, func)
  }
}

batchTask(taskList)
