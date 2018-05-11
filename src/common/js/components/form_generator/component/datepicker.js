/**
 * 日期选择组件
 */
import { List, DatePicker } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief


const FormItemDatePicker = ({ value, config, getFieldProps, getFieldError }) => {
  let title = config.pickerTitle || `选择${config.label}`

  // 如果错误需要在表单项右边显示，则去掉这句注释
  // let errorMsg = getFieldError(config.name)
  let errorMsg
  let extra = errorMsg ? <div className="form-error">{errorMsg}</div> : <span className="picker__placeholder">{config.placeholder || '请选择'}</span>
  if (value) {
    value = new Date(value)
  }
  return (
    <DatePicker
      {...config}
      mode="date"
      title={title}
      extra={extra}
      minDate={config.minDate || new Date(1900, 1, 1)}
      maxDate={config.maxDate || new Date(2100, 12, 30)}
      {...getFieldProps(config.name, {
        ...config,
        initialValue: value || config.defaultValue
      }) }
    >
      <Item error={true}>
        {config.label}
        {config.desc ? <Brief>{config.desc}</Brief> : ''}
      </Item>
    </DatePicker>
  )
}

export default FormItemDatePicker
