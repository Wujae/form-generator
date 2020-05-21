import controlPanel from './LTableControlPanel'
import tableWrapper from './TableWrapper'

Vue.component(tableWrapper.name, tableWrapper)

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
    layout: 'layout',
    label: '子表单',
    tag: 'el-slider',
    tagIcon: 'slider',
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
      {type: 'primary', label: '添加', icon: "el-icon-plus"},
      {type: 'primary', label: '删除', icon: "el-icon-close"}
    ]
  },
  children: []
}

//组件属性
const property = {}

// 组件渲染函数
function render(h, element, index, parent, container) {

  console.log("table render", this)

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
      <el-form-item label-width={labelWidth} label={config.showLabel ? config.label : ''} required={config.required}
                    nativeOnClick={event => {activeItem(element); event.stopPropagation() }}>
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
  render
}

