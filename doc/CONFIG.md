# webpack 及 gulp 配置

## 一、 webpack 配置说明

1.  公共配置信息存于`webpack.base.config.js`文件中
2.  根据环境不同(生产/开发)，在公共配置信息上增加特定环境配置。
3.  由于某些特定库(如`react/jquery`)并不会进行更新，因此将其单独打包成一个文件以供使用，其配置信息存于`webpack.vender.config.js`中。
4.  由于公共方法放于`common/js`目录下，引用起来较为繁琐，因此增加了别名以快速使用，以`common/js/share/index.js`为例，引用时使用`lcgc_share/index`即可，别名配置存于`webpack.base.config.js`中，将文件夹名添加至数组即可

## 二、 gulp 配置说明

### 1. gulp 配置存于`gulpconfig.json`文件中，用于直观查看任务

```javascript
  {
    // 基础任务，被多个任务依赖的任务请放于此处
  "base": { // 对应 src/gulp 目录下的文件名
    "desc": "基础任务", // 命令的描述信息
    "task": [ // 命令内包含的任务
      {
        "name": "base-dist-js",
        "desc": "把第三方依赖包复制到构建后的文件夹里面",
        "funcName": "gulpBaseDistJs"
      },
      {
        "name": "base-js", // 任务名
        "desc": "把不需要打包的依赖包，复制到构建后的文件夹里面", // 任务描述
        "deps": ["base-dist-js"], // 任务的前置依赖任务
        "funcName": "gulpBaseJs" // 任务执行的函数名(可省略)
      },
    ]
  },
  "clean_dist": {
    "desc": "清除上传七牛的静态资源文件",
    "path": "clean.js", // 命令对应文件的名(文件请存于 src/gulp 下，可省略，默认取命令名)
    "task": [
      {
        "name": "clean_dist",
      }
    ]
  },
}
```

### 2. 工作流说明

以执行`gulp dev`为例:

1.  寻找`src/gulp`目录下的`dev.js` 文件(若指定文件名则寻找该文件名对应文件)
2.  将配置中`dev`对应的`task`列表任务均加入工作流中
3.  执行 `dev`任务

### 3. 快速添加任务

以在`gulp dev`中添加任务为例:

1. 在`gulpconfig.json`中找到`dev`，并且在`task`列表中增加一个配置项
2. 将该任务的执行函数添加于`src/gulp/dev.js`中，并且导出即可

### 4. 注意事项

1.  配置文件中需要有一个任务的名称与命令一致，如执行`gulp dev`时需要在`dev`配置项中配置一个名称为`dev`的任务
2.  任务所对应的函数名可以指定，亦可忽略，若忽略则为驼峰形式展示，如`clean_dist`的默认执行函数名为`gulpCleanDist`(支持`_`及 `-`连接多个单词)
3.  命令对应寻找的文件名可以执行， 亦可忽略，若忽略则与命令名相同，如`gulp dev`则会将引入`src/gulp/dev.js`
4. `base`配置项内的任务会自动导入，无需进行额外操作
5. 公用常量存于`src/gulp/const.js`文件内

### 5. 待优化

1. `task`配置项支持纯字符串数组
2. 优化链式依赖任务配置
3. 继续抽取常量
