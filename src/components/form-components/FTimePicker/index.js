import render from '../base/CommonRender'

/**
 * 时间选择组件
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'CommonComponentControlPanel',
  __config__: {
    idf: 'f_time_picker',
    layout: 'form',
    label: '时间选择C',
    tag: 'el-time-picker',
    tagIcon: 'time',
    defaultValue: null,
    span: 24,
    showLabel: true,
    labelWidth: null,
    required: true,
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/time-picker'
  },
  placeholder: '请选择',
  style: { width: '100%' },
  disabled: false,
  clearable: true,
  'picker-options': {
    selectableRange: '00:00:00-23:59:59'
  },
  format: 'HH:mm:ss',
  'value-format': 'HH:mm:ss'
}

//组件属性
const property = {

}

export default {
  idf: 'f_time_picker',
  describe: '时间选择组件',
  type: 'select',
  idx: 7,
  controlPanel: undefined,
  config,
  property,
  render
}
