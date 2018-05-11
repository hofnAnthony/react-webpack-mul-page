/**
 * 多选框按钮组
 */
import { List } from 'antd-mobile'
import FormItemCheckBox from './checkbox'
const Item = List.Item
const Brief = Item.Brief


const FormItemQuestion = ({ value, config, getFieldProps, data }) => {
  value = value !== undefined ? value : config.defaultValue
  let values = config.values || []

  getFieldProps(config.name, {
    ...config,
    initialValue: value
  })

  return (
    <Item error={true}>
      <Item wrap multipleLine style={{ paddingLeft: 0 }}>
        {config.label}
      </Item>

      <div className="formitem-question__answer">
        {values.map((item, index) => {
          return (
            <FormItemCheckBox
              {...getFieldProps(`${config.name}.${item.value}`, {
                exclusive: config.exclusive,              // 只能单选
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

export default FormItemQuestion
