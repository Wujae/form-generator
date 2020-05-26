import render from '../base/CommonRender'
import generator from '../base/CommonFormComponentGenerator'

/**
 * radio 单选组件
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'CommonComponentControlPanel',
  __config__: {
    idf: 'f_radio',
    label: '单选框组',
    layout: 'form',
    labelWidth: null,
    showLabel: true,
    tag: 'el-radio-group',
    tagIcon: 'radio',
    changeTag: true,
    defaultValue: undefined,
    span: 24,
    optionType: 'default',
    regList: [],
    required: true,
    border: false,
  },
  __slot__: {
    options: [{
      label: '选项一',
      value: '1'
    }, {
      label: '选项二',
      value: '2'
    }]
  },
  style: {},
  size: 'medium',
  disabled: false
}

//组件属性
const property = {

}

export default {
  idf: 'f_radio',
  describe: 'radio单选组件',
  type: 'select',
  idx: 3,
  controlPanel: undefined,
  config,
  property,
  render,
  generator
}
