import controlPanel from './CommonComponentControlPanel'

/**
 * 通用组件控制面板，不提供 idf config render 属性的情况下，不会被组件浏览器加载
 * 自定义比较简单的组件时，可以通过这个组件简化掉组件控制面板的定义
 * 如果组件控制比较复杂，建议通过拷贝这个 controlPanel 再进行自定义编写
 * 不要大肆修改这个 controlPanel
 */
export default {
  type: 'base',
  describe: '通用组件，目前用于通用组件控制面板，不会被组件浏览器加载',
  controlPanel: controlPanel,
  idf: undefined,
  idx: 0,
  config: undefined,
  property: undefined,
  render: undefined
}
