import controlPanel from './LTableControlPanel'
import tableWrapper from './TableWrapper'
import tableHeader from './TableHeader'
import generator from './LTableCodeGenerator'


// 装载 table wrapper 组件
Vue.component(tableWrapper.name, tableWrapper)

// 装载 table header 组件
Vue.component(tableHeader.name, tableHeader)

/**
 * TODO
 * 子表单组件 ***
 *
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'LTableControlPanel',
  __config__: {
    idf: 'f_table',
    layout: 'form',
    subForm: 'table', //子表单属性 'table'
    label: '子表单',
    tag: 'el-table',
    tagIcon: 'row',
    defaultValue: null,
    span: 24,
    showLabel: true,
    labelWidth: null,
    required: true,
    regList: [],
    changeTag: true,
  },
  __slot__: {
    'buttons': [
      {key:'add', position:'header', type: 'primary', label: '添加', icon: "el-icon-plus", buildIn: true},
      {key:'delete', position:'all', type: 'danger', label: '删除', icon: "el-icon-close", buildIn: true}
    ]
  },
  children: [],
  'class': ['layout-table'],
  'header-row-class-name': ['layout-table-header-row'],
  'row-class-name': ['layout-table-row'],
  showIndex: false,
  selection: true
}

//组件属性
const property = {}

// 组件渲染函数
function render(h, element, index, parent, container) {

  // console.log("table render", this)

  const {activeItem} = this.$listeners
  const config = element.__config__

  let className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'
  if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'

  let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
  if (config.showLabel === false) labelWidth = '0'

  /*
  if (element.type === 'flex') {
     child = <el-row type={element.type} justify={element.justify} align={element.align}>
       {child}
     </el-row>
   }
   */
  return (
    <el-col span={config.span} class={className}>
      <el-form-item label-width='0' nativeOnClick={event => {activeItem(element); event.stopPropagation() }}>
        <table-header class="layout-table-label" conf={element}/>
        <el-row gutter={config.gutter} class='drawing-row-item' >
          <table-wrapper activeId={this.activeId} cols={element.children} widget={container.widget} formConf={this.formConf} container={this} />
        </el-row>
      </el-form-item>
      {container.widget.itemBtns.apply(this, arguments)}
    </el-col>
  )
}

export default {
  idf: 'f_table',
  describe: '子表单组件',
  type: 'layout',
  idx: 6,
  controlPanel: controlPanel,
  config,
  property,
  render,
  generator
}

