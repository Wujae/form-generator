import render from '../base/CommonRender'

/**
 * 颜色选择组件
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'CommonComponentControlPanel',
  __config__: {
    idf: 'f_color_picker',
    layout: 'form',
    label: '颜色选择',
    tag: 'el-color-picker',
    tagIcon: 'color',
    span: 24,
    defaultValue: null,
    showLabel: true,
    labelWidth: null,
    required: true,
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/color-picker'
  },
  'show-alpha': false,
  'color-format': '',
  disabled: false,
  size: 'medium'
}

//组件属性
const property = {

}

export default {
  idf: 'f_color_picker',
  describe: '颜色选择组件',
  type: 'select',
  idx: 12,
  controlPanel: undefined,
  config,
  property,
  render
}
