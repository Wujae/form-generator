<script>
  import draggable from 'vuedraggable'
  import render from '@/components/render/render'
  import {customLayouts} from '@/components/generator/config'

  /**
   * 组件操作小控件 （复制/删除 按钮）
   * @type {{itemBtns(*, *=, *=, *=): *}}
   */
  const widget = {
    itemBtns(h, element, index, parent) {
      console.log('install widget', h, element, index, parent)
      const { copyItem, deleteItem } = this.$listeners
      return[
        <span class="drawing-item-copy" title="复制" onClick={event => {
          copyItem(element, parent); event.stopPropagation()
        }}>
        <i class="el-icon-copy-document" />)
      </span>,
        <span class="drawing-item-delete" title="删除" onClick={event => {
          deleteItem(index, parent); event.stopPropagation()
        }}>
        <i class="el-icon-delete" />
      </span>
      ]
    }
  }

  const layouts = {
    colFormItem(h, element, index, parent) {
      //console.log(h)
      const {activeItem} = this.$listeners
      const config = element.__config__
      let className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'
      if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'
      let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
      if (config.showLabel === false) labelWidth = '0'
      return (
        <el-col span={config.span} class={className}
                nativeOnClick={event => {
                  activeItem(element);
                  event.stopPropagation()
                }}>
          <el-form-item label-width={labelWidth}
                        label={config.showLabel ? config.label : ''} required={config.required}>
            <render key={config.renderKey} conf={element} onInput={event => {
              this.$set(config, 'defaultValue', event)
            }}/>
          </el-form-item>
          {widget.itemBtns.apply(this, arguments)}
        </el-col>
      )
    },
    rowFormItem(h, element, index, parent) {
      const {activeItem} = this.$listeners
      const config = element.__config__

      const className = this.activeId === config.formId
        ? 'drawing-row-item active-from-item'
        : 'drawing-row-item'
      let child = renderChildren.apply(this, arguments)
      if (element.type === 'flex') {
        child = <el-row type={element.type} justify={element.justify} align={element.align}>
          {child}
        </el-row>
      }
      return (
        <el-col span={config.span}>
          <el-row gutter={config.gutter} class={className}
                  nativeOnClick={event => {
                    activeItem(element);
                    event.stopPropagation()
                  }}>
            <span class="component-name">{config.componentName}</span>
            <draggable list={config.children} animation={340} group="componentsGroup" class="drag-wrapper">
              {child}
            </draggable>
            {widget.itemBtns.apply(this, arguments)}
          </el-row>
        </el-col>
      )
    },
    cardItem(h, element, index, parent) {
      const {activeItem} = this.$listeners
      const config = element.__config__

      const className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'

      const labelWidth = config.labelWidth ? `${config.labelWidth}px` : null

      let child = renderChildren.apply(this, arguments)
      if (element.type === 'flex') {
        child = <el-row type={element.type} justify={element.justify} align={element.align}>
          {child}
        </el-row>
      }
      return (
        <el-col span={config.span} class={className}
                nativeOnClick={event => {
                  activeItem(element);
                  event.stopPropagation()
                }}>
          <el-card label-width={labelWidth}
                   label={config.showLabel ? config.label : ''} required={config.required}>
            <el-col span={config.span}>
              <el-row gutter={config.gutter} class='drawing-row-item '>
                <span class="component-name">{config.componentName}</span>
                <draggable list={config.children} animation={340} group="componentsGroup" class="drag-wrapper">
                  {child}
                </draggable>
              </el-row>
            </el-col>
          </el-card>
          {widget.itemBtns.apply(this, arguments)}
        </el-col>
      )
    },
    tabItem(h, element, index, parent) {
      const {activeItem} = this.$listeners
      const config = element.__config__

      const className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'

      const labelWidth = config.labelWidth ? `${config.labelWidth}px` : null

      let child = renderChildren.apply(this, arguments)
      if (element.type === 'flex') {
        child = <el-row type={element.type} justify={element.justify} align={element.align}>
          {child}
        </el-row>
      }
      return (
        <el-col span={config.span} class={className}
                nativeOnClick={event => {
                  activeItem(element);
                  event.stopPropagation()
                }}>
          <el-tabs label-width={labelWidth}
                   label={config.showLabel ? config.label : ''} required={config.required}>
            <el-tab-pane>
              <span slot="label">Tab1</span>
              <el-row gutter={config.gutter} class='drawing-row-item '>
                <span class="component-name">Tab1</span>
                <draggable list={config.children} animation={340} group="componentsGroup" class="drag-wrapper">
                  {child}
                </draggable>
              </el-row>
            </el-tab-pane>
          </el-tabs>
          {widget.itemBtns.apply(this, arguments)}
        </el-col>
      )
    }
  }

  function layoutIsNotFound() {
    throw new Error(`没有与${this.element.__config__.layout}匹配的layout`)
  }

  function isCustomLayout(layoutName) {
    return ['custom', 'layout', 'form'].indexOf(layoutName) > -1;
  }

  function renderChildren(h, element, index, parent) {

    const config = element.__config__
    if (!Array.isArray(config.children)) return null
    return config.children.map((el, i) => {

      let eleConfig = el.__config__;

      console.log("child element config", eleConfig)

      if (isCustomLayout(eleConfig.layout)) {

        const layout = customLayouts[eleConfig.idf]

        if (layout) {
          return layout.call(this, h, el, i, config.children, {widget, renderChildren, renderChildrenDirect})
        }

      } else {
        const layout = layouts[eleConfig.layout]

        if (layout) {
          return layout.call(this, h, el, i, config.children)
        }
      }

    })
  }

  function renderChildrenDirect(h, element, index, parent) {

    console.log("in render direct child element", element)

    const config = element
    if (!Array.isArray(config.children)) return null
    return config.children.map((el, i) => {

      let eleConfig = el.__config__;

      console.log("direct child element config", eleConfig)

      const layout = customLayouts[eleConfig.idf]

      if (layout) {
        return layout.call(this, h, el, i, config.children, {widget, renderChildren, renderChildrenDirect})
      }
    })
  }

  export default {
    components: {
      render,
      draggable
    },
    props: [
      'element',
      'index',
      'drawingList',
      'activeId',
      'formConf'
    ],
    render(h) {

      console.log('draggableItem render', this);

      let eleConfig = this.element.__config__;

      //console.log("eleConfig", eleConfig)

      if (isCustomLayout(eleConfig.layout)) {

        const layout = customLayouts[eleConfig.idf]

        if (layout) {
          return layout.call(this, h, this.element, this.index, this.drawingList, {
            widget,
            renderChildren,
            renderChildrenDirect
          })
        }

      } else {
        const layout = layouts[eleConfig.layout]

        if (layout) {
          return layout.call(this, h, this.element, this.index, this.drawingList)
        }
      }

      return layoutIsNotFound.call(this)
    }

    //需要注入各自组件配置
  }
</script>
