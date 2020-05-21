import controlPanel from './LDividerControlPanel'

/**
 * 分割线组件
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'LDividerControlPanel',
  __config__: {
    idf: 'f_divider',
    layout: 'layout',
    label: '分割线',
    tag: 'el-divider',
    tagIcon: 'upload',
    span: 24
  },
  'content-position': 'center'
}

function render(h, element, index, parent, container) {

  //console.log("custom render", this, h, element, index, parent, container)

  const { activeItem } = this.$listeners
  const config = element.__config__
  let className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'
  if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'

  return (
    <el-col span={config.span} class={className}
            nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
      <el-divider key={config.renderKey} conf={element}  content-position={element['content-position']}>{config.label}</el-divider>
      {container.widget.itemBtns.apply(this, arguments)}
    </el-col>
  )
}

//组件属性
const property = {

}

export default {
  idf: 'f_divider',
  describe: '分割线组件',
  type: 'layout',
  idx: 4,
  controlPanel: controlPanel,
  config,
  property,
  render
}
