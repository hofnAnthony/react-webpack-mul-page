/**
 * 单选按钮组
 */
import React, { Component } from 'react'
import classnames from 'classnames'
import { List, Flex, Radio } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief


class FormItemRadioGroup extends Component {

  componentDidMount() {
    let { value, config, getFieldValue, setFieldsValue } = this.props
    if (value !== undefined && value !== '') {
      value = value
    } else if (getFieldValue(config.name) !== undefined) {
      value = getFieldValue(config.name)
    } else {
      value = config.defaultValue
    }
    setFieldsValue({ [config.name]: value })
  }

  render() {
    let { config, getFieldProps, getFieldValue } = this.props
    let values = config.values || []
    let value = getFieldValue(config.name)

    return (
      <Item
        error={true}
        extra={(
          <Flex wrap="wrap">
            {values.map((item) => {
              return (
                <Radio
                  key={item.value}
                  {...getFieldProps(`${config.name}.${item.value}`, {
                    ...config,
                    exclusive: true,
                    getValueFromEvent(e) {
                      return e.target.checked ? item.value : ''
                    },
                    getValueProps(value) {
                      return {
                        checked: value === item.value
                      }
                    }
                  }) }
                  className={classnames('lcgc-formitem__radio', { 'lcgc-formitem__radio-checked': item.value === value })}>
                  {item.label}
                </Radio>
              )
            })}
          </Flex>
        )}>
        {config.label}
        {config.desc ? <Brief>{config.desc}</Brief> : ''}
      </Item>
    )
  }
}

export default FormItemRadioGroup
