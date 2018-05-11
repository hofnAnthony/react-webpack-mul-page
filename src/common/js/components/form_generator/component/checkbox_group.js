/**
 * 多选框按钮组
 */
import { List } from 'antd-mobile'
import FormItemCheckBox from './checkbox'
const Item = List.Item
const Brief = Item.Brief


const FormItemCheckGroup = ({ value, config, getFieldProps, getFieldsValue }) => {
  value = value || config.defaultValue || {}

  let values = config.values || []

  return (
    <Item>
      <div className="formitem__checkgroup">
        {values.map((item, index) => {
          return (
            <FormItemCheckBox
              {...getFieldProps(`${config.name}.${item.value}`, {
                initialValue: value[item.value],
                exclusive: config.exclusive,              // true:只能单选
                getValueFromEvent(checked) {
                  return checked ? item.value : ''
                },
                getValueProps(value) {
                  return {
                    checked: value === item.value
                  }
                }
              }) } >
              {item.label}
            </FormItemCheckBox>
          )
        })}
      </div>
      <Brief>{config.desc}</Brief>
    </Item>
  )
}

export default FormItemCheckGroup
