import render from '../base/CommonRender'
import generator from '../base/CommonFormComponentGenerator'


/**
 * 日期范围组件
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'CommonComponentControlPanel',
  __config__: {
    idf: 'f_date_range',
    layout: 'form',
    label: '日期范围',
    tag: 'el-date-picker',
    tagIcon: 'date-range',
    defaultValue: null,
    span: 24,
    showLabel: true,
    labelWidth: null,
    required: true,
    regList: [],
    changeTag: true,
  },
  style: { width: '100%' },
  type: 'daterange',
  'range-separator': '至',
  'start-placeholder': '开始日期',
  'end-placeholder': '结束日期',
  disabled: false,
  clearable: true,
  format: 'yyyy-MM-dd',
  'value-format': 'yyyy-MM-dd',
  readonly: false
}

//组件属性
const property = {

}

export default {
  idf: 'f_date_range',
  describe: '日期范围组件',
  type: 'select',
  idx: 10,
  controlPanel: undefined,
  config,
  property,
  render,
  generator
}
