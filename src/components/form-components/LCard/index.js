import draggable from 'vuedraggable'
import generator from './LCardCodeGenerator'

/**
 *  卡片组件
 */

const config = {
  __c_panel: 'CommonComponentControlPanel',
  __config__: {
    idf: 'l_card',
    layout: 'layout',
    tag: 'el-card',
    tagIcon: 'card',
    label: '卡片',
    layoutTree: true
  },
  children: [],
  justify: 'start',
  align: 'top',
  'class': ['layout-card'],   //自定义class
}

const property = {}

// 组件渲染函数
function render(h, element, index, parent, container) {

  const {activeItem} = this.$listeners
  const config = element.__config__

  const className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'

  const labelWidth = config.labelWidth ? `${config.labelWidth}px` : null

  let child = container.renderChildren.apply(this, arguments)
  if (element.type === 'flex') {
    child = <el-row type={element.type} justify={element.justify} align={element.align}>
      {child}
    </el-row>
  }
  return (
    <el-col span={config.span} class={className}
            nativeOnClick={event => {activeItem(element);event.stopPropagation()}}>
      <el-form-item label-width="0">
        <el-card >
          <el-col>
            <el-row gutter={config.gutter} class='drawing-row-item '>
              <span class="component-name">{config.componentName}</span>
              <draggable list={element.children} animation={340} group="componentsGroup" class="drag-wrapper">
                {child}
              </draggable>
            </el-row>
          </el-col>
        </el-card>
      </el-form-item>
      {container.widget.itemBtns.apply(this, arguments)}
    </el-col>
  )
}

export default {
  idf: 'l_card',
  idx: 3,
  type: 'layout',
  describe: '卡片组件',
  controlPanel: undefined,
  config,
  property,
  render,
  generator
}
