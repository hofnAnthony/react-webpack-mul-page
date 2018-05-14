## 项目公共的方法

### 1. 通过模板自动生成活动目录

增加命令 `node run create` 根据 template 文件夹下模板自动生成活动目录结构，便于快速创建活动目录

```
npm run create activity_name template_type(可省略，默认为v1)
```

### 2. 设置分享信息

封装了获取 token 信息，以及设置分享信息（微信分享，规划分享,她理财分享，基金豆分享）

```javascript
import { setShare, openShare } from 'lcgc_share'

// 设置右上角分享按钮的分享信息，以及微信分享信息
// 参数：分享信息
setShare({
  title: '分享的标题测试',
  desc: '分享的描述测试',
  link: window.location.href,
  imgUrl: 'https://guihua-static.licaigc.com/dazhaxie.png'
})

// 规划 APP，点击按钮弹出分享的方法
openShare({
  title: '分享的标题测试',
  desc: '分享的描述测试',
  link: window.location.href,
  imgUrl: 'https://guihua-static.licaigc.com/dazhaxie.png'
})
```

### 3、复制到粘贴板

使用 clipboard 类库，可以实现 复制到粘贴板的功能

1.  设置复制出来的内容

```html
<p className="js-copy" data-clipboard-text={number}>点击我复制</p>
```

2.  初始化复制功能

```javascript
import Clipboard from 'clipboard'
import { Toast } from 'antd-mobile'

const clipboard = new Clipboard('.js-copy')

clipboard.on('success', e => {
  e.clearSelection()
  Toast.info('复制成功')
})

clipboard.on('error', e => {
  Toast.info('复制失败，请手动选择复制')
})
```

### 4、通过配置增加百度统计的事件统计功能

封装百度事件统计的功能，可以通过配置样式和属性，然后完成事件统计,方便快速使用

```javascript
/**
 * 1. 在 html 文件的 最外层 div，添加 u-baidu-statistics 样式
 * eg: 这里以 pug 文件为例
*/
div(id='container',class='u-baidu-statistics')

/**
 * 2. 给需要添加 事件统计的按钮或者标签 ，添加 u-baidu-statistics__event 样式
 * 3. 添加百度事件统计的 参数 [可以不填]
 * data-baidu-category  点击标签的类别  default: 标签的innerText
 * data-baidu-action    交互类型  default: click
 * data-baidu-desc      描述   default: 页面地址
 */
<img
    className="u-baidu-statistics__event"
    data-baidu-category="图片"
    data-baidu-action="click"
    data-baidu-desc="描述"
    src="{{{h5/demo/imgs/null.png}}}" alt="" />
```
