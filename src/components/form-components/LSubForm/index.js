import draggable from 'vuedraggable'
import generator from './LSubFormCodeGenerator'
import formHeader from './FormHeader'

Vue.component(formHeader.name, formHeader)

/**
 * 子表单组件
 * 基于el-card实现
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'LTableControlPanel',
  __config__: {
    idf: 'l_sub_form',
    layout: 'form',
    subForm: 'form', //子表属性 'form'
    label: '子表单',
    tag: 'el-card',
    tagIcon: 'card',
    defaultValue: null,
    span: 24,
    showLabel: true,
    labelWidth: null,
    required: true,
    changeTag: true,
  },
  __slot__: {
    'buttons': [
      {key:'add', position:'header', type: 'primary', label: '添加', icon: "el-icon-plus", buildIn: true},
      {key:'delete', position:'all', type: 'danger', label: '删除', icon: "el-icon-close", buildIn: true}
    ]
  },
  type: 'default',
  justify: 'start',
  align: 'top',
  children: [],
  'class': ['layout-card'],
  'header-class-name': ['layout-form-header-row'],
  showIndex: true,
  collapse: false //允许展开/收起
}

//组件属性
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
          <div slot="header" className="clearfix">
            <form-header class="layout-table-label" conf={element}/>
          </div>
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
  idf: 'l_sub_form',
  describe: '子表单 主要应对1..*场景',
  type: 'layout',
  idx: 7,
  controlPanel: undefined,
  config,
  property,
  render,
  generator
}

