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

      // console.log('install widget', h, element, index, parent)

      const { copyItem, deleteItem } = this.$listeners
      return[
        <span class="drawing-item-copy" title="复制" onClick={event => {
          copyItem(element, parent); event.stopPropagation()
        }}>
        <i class="el-icon-copy-document" />
      </span>,
        <span class="drawing-item-delete" title="删除" onClick={event => {
          deleteItem(index, parent); event.stopPropagation()
        }}>
        <i class="el-icon-delete" />
      </span>
      ]
    }
  }

  function layoutIsNotFound() {
    throw new Error(`没有与${this.element.__config__.layout}匹配的layout`)
  }

  function isCustomLayout(layoutName) {
    return ['custom', 'layout', 'form'].indexOf(layoutName) > -1;
  }

  function renderChildren(h, element, index, parent) {

    // console.log("in render direct child element", element)

    const config = element
    if (!Array.isArray(config.children)) return null
    return config.children.map((el, i) => {

      let eleConfig = el.__config__;

      // console.log("direct child element config", eleConfig)

      const layout = customLayouts[eleConfig.idf]

      if (layout) {
        return layout.call(this, h, el, i, config.children, {widget, renderChildren})
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

      //console.log('draggableItem render', this);

      let eleConfig = this.element.__config__;

      //console.log("eleConfig", eleConfig)
      if (isCustomLayout(eleConfig.layout)) {

        const layout = customLayouts[eleConfig.idf]

        if (layout) {
          return layout.call(this, h, this.element, this.index, this.drawingList, {
            widget,
            renderChildren
          })
        }

      }

      return layoutIsNotFound.call(this)
    }

    //需要注入各自组件配置
  }
</script>
