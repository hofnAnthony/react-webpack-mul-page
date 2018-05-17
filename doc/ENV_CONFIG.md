# gitlab 环境变量设置

有一些变量需要在 gitlab-ci 上进行配置, 比如七牛的地址，七牛的 ak，sk， 是否要删除已经上传七牛的资源文件。

## 配置环境变量

1.  找到配置环境变量页面：settings -> CI/CD -> Secret variables

2.  配置环境变量

```
GULP_DEL_DIST_FILE  => true
QINIU_URL => xxxxxxx
QINIU_AK => xxxxxxx
QINIU_SK => xxxxxxx
QINIU_BUCKET => xxxxx
```
