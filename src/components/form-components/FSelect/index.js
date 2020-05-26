import renders from '@/components/render/render'
import controlPanel from './FSelectControlPanel'
import generator from '../base/CommonFormComponentGenerator'

/**
 * 下拉组件
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'FSelectControlPanel',
  __config__: {
    idf: 'f_select',
    label: '下拉选择',
    layout: 'form',
    showLabel: true,
    labelWidth: null,
    tag: 'el-select',
    tagIcon: 'select',
    defaultValue: undefined,
    span: 24,
    required: true,
    regList: [],
    changeTag: true,
  },
  __slot__: {
    options: [{
      label: '选项一',
      value: '1'
    }, {
      label: '选项二',
      value: '2'
    }]
  },
  placeholder: '请选择',
  style: { width: '100%' },
  clearable: true,
  disabled: false,
  filterable: false,
  multiple: false
}

//组件属性
const property = {

}

// 组件渲染函数
function render(h, element, index, parent, container) {

  //console.log("custom render", this, h, element, index, parent, container)

  const { activeItem } = this.$listeners
  const config = element.__config__
  let className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'
  if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'
  let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
  if (config.showLabel === false) labelWidth = '0'
  return (
    <el-col span={config.span} class={className}
            nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
      <el-form-item label-width={labelWidth}
                    label={config.showLabel ? config.label : ''} required={config.required}>
        <renders key={config.renderKey} conf={element} onInput={ event => {
          this.$set(config, 'defaultValue', event)
        }} />
      </el-form-item>
      {container.widget.itemBtns.apply(this, arguments)}
    </el-col>
  )
}


export default {
  idf: 'f_select',
  describe: '下拉选择组件',
  type: 'select',
  idx: 1,
  controlPanel: controlPanel,
  config,
  property,
  render,
  generator
}
