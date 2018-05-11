/**
 * 自定义添加按钮
 */
import classnames from 'classnames'
import { List, Modal } from 'antd-mobile'
import FormItemCheckGroup from './checkbox_group.js'
import { createForm } from 'rc-form'

const Item = List.Item

/**
 * popup 组件封装
 * 弹窗里面的数据单独保存，点击确定的时候，把数据传出来到外部的表单
 */
const PopupCheckbox = ({ form, config, onOk, onClose, value }) => {
  let handleOk = () => {
    let values = form.getFieldValue(config.name)
    onOk(values)
  }
  config.defaultValue = value || config.defaultValue || {}
  return (
    <form>
      <div className="am-picker-popup-header">
        <div className="am-picker-popup-item am-picker-popup-header-left" onClick={onClose}>取消</div>
        <div className="am-picker-popup-item am-picker-popup-title">{config.headerLabel}</div>
        <div className="am-picker-popup-item am-picker-popup-header-right" onClick={handleOk}>确定</div>
      </div>
      <FormItemCheckGroup {...form} config={config} />
    </form>
  )
}
const FormItemPopup = createForm()(PopupCheckbox)


/**
 * Popup弹窗组件，选中字段，然后展示出来
 * @export
 * @class FormItemPopupCheckGroup
 * @extends {React.Component}
 */
export default class FormItemPopupCheckGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopup: false
    }
  }

  componentDidMount() {
    // 如果是编辑回显的时候，把值赋值到表单里面
    let { value, config, getFieldValue, setFieldsValue } = this.props
    value = value || getFieldValue(config.name) || config.defaultValue
    setFieldsValue({ [config.name]: value })
  }

  componentWillReceiveProps(nextProps) {
    /**
     * 解决异步获取数据后，回显功能
     * componentDidMount 如果是异步的话，则没办法回显出来
     */
    let { value, config, setFieldsValue } = nextProps
    if (this.props.value !== value) {
      setFieldsValue({ [config.name]: value })
    }
  }

  getValCount = (values) => {
    let count = 0
    for (var key in values) {
      if (values.hasOwnProperty(key)) {
        if (values[key]) {
          count++
        }
      }
    }
    return count
  }

  handleShowPopup = () => {
    this.setState({ showPopup: true })
  }

  handleClose = () => {
    this.setState({ showPopup: false })
  }

  handleOk = (values) => {
    // 接收到弹窗的表单，然后把数据赋值到页面表单里面
    const { setFieldsValue, config } = this.props
    const count = this.getValCount(values)
    if (config.count && count > config.count) {
      if (config.handleCountCallback) {
        config.handleCountCallback(config)
      }
    } else {
      setFieldsValue({ [config.name]: values })
    }
    this.handleClose()
  }

  renderModal() {
    let { value, config, getFieldValue } = this.props
    value = getFieldValue(config.name) || config.defaultValue

    if (this.state.showPopup) {
      return (
        <Modal
          popup
          transparent={true}
          visible={true}
          maskClosable={true}
          animationType="slide-up"
        >
          <FormItemPopup
            value={value}
            config={config}
            onOk={this.handleOk}
            onClose={this.handleClose} />
        </Modal>
      )
    }
  }

  render() {
    let { config, getFieldProps } = this.props
    return (
      <div>
        <Item
          {...getFieldProps(config.name) }
          className={classnames('lcgc-formitem__button', config.className)}
          onClick={this.handleShowPopup}
        >
          {config.label}
        </Item>
        {this.renderModal()}
      </div>
    )
  }
}
