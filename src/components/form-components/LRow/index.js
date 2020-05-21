/**
 * 评分组件
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'CommonComponentControlPanel',
  __config__: {
    idf: 'l_row',
    layout: 'layout',
    tagIcon: 'row',
    label: '行容器',
    layoutTree: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/layout'
  },
  children: [],
  type: 'default',
  justify: 'start',
  align: 'top'
}

//组件属性
const property = {

}

// 组件渲染函数
function render(h, element, index, parent, container) {

  const { activeItem } = this.$listeners
  const config = element.__config__

  const className = this.activeId === config.formId
    ? 'drawing-row-item active-from-item'
    : 'drawing-row-item'
  let child = container.renderChildren.apply(this, arguments)
  if (element.type === 'flex') {
    child = <el-row type={element.type} justify={element.justify} align={element.align}>
      {child}
    </el-row>
  }
  return (
    <el-col span={config.span}>
      <el-row gutter={config.gutter} class={className}
              nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
        <span class="component-name">{config.componentName}</span>
        <draggable list={config.children} animation={340} group="componentsGroup" class="drag-wrapper">
          {child}
        </draggable>
        {container.widget.itemBtns.apply(this, arguments)}
      </el-row>
    </el-col>
  )
}

export default {
  idf: 'l_row',
  describe: '评分组件',
  type: 'layout',
  idx: 1,
  controlPanel: undefined,
  config,
  property,
  render
}
