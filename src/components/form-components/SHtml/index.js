import controlPanel from './SHtmlControlPanel'
import render from '../base/CommonRender'
import generator from '../base/CommonFormComponentGenerator'

/**
 * TODO
 * HTML组件
 */

//基本信息
const config =   {
  __c_panel: 'SHtmlControlPanel',
  __config__: {
    idf: 'f_html',
    label: 'HTML',
    layout: 'form',
    labelWidth: null,
    showLabel: true,
    tag: 'div',
    tagIcon: 'textarea',
    defaultValue: '演示文本',
    span: 24,
    regList: [],
  },
  __slot__: {
    html: '<h1>have a <span style="color: red">nice</span> day !</h1>'
  },
  type: 'div',
  style: { width: '100%' },
  readonly: true
}

//组件属性
const property = {

}


export default {
  idf: 'f_html',
  describe: 'HTML组件',
  type: 'static',
  idx: 1,
  controlPanel: controlPanel,
  config,
  property,
  render,
  generator
}
