import render from '../base/CommonRender'
import controlPanel from './SHiddenControlPanel'
import generator from '../base/CommonFormComponentGenerator'

/**
 * 隐藏域组件
 */

//基本信息
const config =   {
  __c_panel: 'SHiddenControlPanel',
  __config__: {
    idf: 's_hidden',
    label: '隐藏域',
    layout: 'form',
    labelWidth: null,
    showLabel: true,
    tag: 'el-input',
    tagIcon: 'eye-slash-solid',
    defaultValue: '隐藏域文本',
    span: 24,
    hidden: true    //隐藏域 render中解析处理
  },
  style: { width: '100%' },
  readonly: true
}

//组件属性
const property = {

}


export default {
  idf: 's_hidden',
  describe: '隐藏域组件',
  type: 'static',
  idx: 3,
  controlPanel: controlPanel,
  config,
  property,
  render,
  generator
}
