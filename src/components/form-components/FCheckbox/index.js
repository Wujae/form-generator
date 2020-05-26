import render from '../base/CommonRender'
import generator from '../base/CommonFormComponentGenerator'

/**
 * checkbox 多选组件
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'CommonComponentControlPanel',
  __config__: {
    idf: 'f_checkbox',
    layout: 'form',
    label: '多选框组',
    tag: 'el-checkbox-group',
    tagIcon: 'checkbox',
    defaultValue: [],
    span: 24,
    showLabel: true,
    labelWidth: null,
    optionType: 'default',
    required: true,
    regList: [],
    changeTag: true,
    border: false,
  },
  __slot__: {
    options: [{
      label: '选项一',
      value: 1
    }, {
      label: '选项二',
      value: 2
    }]
  },
  style: {},
  size: 'medium',
  min: null,
  max: null,
  disabled: false
}

//组件属性
const property = {

}

export default {
  idf: 'f_checkbox',
  describe: 'checkbox多选组件',
  type: 'select',
  idx: 4,
  controlPanel: undefined,
  config,
  property,
  render,
  generator
}
