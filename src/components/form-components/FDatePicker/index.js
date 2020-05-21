import render from '../base/CommonRender'

/**
 * 日期选择组件
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'CommonComponentControlPanel',
  __config__: {
    idf: 'f_date_picker',
    layout: 'form',
    label: '日期选择C',
    tag: 'el-date-picker',
    tagIcon: 'date',
    defaultValue: null,
    showLabel: true,
    labelWidth: null,
    span: 24,
    required: true,
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/date-picker'
  },
  placeholder: '请选择',
  type: 'date',
  style: { width: '100%' },
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
  idf: 'f_date_picker',
  describe: '日期选择组件',
  type: 'select',
  idx: 9,
  controlPanel: undefined,
  config,
  property,
  render
}
