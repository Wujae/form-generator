import renders from '@/components/render/render'
import generator from '../base/CommonFormComponentGenerator'


/**
 * tinymce - 一款富文本编辑器
 * http://tinymce.ax-z.cn
 */


//基本信息
const config = {
  // 组件的自定义配置
  __c_panel: undefined,
  __config__: {
    idf: 'f_tinymce',
    layout: 'form',
    label: '编辑器',
    showLabel: true,
    changeTag: true,
    labelWidth: null,
    tag: 'tinymce',
    tagIcon: 'rich-text',
    defaultValue: null,
    span: 24,
    required: true,
    regList: [],
  },
  height: 300, // 编辑器高度
  branding: false // 隐藏右下角品牌烙印
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
  idf: 'f_tinymce',
  describe: 'tinymce富文本组件',
  type: 'input',
  idx: 5,
  controlPanel: undefined,
  config,
  property,
  render,
  generator
}
