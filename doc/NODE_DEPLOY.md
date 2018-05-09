# 一、项目背景

没有加入 nodejs 中间层，存在一下问题

1.  客户端 webview 打开页面，登录信息放在 header 拿不到，每次访问接口需要先去后端接口，在跳转回来
2.  由于问题 1， 导致客户端返回上一个页面死循环，客户端做了相关支持

给项目添加了 nodejs 中间层，则解决了上面的主要问题外，还可以支持一序列 nodejs 中间层带来的好处，比如，跨域代理，nodejs 服务端渲染，nodejs 一序列的前端优化，等等

加入了 nodejs 中间层，部署方式则不能使用 nginx 直接做 web 服务器直接启动。

# 二、如何部署项目

部署 nodejs 需要 一个服务器。

然后采用 pm2 来对 nodejs 进行部署启动，[《pm2 官网，了解一下》](http://pm2.keymetrics.io/)

## 2.1 手动部署、步骤

```bash
# 进入服务器
ssh xxxx.xxx.com

# 第一次拉取所有代码，后续可以只拉取最新代码
git clone git@git.lcgc.work:guihua/solar-fe.git

# 安装依赖
npm install

# 构建前端代码
npm run build

# 启动项目
pm2 start server/bin/www -i max -n solar-fe

# 或者重启项目
pm2 reload solar-fe
```

## 2.2

pm2 自动部署

[《pm2 自动部署了解一下》](http://pm2.keymetrics.io/docs/usage/deployment/)

```json
// process.json:
{
  "apps": [
    {
      "name": "solar-fe",
      "script": "server/bin/www"
    }
  ],
  "deploy": {
    // "production" is the environment name
    "production": {
      "key": "/path/to/some.pem", // path to the public key to authenticate
      "user": "node", // user used to authenticate
      "host": "212.83.163.1", // where to connect
      "ref": "origin/master",
      "repo": "git@git.lcgc.work:guihua/solar-fe.git",
      "path": "/var/www/solar-fe/production",
      "post-deploy": "pm2 startOrRestart ecosystem.json --env production"
    }
  }
}
```
