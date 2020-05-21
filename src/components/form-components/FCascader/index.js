import renders from '@/components/render/render'
import controlPanel from './FCascaderControlPanel'

/**
 * 级联下拉组件
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'CommonComponentControlPanel', //使用通用面板
  __config__: {
    idf: 'f_cascader',
    layout: 'form',
    label: '级联选择C',
    showLabel: true,
    labelWidth: null,
    tag: 'el-cascader',
    tagIcon: 'cascader',
    defaultValue: [],
    dataType: 'dynamic',
    span: 24,
    required: true,
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/cascader'
  },
  options: [{
    id: 1,
    value: 1,
    label: '选项1',
    children: [{
      id: 2,
      value: 2,
      label: '选项1-1'
    }]
  }],
  placeholder: '请选择',
  style: {width: '100%'},
  props: {
    props: {
      multiple: false,
      label: 'label',
      value: 'value',
      children: 'children'
    }
  },
  'show-all-levels': true,
  disabled: false,
  clearable: true,
  filterable: false,
  separator: '/'
}

//组件属性
const property = {}

// 组件渲染函数
function render(h, element, index, parent, container) {

  //console.log("custom render", this, h, element, index, parent, container)

  const {activeItem} = this.$listeners
  const config = element.__config__
  let className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'
  if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'
  let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
  if (config.showLabel === false) labelWidth = '0'
  return (
    <el-col span={config.span} class={className} nativeOnClick={event => {
      activeItem(element); event.stopPropagation() }}>
      <el-form-item label-width={labelWidth} label={config.showLabel ? config.label : ''} required={config.required}>
        <renders key={config.renderKey} conf={element} onInput={event => {
          this.$set(config, 'defaultValue', event)
        }}/>
      </el-form-item>
      {container.widget.itemBtns.apply(this, arguments)}
    </el-col>
  )
}


export default {
  idf: 'f_cascader',
  describe: '级联下拉选择组件',
  type: 'select',
  idx: 2,
  controlPanel: undefined,
  config,
  property,
  render
}
