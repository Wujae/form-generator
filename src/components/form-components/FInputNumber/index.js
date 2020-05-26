import renders from '@/components/render/render'
import controlPanel from './FInputNumberControlPanel'
import generator from '../base/CommonFormComponentGenerator'


/**
 * 单行文本框组件
 */


//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'FInputNumberControlPanel',
  __config__: {
    idf: 'f_input_number',
    label: '计数器',
    layout: 'form',
    showLabel: true,
    changeTag: true,
    labelWidth: null,
    tag: 'el-input-number',
    tagIcon: 'number',
    defaultValue: undefined,
    span: 24,
    required: true,
    regList: [],
  },
  placeholder: '',
  min: undefined,
  max: undefined,
  step: 1,
  'step-strictly': false,
  precision: undefined,
  'controls-position': '',
  disabled: false
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
  idf: 'f_input_number',
  describe: '计数器组件',
  type: 'input',
  idx: 4,
  controlPanel: controlPanel,
  config,
  property,
  render,
  generator
}
