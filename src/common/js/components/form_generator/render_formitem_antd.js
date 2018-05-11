/**
 * 根据配置生成表单组件
 */
import React from 'react'
import { COMPONENT_TYPE } from './const.js'
import { FormItemInput, FormItemSelect, FormItemRadioGroup, FormItemDatePicker, FormItemButton, FormItemQuestion, FormItemCheckGroup, FormItemPopupCheckGroup } from './component'


const RenderFormItemAntd = (props) => {
  const { config } = props

  switch (config.type) {

    case COMPONENT_TYPE.INPUT:
      return <FormItemInput {...props} />

    case COMPONENT_TYPE.SELECT:
      return <FormItemSelect {...props} />

    case COMPONENT_TYPE.RADIO_GROUP:
      return <FormItemRadioGroup {...props} />

    case COMPONENT_TYPE.DATE:
      return <FormItemDatePicker {...props} />

    case COMPONENT_TYPE.BUTTON:
      return <FormItemButton {...props} />

    case COMPONENT_TYPE.QUESTION:
      return <FormItemQuestion {...props} />

    case COMPONENT_TYPE.CHECKBOX_GROUP:
      return <FormItemCheckGroup {...props} />

    case COMPONENT_TYPE.POPUP_CHECKBOX_GROUP:
      return <FormItemPopupCheckGroup {...props} />

    default:
      return <FormItemInput {...props} />

  }
}

export default RenderFormItemAntd
