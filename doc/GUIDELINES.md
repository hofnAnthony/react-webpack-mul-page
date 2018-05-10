## 一、前言

每个人有不同的开发习惯，开发风格也更不相同，但是身为团队的一员，保证团队代码风格统一，注释明确，可以更容易让组员之间快速了解、上手、维护相关的代码。

## 二、规范

下面从，目录结构，React 组件写法，Ajax 几个方面进行 展开说明【后续慢慢增加】

### 2.1 是否使用 react-router【活动页面中尽量不使用】

活动页面尽量不用 react-router 。活动页面比较简单，页面不多，并且每个页面之间没有关联，因为就不需要使用 react-router

目前存在的问题：

1.  Growing IO 对单页面的无埋点，支持不好
2.  WebView 如果重定向了在访问 SPA 页面，会导致  死循环退不出来，加上 isClose 参数后，会导致每个子页面都会退出来

### 2.2 目录结构和文件、文件夹命名

文件和文件夹名称，需要使用 小写字母。

> linux 是大小写敏感，而 mac 和 window 下，大小写不敏感。 因此统一采用小写字母来对文件夹进行命名。

目录结构 可以参考一下结构

```bash
activity_name
  - [components]      # 【可选】放置活动中公共的组件 / 复杂活动可能需要
  - [commom]          # 【可选】放公共的方法   / 复杂活动可能需要,比如规划书的所有分享，所有页面校验，修复微信兼容等功能
  - imgs              # 放置活动图片
  - page              # 活动页面代码，每一个页面一个目录
    - home            # demo:首页
      - index.js      # 页面代码
      - _index.less   # 页面样式
  - ajax.js / ajax    # 简单的话，所有接口写在ajax.js，复杂的话，可以写成文件夹  
  - index.pug         # 活动入口，有多个页面，则写多个 pug 文件
```

### 2.3 React 组件写法

主要是函数的顺序规范,按照这个顺序,React 的组件一目了然,清晰。

1.  构造函数
2.  React 生命周期函数[除 render 外]
3.  各种公共的函数（eg：多个地方用到的 ajax 请求处理，多个地方用到的点击处理）
4.  各种 handle 函数
5.  各种 render 函数

```javascript
import React, { Component } from 'react'

class componentName extends Component {
  constructor(props) {
    super(props)
  }

  // ... 除了 render 外的各种 生命周期函数
  componentDidMount() {}

  // ... 各种 handle 相关函数

  // ... 各种 render 相关函数

  render() {
    return <div />
  }
}

export default componentName
```

### 2.4 Ajax 封装

先对后端提供的接口进行一层封装，然后把接口暴露出来，给组件里面使用。 如果接口有变动，直接修改此处即可。主要起到：统一修改，统一错误处理，统一数据处理的作用

```javascript
import Axios from 'axios'
import { Toast } from 'antd-mobile'
import queryString from 'common/js/utils/queryString.js'

Axios.interceptors.response.use(resp => {
  // 这里处理后端各种返回结构不一致问题
  if (resp.data.code === 0 || resp.data.r) {
    return resp.data.data
  } else {
    if (resp.data.msg) {
      Toast.fail(resp.data.msg)
    }
    return Promise.reject(resp)
  }
})

const ID = queryString('id') || ''

let URLS = {
  postAnswers: '/activities/2017/slide', // 提交问题答案
  getMoiveInfo: '/activities/2017/slide/' // 获取影片信息
}

/**
 * 提交问题答案
 */
export const postAnswers = param => {
  return Axios.post(URLS.postAnswers, JSON.stringify(param))
}

/**
 * 获取影片信息
 */
export const getMoiveInfo = () => {
  return Axios.get(`${URLS.getMoiveInfo}${ID}`)
}
// ...
```

### 2.5 图片使用方法

1.  默认使用方式(图片上传七牛云并替换地址)

```html
<img src="{{{h5/demo/imgs/null.png}}}" />
```

2.  使用本地图片(不使用七牛地址)

```html
<img src="{{#{h5/demo/imgs/null.png}}}" />
```

3.  使用 svg 图片<br />

html 中使用

```html
<svg src="{svg{{h5/demo/imgs/badge_1.svg}}}" ></svg>
```

jsx 中使用

```js
const svg = '<svg src="{svg{{h5/demo/imgs/badge_1.svg}}}"></svg>'
<div dangerouslySetInnerHTML={{ __html: svg }}></div>
```
