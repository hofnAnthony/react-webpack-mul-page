# 快速上手

## 一、如何快速启动项目

```bash
# 下载代码
git clone 仓库地址

# 安装依赖
yarn install

# 生成公共依赖文件包[只需要第一次运行的时候执行，除非有改变公共依赖包，才需要重新打包]
npm run dll

# 开发环境启动
npm run dev

# 验证代码风格
npm run lint

# 验证代码风格，并修复简单不符合规范的地方
npm run lint -- --fix

# 生成部署文件
npm run release

# bingo！


# 看到这里，如果你需要采用nodejs中间件启动，看这里
npm run s-dev

# 就这么简单
```

## 二、如何开发呢？

大家都知道，前后端分离，因为接口不在本地开发机器，在后端同学们手上，因此访问接口的时候，会存在跨域。

跨域都是小问题，来吧，搞定它。

**提供两种方式**

### 2.1 用关闭浏览器安全沙箱解决跨域问题

采用 http 接口的方式，前端通过请求接口获取数据。开发时，前端直接请求后端人员的本地接口，或者约定好数据格式，然后模拟数据即可。请求接口，存在跨域问题，因此前端可以关闭浏览器的安全沙箱来解决该问题。

```bash
  # Mac 系统
  # chrome 浏览器
  open -a "Google Chrome" --args --disable-web-security  --user-data-dir
  # safari 浏览器
  open -a '/Applications/Safari.app' --args --disable-web-security --user-data-dir
```

如果是 window，或者 linux 系统，请参照[《关闭浏览器安全策略，解决开发时跨域问题》](http://www.cnblogs.com/zhongxia/p/5416024.html)

### 2.2 Node 代理启动项目

采用 nodejs 启动项目，自动把本地 /j/xxx 开头的 API 代理到 www.haoguihua.cn ,h5.haoguihua.cn 开发环境下[可自行配置]

```bash
npm run s-dev
```

如果还需要代理到其他服务器地址，可以自己在 server/app.js 里面添加
![image](/uploads/5bd1b5f204af1839c1b85e4ba15abe30/image.png)

这种方式存在一个问题，如果页面需要登录的话，需要在测试环境登录后，然后手动写入 cookie。 【目前没有找到好的解决方案】

## 三、快速创建一个新的活动模板

目前的模板完成一下操作

* 约定的目录结构
* 如何请求接口
* pug 模板
* 基本样式

```bash
npm run create activity_name template_type(可省略，默认为v1)
```
