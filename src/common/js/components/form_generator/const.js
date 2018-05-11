
export const COMPONENT_TYPE = {
  INPUT: 0,                   // 文本框
  SELECT: 1,                  // 下拉框
  RADIO_GROUP: 2,             // 单选组合
  CHECKBOX: 3,                // 复选框
  DATE: 4,                    // 日期
  BUTTON: 5,                  // 添加按钮
  QUESTION: 6,                // 问题
  CHECKBOX_GROUP: 7,          // 多选组合
  POPUP_CHECKBOX_GROUP: 8           // 弹窗多选组合
}

export const REG_PARAM = '${x}'     // 动态变量占位符

export function FN_REG_PARAM(str, val) {
  return str.replace(REG_PARAM, val)
}
