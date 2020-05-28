import renders from '@/components/render/render'
import FInputControlPanel from './FInputControlPanel'
import generator from '../base/CommonFormComponentGenerator'


/**
 * 单行文本框组件
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'FInputControlPanel', //组件控制面板 申明式指定
  __config__: {
    idf: 'f_input',
    layout: 'form',
    label: '单行文本',
    labelWidth: null,
    showLabel: true,
    changeTag: true,
    tag: 'el-input',
    tagIcon: 'input',
    defaultValue: undefined,
    required: true,
    span: 24,
    // 正则校验规则
    regList: []
  },
  // 组件的插槽属性
  __slot__: {
    prepend: '',
    append: ''
  },
  // 其余的为可直接写在组件标签上的属性
  placeholder: '请输入',
  style: {width: '100%'},
  clearable: true,
  'prefix-icon': '',
  'suffix-icon': '',
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

  // console.log("input render", this)

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
  idf: 'f_input',
  describe: '单行文本组件',
  type: 'input',
  idx: 1,
  controlPanel: FInputControlPanel,
  config,
  property,
  render,
  generator
}
