/**
 * 文本框组件
 * 如果文本框值为0时，获取焦点，则变成空字符串
 * 如果值为空字符串， 失去焦点则设置为0
 *
 * 遇到问题:
 * 如果写成 Component 组件形式，隐藏后，rc-form 里面还存在值,如果是函数组件，则不会。 待研究
 */
import { List, InputItem } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief


const FormItemInput = (props) => {
  let { value, config, getFieldProps } = props

  // 如果错误需要在表单项右边显示，则去掉这句注释
  // let errorMsg = getFieldError(config.name)
  let errorMsg
  let extra = errorMsg ? <div className="form-error">{errorMsg}</div> : config.extra

  config.labelNumber = config.labelNumber || 6

  if (config.extraLabel && config.onExtraClick) {
    config.extra = renderExtra(config.extraLabel, config.onExtraClick, props)
  }

  return (
    <InputItem
      autocomplete="off"
      { ...config}
      {...getFieldProps(config.name, {
        ...config,
        initialValue: value || config.defaultValue
      }) }
      type={config.inputType || 'input'}
      extra={extra}
      id={config.name}
      className={`needsclick ${config.className || ''}`}
    >
      {config.renderLabel ? config.renderLabel.bind(this, props)() : config.label}
      {config.desc ? <Brief>{config.desc}</Brief> : ''}
    </InputItem >
  )
}

function renderExtra(label, onExtraClick, props) {
  return (
    <span className="formitem__input-extra" onClick={(e) => {
      e.stopPropagation()
      // 该写法，有待改进
      onExtraClick.bind(this, props)()
    }}>{label}</span>
  )
}

export default FormItemInput
