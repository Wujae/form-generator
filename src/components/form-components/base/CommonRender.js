import renders from '@/components/render/render'

/**
 * 通用行组件渲染函数
 */
export default function render(h, element, index, parent, container) {

  //console.log("custom render", this, h, element, index, parent, container)

  const { activeItem } = this.$listeners
  const config = element.__config__
  let className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'
  if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'
  let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
  if (config.showLabel === false) labelWidth = '0'

  const hiddenIcon = config.hidden ? <svg-icon class-name="red-alert" icon-class="eye-slash-solid" /> : ''

  //隐藏字段
  const label = <span slot="label">{hiddenIcon}{config.showLabel ? config.label : ''}</span>


  return (
    <el-col span={config.span} class={className}
            nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
      <el-form-item label-width={labelWidth} required={config.required}>
        {label}
        <renders key={config.renderKey} conf={element} onInput={ event => {
          this.$set(config, 'defaultValue', event)
        }} />
      </el-form-item>
      {container.widget.itemBtns.apply(this, arguments)}
    </el-col>
  )
}
