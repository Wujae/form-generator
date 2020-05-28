import renders from '@/components/render/render'
import generator from '../base/CommonFormComponentGenerator'

/**
 * 密码输入框组件，控制面板继承 文本框控制面板
 */

//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: 'FInputControlPanel',
  __config__: {
    idf: 'f_password',
    label: '密码',
    layout: 'form',
    showLabel: true,
    labelWidth: null,
    changeTag: true,
    tag: 'el-input',
    tagIcon: 'password',
    defaultValue: undefined,
    span: 24,
    required: true,
    regList: [],
  },
  __slot__: {
    prepend: '',
    append: ''
  },
  placeholder: '请输入',
  'show-password': true,
  style: { width: '100%' },
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
  idf: 'f_password',
  type: 'input',
  idx: 3,
  describe: '密码组件',
  controlPanel: undefined,  ///未定义控制面板的情况，注意请注意使用 __c_panel 引用其他的组件的控制面板
  config,
  property,
  render,
  generator
}
