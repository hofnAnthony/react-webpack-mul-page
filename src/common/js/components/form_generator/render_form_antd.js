/**
 * 2017-09-14 18:55:11
 * @author zhongxia
 * @desc Antd-mobile 表单组件
 *  支持根据配置动态生成表单
 */
import './index.less'
import React, { Component } from 'react'
import { List, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import RenderFormItemAntd from './render_formitem_antd.js'
import { COMPONENT_TYPE } from './const.js'

const SHOW_FIELD_KEY = '_showField_'


class RenderForm extends Component {

  componentDidMount() {
    const { data, form } = this.props
    const { setFieldsValue, getFieldProps } = form
    /* FIXME:setFieldsValue之前必须先把字段在 getFieldProps里面注册,注册方法如下 */
    getFieldProps(SHOW_FIELD_KEY)
    setFieldsValue({ [SHOW_FIELD_KEY]: data[SHOW_FIELD_KEY] })
  }

  componentWillReceiveProps(nextProps) {
    const { data, form } = this.props
    const { setFieldsValue } = form
    if (data && nextProps && nextProps.data && data[SHOW_FIELD_KEY] !== nextProps.data[SHOW_FIELD_KEY]) {
      setFieldsValue({ [SHOW_FIELD_KEY]: nextProps.data[SHOW_FIELD_KEY] })
    }
  }


  onSubmit = (callback) => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error && callback) {
        callback(this.props.form.getFieldsValue())
      } else {
        // 只展示第一个错误,需要的话，可以改成展示所有错误
        for (let key in error) {
          if (error.hasOwnProperty(key)) {
            let msg = error[key]['errors'] && error[key]['errors'][0].message
            if (msg) {
              Toast.info(msg, 3, null, false)
            }
            break
          }
        }
      }
    })
  }

  onReset = () => {
    this.props.form.resetFields()
  }

  /**
   * 格式化配置
   */
  formatConfig = (items, defaultValue, ignoreItems = []) => {
    items = items || []
    let config = {
      type: COMPONENT_TYPE.CHECKBOX_GROUP,
      name: SHOW_FIELD_KEY,
      defaultValue: defaultValue || [],
      values: []
    }
    items.map((item) => {
      if (ignoreItems.indexOf(item.name) === -1) {
        config.values.push({ value: item.name, label: item.label })
      }
    })
    return config
  }

  renderControlBtn(moduleItem) {
    const { data } = this.props
    if (moduleItem.showControlBtn) {
      let config = this.formatConfig(moduleItem.items, moduleItem.defaultValue || data[SHOW_FIELD_KEY], moduleItem.ignoreControlBtn)
      return <RenderFormItemAntd {...this.props.form} config={config} />
    }
  }

  renderModuleItems(moduleItem) {
    let moduleConfig = moduleItem.items || []
    const { data } = this.props

    if (moduleItem.showControlBtn) {
      let title = moduleItem.renderHeaderTitle
      moduleItem.renderHeader = () => {
        return (
          <div className="lcgc-form__header">
            <p>{title}</p>
            {this.renderControlBtn(moduleItem)}
          </div>
        )
      }
    }

    return (
      <List {...moduleItem}>
        {moduleConfig.map((item, index) => {
          let value = data[item.name]
          // 判断是否显示组件,主要用在组件有关联的地方使用
          let showFormItem = true

          if (item.hasVisible) {
            if ((typeof item.hasVisible) === 'function') {
              showFormItem = !!item.hasVisible(this.props.form)
            } else {
              showFormItem = item.hasVisible
            }
          }

          // 如果有组件控制按钮，则未选中前，不显示表单项
          if (moduleItem.showControlBtn) {
            let _showField = this.props.form.getFieldValue(SHOW_FIELD_KEY) || {}
            if (item.dependOnField) {
              if (!_showField[item.dependOnField]) {
                showFormItem = false
              }
            } else if (!_showField[item.name]) {
              showFormItem = false
            }
          }
          if (showFormItem) {
            return <RenderFormItemAntd {...this.props.form} key={index} config={item} value={value} data={data} />
          }
        })}
      </List>
    )
  }

  render() {
    const { config, form, ...otherProps } = this.props
    return (
      <form ref="refForm" {...otherProps} autoComplete="off">
        {config.map((moduleItem) => {
          return this.renderModuleItems(moduleItem)
        })}
        {this.props.renderFooter && this.props.renderFooter(this.onSubmit, this.onReset)}
      </form >
    )
  }
}

export default createForm()(RenderForm)
