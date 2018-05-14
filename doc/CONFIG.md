# webpack 及 gulp 配置

## 一、 webpack 配置说明

1.  公共配置信息存于`webpack.base.config.js`文件中
2.  根据环境不同(生产/开发)，在公共配置信息上增加特定环境配置。
3.  由于某些特定库(如`react/jquery`)并不会进行更新，因此将其单独打包成一个文件以供使用，其配置信息存于`webpack.vender.config.js`中。
4.  由于公共方法放于`common/js`目录下，引用起来较为繁琐，因此增加了别名以快速使用，以`common/js/share/index.js`为例，引用时使用`lcgc_share/index`即可，别名配置存于`webpack.base.config.js`中，将文件夹名添加至数组即可
