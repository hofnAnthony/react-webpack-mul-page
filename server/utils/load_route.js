/**
 * 2018-02-23 16:42:06
 * 动态遍历目录加载路由工具
 */
const fs = require("fs");
// 动态路由
const loadRoute = {
  path: './routes/',
  app: null,
  // 遍历目录
  listDir: function (dir) {
    const fileList = fs.readdirSync(dir, 'utf-8');
    for (let i = 0; i < fileList.length; i++) {
      const stat = fs.lstatSync(dir + fileList[i]);
      // 是目录，需要继续
      if (stat.isDirectory()) {
        this.listDir(dir + fileList[i] + '/');
      } else {
        this.loadRoute(dir + fileList[i]);
      }
    }
  },
  // 加载路由
  loadRoute: function (routeFile) {
    const route = require(routeFile.substring(0, routeFile.lastIndexOf('.')));
    // 在路由文件中定义了一个basePath变量，设置路由路径前缀
    if (route.basePath) {
      this.app.use(route.routes(), route.allowedMethods());
    } else {
      this.app.use(route.routes());
    }
  },
  // 初始化入口
  init: function (app, path) {
    if (!app) {
      console.error("系统主参数App未设置");
      return false;
    }
    this.app = app;
    this.path = path ? path : this.path;
    this.listDir(this.path);
  }
};

module.exports = loadRoute;
