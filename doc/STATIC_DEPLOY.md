# 部署静态文件方式

纯静态站点的部署方式。

1.  前端开发完成，做一次 eslint 验证代码规范【git commit 会自动先验证】
2.  验证通过，则上传到仓库中
3.  如果分支为 master 或者 dev 打头的分支，会自动执行打包功能(eg:dev-planing-book,dev-dmeo...)
4.  Pipeline 自动 打包构建
5.  下载 pipleline 生成的构建代码包
6.  上传到服务器
7.  部署完成

## 如何上传到服务器

如果有服务器权限，则使用 scp 或者 rsync 上传文件

```bash
#scp -r -i ../id_rsa_rsync static/ username@umbriel.lcgc.net:/srv/project-name/
rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i ../id_rsa" --progress static username@umbriel.lcgc.net:/srv/project-name/
```
