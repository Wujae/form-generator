import renders from '@/components/render/render'
import controlPanel from './FTextAreaControlPanel'
import generator from '../base/CommonFormComponentGenerator'


/**
 * 多行文本框组件
 */


//基本信息
const config =   {
  __c_panel: 'FTextAreaControlPanel',
  __config__: {
    idf: 'f_textarea',
    label: '多行文本',
    layout: 'form',
    labelWidth: null,
    showLabel: true,
    tag: 'el-input',
    tagIcon: 'textarea',
    defaultValue: undefined,
    required: true,
    span: 24,
    regList: [],
    changeTag: true,
  },
  type: 'textarea',
  placeholder: '请输入',
  autosize: {
    minRows: 4,
    maxRows: 4
  },
  style: { width: '100%' },
  minlength: null,
  maxlength: null,
  'show-word-limit': false,
  readonly: false,
  disabled: false
}

//组件属性
const property = {

}

// 组件渲染函数
function render(h, element, index, parent, container) {

  // console.log("textarea render", this, parent)

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
  idf: 'f_textarea',
  describe: '多行文本组件',
  type: 'input',
  idx: 2,
  controlPanel: controlPanel,
  config,
  property,
  render,
  generator
}
