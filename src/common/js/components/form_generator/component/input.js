/**
 * 【Antd-mobile 组件在 iphone7下， 会被弹出的软键盘挡住，因此重写了该组件】
 * 文本框组件
 * 如果文本框值为0时，获取焦点，则变成空字符串
 * 如果值为空字符串， 失去焦点则设置为0
 * 增加 custom_money 类型， 输入内容会带上千位符
 *
 * 遇到问题:
 * 如果写成 Component 组件形式，隐藏后，rc-form 里面还存在值,如果是函数组件，则不会。 待研究
 *
 */
import { List } from 'antd-mobile'
import { formatNum } from 'common/js/utils'
const Item = List.Item
const Brief = Item.Brief

const InnerInput = ({ value, config, getFieldProps, setFieldsValue }) => {
  value = value || config.defaultValue
  config.type = config.inputType || 'text'
  let otherProps = {
    type: config.type === 'custom_money' ? 'tel' : config.type
  }
  return (
    <input
      {...config}
      {...otherProps}
      autocomplete="off"
      className="needsclick form__input"
      {...getFieldProps(config.name, {
        ...config,
        initialValue: value,
        getValueProps(value) {
          if (value) {
            if (config.type === 'number' && config.maxLength && value) {
              if (value.length > config.maxLength) {
                value = value.slice(0, config.maxLength)
              }
            } else if (config.type === 'custom_money') {
              value = String(value || '')
              value = value.replace(/,/g, '')
              value = formatNum(value)
            }
          }
          return {
            value: value
          }
        }
      }) }
    />
  )
}

const FormItemInput = (props) => {
  let { config } = props
  config.labelNumber = config.labelNumber || 6

  return (
    <Item
      id={config.name}
      autocomplete="off"
      className={`needsclick form-item__input ${config.className || ''}`}
      { ...config}
      extra={<InnerInput {...props} />}
    >
      {config.renderLabel ? config.renderLabel.bind(this, props)() : config.label}
      {config.desc ? <Brief>{config.desc}</Brief> : ''}
    </Item>
  )
}

export default FormItemInput
