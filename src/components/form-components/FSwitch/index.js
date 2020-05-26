import render from '../base/CommonRender'
import generator from '../base/CommonFormComponentGenerator'


/**
 * 开关组件
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'CommonComponentControlPanel',
  __config__: {
    idf: 'f_switch',
    layout: 'form',
    label: '开关',
    tag: 'el-switch',
    tagIcon: 'switch',
    defaultValue: false,
    span: 24,
    showLabel: true,
    labelWidth: null,
    required: true,
    regList: [],
    changeTag: true,
  },
  style: {},
  disabled: false,
  'active-text': '',
  'inactive-text': '',
  'active-color': null,
  'inactive-color': null,
  'active-value': true,
  'inactive-value': false
}

//组件属性
const property = {

}

export default {
  idf: 'f_switch',
  describe: '开关组件',
  type: 'select',
  idx: 5,
  controlPanel: undefined,
  config,
  property,
  render,
  generator
}
