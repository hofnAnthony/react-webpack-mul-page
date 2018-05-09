import {Component} from 'react'
import arrowImg from './img/arrow2.svg'

export default class ShareWechat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      maskStatus: true
    }
    this.handleMaskClick = this.handleMaskClick.bind(this)
  }

  handleMaskClick() {
    this.setState({
      maskStatus: false
    })
    ReactDOM.unmountComponentAtNode(document.getElementById(this.props.nodeId))
  }

  renderShareMask() {
    const message = this.props.message || '点击右上角，分享到朋友圈'
    if (this.state.maskStatus) {
      return (
        <div className="text-right mask" onClick={this.handleMaskClick}>
          <img src={arrowImg} alt="" />
          <p className="share-tip">{message}</p>
        </div>
      )
    }
  }

  render() {
    let shareMask = this.renderShareMask()
    return (
      <div>
        {shareMask}
      </div>
    )
  }
}
