import render from '../base/CommonRender'
import generator from '../base/CommonFormComponentGenerator'


/**
 * 上传组件组件
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'CommonComponentControlPanel',
  __config__: {
    idf: 'f_upload',
    layout: 'form',
    label: '上传',
    tag: 'el-upload',
    tagIcon: 'upload',
    defaultValue: null,
    showLabel: true,
    labelWidth: null,
    required: true,
    span: 24,
    showTip: false,
    buttonText: '点击上传',
    regList: [],
    changeTag: true,
    fileSize: 2,
    sizeUnit: 'MB',
  },
  __slot__: {
    'list-type': true
  },
  action: 'https://jsonplaceholder.typicode.com/posts/',
  disabled: false,
  accept: '',
  name: 'file',
  'auto-upload': true,
  'list-type': 'text',
  multiple: false
}

//组件属性
const property = {

}

export default {
  idf: 'f_upload',
  describe: '上传组件',
  type: 'select',
  idx: 99,
  controlPanel: undefined,
  config,
  property,
  render,
  generator
}
