/**
 * 自定义添加按钮
 * 使用该组件的页面，如果回显，需要实现获取数据，然后在渲染组件，否则回显右问题
 * eg:
 * getData((result)=>{
 *    ReactDom.render(<Demo data={result}/>,'container')
 * })
 */
import classnames from 'classnames'
import { List } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

let uuid = 0

export default class FormItemButton extends React.Component {

  componentDidMount() {
    let { config, value, setFieldsValue } = this.props
    setFieldsValue({ [config.name]: [] })
    // 默认展示几项内容
    let count = config.defaultShowCount
    if (value && Array.isArray(value)) {
      count = value.length
    }
    if (count) {
      for (let i = 0; i < count; i++) {
        this.add.bind(this, this.props)()
      }
    }
  }

  componentWillUnmount() {
    uuid = 0
  }

  remove = (k) => {
    const { getFieldValue, setFieldsValue, config } = this.props
    let keys = getFieldValue(config.name)
    keys = keys.filter((key) => {
      return key !== k
    })
    setFieldsValue({
      [config.name]: keys
    })
  }

  add = () => {
    const { getFieldValue, setFieldsValue, config } = this.props
    let keys = getFieldValue(config.name)
    keys = keys.concat(uuid++)
    setFieldsValue({
      [config.name]: keys
    })
  }

  showBtn = (keys) => {
    let { config } = this.props
    if (config.maxCount && config.maxCount <= keys.length) {
      return false
    }
    return true
  }

  render() {
    let { config, getFieldValue, getFieldProps } = this.props

    getFieldProps(config.name, {
      initialValue: []
    })

    let keys = getFieldValue(config.name)
    const inputs = keys.map((k, index) => {
      return config.renderContent && config.renderContent({ ...this.props, key: k, index: index, remove: this.remove })
    })

    return (
      <div>
        {inputs}
        {this.showBtn(keys)
          ? (<Item
            className={classnames('lcgc-formitem__button', config.className)}
            onClick={this.add.bind(this, this.props)}
          >
            {config.label}
            <Brief>{config.desc}</Brief>
          </Item>)
          : ''}
      </div>
    )
  }
}
