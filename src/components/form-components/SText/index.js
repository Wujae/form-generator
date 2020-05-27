import controlPanel from './STextControlPanel'
import render from '../base/CommonRender'

import generator from '../base/CommonFormComponentGenerator'


/**
 * 静态文本组件
 */

//基本信息
const config =   {
  __c_panel: 'STextControlPanel',
  __config__: {
    idf: 's_text',
    label: '文本',
    layout: 'form',
    labelWidth: null,
    showLabel: true,
    tag: 'div',
    tagIcon: 'textarea',
    span: 24,
  },
  // div text 域
  __slot__: {
    text: '演示文本',
  },
  placeholder: '请输入',
  style: { width: '100%' },
  'show-word-limit': false,
  readonly: true
}

//组件属性
const property = {

}

export default {
  idf: 's_text',
  describe: '静态文本组件',
  type: 'static',
  idx: 1,
  controlPanel: controlPanel,
  config,
  property,
  render,
  generator
}
