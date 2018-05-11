/**
 * 2017-09-15 18:31:02
 * @author zhongxia
 * 复选框组件,参照 antd-mobile 的 switch 封装的
 * 主要为了配合 rc-form 使用， 来做可控组件
 */
import './index.less'
import React, { Component } from 'react'
import classnames from 'classnames'

class FormItemCheckBox extends Component {
  onChange = (e) => {
    const checked = e.target.checked
    if (this.props.onChange) {
      this.props.onChange(checked)
    }
  }

  onClick = (e) => {
    if (this.props.onClick) {
      let val
      if (e && e.target && e.target.checked !== undefined) {
        val = e.target.checked
      } else {
        val = this.props.checked
      }
      this.props.onClick(val)
    }
  }

  render() {
    let { name, checked, disabled, children } = this.props

    return (
      <label className={classnames('formitem-checkbox', { 'formitem-checkbox--active': checked })}>
        <input
          type="checkbox"
          name={name}
          disabled={disabled}
          checked={checked}
          onChange={this.onChange}
          value={checked ? 'on' : 'off'}
          {...(!disabled ? { onClick: this.onClick } : {}) }
        />
        {children}
      </label>
    )
  }
}

export default FormItemCheckBox
