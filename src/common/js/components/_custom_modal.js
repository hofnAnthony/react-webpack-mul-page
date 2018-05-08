/**
 * 把Antd-mobile 的 Model 组件，封装成函数调用的方式
 * import CustomModal from 'common/js/components/_custom_modal.js'
 * CustomModal.show({render:(prpos)=><div>Hello Modal!</div>})
 */
import { Modal } from 'antd-mobile'

const CustomModal = ({ render, className, maskClosable = true, closable = true, ...otherProps }) => {
  return (
    <Modal wrapClassName="custom-modal" className={className} transparent maskClosable={maskClosable} closable={closable} {...otherProps}>
      {render && render(otherProps)}
    </Modal>
  )
}


let render = props => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  render = nextProps => {
    props = { ...props, ...nextProps }
    ReactDOM.render(<CustomModal {...props} />, container)
  }
  render()
}

export default {
  show({ callback, ...param }) {
    render({
      ...param,
      visible: true,
      onClose: (param) => {
        this.hide()
        if (callback) {
          callback(param)
        }
      }
    })
  },
  hide() {
    render({ visible: false })
  }
}
