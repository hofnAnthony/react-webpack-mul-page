/**
 * 下拉框组件
 * 配置里面配置了  getValues这个函数，则下拉列表变成异步的, 会覆盖 values的下拉选项
 */
import { List, Picker } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief

const isNull = (val) => {
  if (val === null || val === undefined || val === '') {
    return true
  } else {
    return false
  }
}

class FormItemSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      values: []
    }
  }

  componentDidMount() {
    const { config } = this.props
    if (config.getValues && typeof config.getValues === 'function') {
      config.getValues((result) => {
        this.setState({ values: result })
      })
    } else {
      this.setState({ values: config.values })
    }
  }

  // 格式化数据类型
  formatVal(value, config) {
    if (config.valueType) {
      switch (config.valueType) {
        case 'number':
          return parseInt(value, 10)
      }
    }
    return value
  }

  render() {
    let { value, config, getFieldProps } = this.props
    let title = config.pickerTitle || `选择${config.label}`
    // 如果错误需要在表单项右边显示，则去掉这句注释
    // let errorMsg = getFieldError(config.name)
    let errorMsg
    let extra = errorMsg ? <div className="form-error">{errorMsg}</div> : <span className="picker__placeholder">{config.placeholder || '请选择'}</span>
    if (!isNull(value) && !Array.isArray(value)) {
      value = this.formatVal(value, config)
      value = [value]
    }
    if (isNull(value) && !isNull(config.defaultValue)) {
      if (Array.isArray(config.defaultValue)) {
        value = config.defaultValue
      } else {
        value = [config.defaultValue]
      }
    }

    return (
      <Picker
        {...config}
        {...getFieldProps(config.name, {
          ...config,
          initialValue: value
        }) }
        data={this.state.values}
        title={title}
        extra={extra}
      >
        <Item className="lcgc-select" arrow={config.arrow}>
          {config.label}
          {config.desc ? <Brief>{config.desc}</Brief> : ''}
        </Item>
      </Picker>
    )
  }
}

export default FormItemSelect


