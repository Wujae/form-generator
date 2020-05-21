import render from '../base/CommonRender'

/**
 * 评分组件
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'CommonComponentControlPanel',
  __config__: {
    idf: 'f_rate',
    layout: 'form',
    label: '评分',
    tag: 'el-rate',
    tagIcon: 'rate',
    defaultValue: 0,
    span: 24,
    showLabel: true,
    labelWidth: null,
    required: true,
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/rate'
  },
  style: {},
  max: 5,
  'allow-half': false,
  'show-text': false,
  'show-score': false,
  disabled: false
}

//组件属性
const property = {

}

export default {
  idf: 'f_rate',
  describe: '评分组件',
  type: 'select',
  idx: 11,
  controlPanel: undefined,
  config,
  property,
  render
}
