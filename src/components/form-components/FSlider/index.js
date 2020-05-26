import render from '../base/CommonRender'
import generator from '../base/CommonFormComponentGenerator'

/**
 * 滑块组件
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'CommonComponentControlPanel',
  __config__: {
    idf: 'f_slider',
    layout: 'form',
    label: '滑块',
    tag: 'el-slider',
    tagIcon: 'slider',
    defaultValue: null,
    span: 24,
    showLabel: true,
    labelWidth: null,
    required: true,
    regList: [],
    changeTag: true
  },
  disabled: false,
  min: 0,
  max: 100,
  step: 1,
  'show-stops': false,
  range: false
}

//组件属性
const property = {

}

export default {
  idf: 'f_slider',
  describe: '滑块组件',
  type: 'select',
  idx: 6,
  controlPanel: undefined,
  config,
  property,
  render,
  generator
}
