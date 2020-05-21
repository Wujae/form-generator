import render from '../base/CommonRender'

/**
 * 时间范围组件
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'CommonComponentControlPanel',
  __config__: {
    idf: 'f_time_range',
    layout: 'form',
    label: '时间范围C',
    tag: 'el-time-picker',
    tagIcon: 'time-range',
    span: 24,
    showLabel: true,
    labelWidth: null,
    defaultValue: null,
    required: true,
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/time-picker'
  },
  style: { width: '100%' },
  disabled: false,
  clearable: true,
  'is-range': true,
  'range-separator': '至',
  'start-placeholder': '开始时间',
  'end-placeholder': '结束时间',
  format: 'HH:mm:ss',
  'value-format': 'HH:mm:ss'
}

//组件属性
const property = {

}

export default {
  idf: 'f_time_range',
  describe: '时间范围组件',
  type: 'select',
  idx: 8,
  controlPanel: undefined,
  config,
  property,
  render
}
