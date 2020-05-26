//tab 插槽渲染
export default {
  'el-tab-pane': (h, conf, key) => {
    const list = []

    console.log(conf)
    let child = conf.renderChildren.apply(this, arguments)
    if (conf.type === 'flex') {
      child = <el-row type={element.type} justify={element.justify} align={element.align}>
        {child}
      </el-row>
    }

    conf.children.forEach(item => {

      list.push(
        <el-tab-pane label={item.label} value={item.value} disabled={item.disabled}>
          <el-row gutter={conf.gutter} class='drawing-row-item '>
            <span class="component-name">{item.label}</span>
            <draggable list={conf.children} animation={340} group="componentsGroup" class="drag-wrapper">

            </draggable>
          </el-row>
        </el-tab-pane>)
    })

    return list
  }
}
