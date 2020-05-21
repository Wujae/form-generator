import controlPanel from './SHtmlControlPanel'

/**
 * TODO
 * HTML组件
 */

//基本信息
const config =   {
  __c_panel: 'SHtmlControlPanel',
  __config__: {
    idf: 'f_html',
    label: 'HTML',
    layout: 'form',
    labelWidth: null,
    showLabel: true,
    tag: 'div',
    tagIcon: 'textarea',
    defaultValue: '演示文本',
    required: true,
    span: 24,
    regList: [],
    changeTag: true,
  },
  type: 'div',
  placeholder: '请输入',
  autosize: {
    minRows: 4,
    maxRows: 4
  },
  style: { width: '100%' },
  maxlength: null,
  'show-word-limit': false,
  readonly: true
}

//组件属性
const property = {

}

// 组件渲染函数
function render(h, element, index, parent, container) {

  console.log("textarea render", this, parent)

  const { activeItem } = this.$listeners
  const config = element.__config__
  let className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'
  if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'
  let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
  if (config.showLabel === false) labelWidth = '0'
  return (
    <el-col span={config.span} class={className}
            nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
      <el-form-item label-width={labelWidth} label={config.showLabel ? config.label : ''} required={config.required}>
        <span>{config.defaultValue}</span>
      </el-form-item>
      {container.widget.itemBtns.apply(this, arguments)}
    </el-col>
  )
}


export default {
  idf: 'f_html',
  describe: 'HTML组件',
  type: 'static',
  idx: 1,
  controlPanel: controlPanel,
  config,
  property,
  render
}
