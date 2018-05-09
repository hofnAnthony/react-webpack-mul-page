import ReactDom from 'react-dom'
import ShareWechat from './share_wechat.js'
import './index.less'

export default message => {
  let shareNode = document.getElementById('wechat-share')
  if (!shareNode) {
    shareNode = document.createElement('div')
    shareNode.id = 'wechat-share'
    document.body.appendChild(shareNode)
  }
  let props = {
    nodeId: 'wechat-share',
    message
  }
  ReactDom.render(<ShareWechat {...props} />, shareNode)
}
