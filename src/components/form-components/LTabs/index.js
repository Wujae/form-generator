import draggable from 'vuedraggable'
import controlPanel from './LTabsControlPanel'

//Tab组件

const config =   {
  __c_panel: 'LTabsControlPanel', //TODO Tabs组件控制面板
  __config__: {
    idf: 'l_tab',
    tag: 'el-tabs',
    layout: 'layout',
    tagIcon: 'tab',
    label: 'Tab容器C',
    layoutTree: true,
  },
  __slot__: { //Tab 插槽
    'el-tab-pane': [{
      label: '选项卡1',
      value: 'tab1',
      children: []
    }, {
      label: '选项卡2',
      value: 'tab2',
      children: []
    }]
  },
  justify: 'start',
  align: 'top',
  tabPosition: 'top'
}

const property = {

}

// 组件渲染函数
function render(h, element, index, parent, container) {

  // console.log("tabs render", this)

  const {activeItem } = this.$listeners

  const config = element.__config__

  let className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'
  if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'

  const tabs = renderTabs.call(this, h, element, container);

  return (
    <el-col span={config.span} class={className} nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
      {tabs}
      {container.widget.itemBtns.apply(this, arguments)}
    </el-col>
  )
}

function renderTabs(h, conf, container) {
    const dataObject = {
      attrs: {},
      props: {},
      on: {},
      style: {}
    }

    //console.log("in tabs render start", this, conf)

    const children = []
    // console.log("in tabs render props", conf, container)

    children.push(renderTabPane.call(this, h, conf, container))

    // console.log("in tabs render tabs", children)

    Object.keys(conf).forEach(key => {
      const val = conf[key]
      if (key === '__vModel__') {
        vModel(this, dataObject, conf.__config__.defaultValue)
      } else if (dataObject[key]) {
        dataObject[key] = {...dataObject[key], ...val}
      } else {
        dataObject.attrs[key] = val
      }
    })
    delete dataObject.attrs.__config__
    delete dataObject.attrs.__slot__
    return h('el-tabs', dataObject, children)
}


function renderTabPane(h, conf, container) {
  const list = []

  // console.log('in elTabPane', conf, container)

  conf.__slot__['el-tab-pane'].forEach((item, i) => {

    // console.log('in elTabPane ele', item)

    let child = container.renderChildrenDirect.call(this, h, item, i, item.children)

    if (conf.type === 'flex') {
      child = <el-row type={element.type} justify={element.justify} align={element.align}>
        {child}
      </el-row>
    }

    list.push(
      <el-tab-pane label={item.label} value={item.value} disabled={item.disabled}>
        <el-row gutter={conf.gutter} class='drawing-row-item'>
          <span class="component-name">{item.label}</span>
          <draggable list={item.children} animation={340} group="componentsGroup" class="drag-wrapper">
            {child}
          </draggable>
        </el-row>
      </el-tab-pane>)
  })

  return list
}

function vModel(self, dataObject, defaultValue) {
  dataObject.props.value = defaultValue

  dataObject.on.input = val => {
    self.$emit('input', val)
  }
}


export default {
  idf: 'l_tab',
  type: 'layout',
  idx: 2,
  describe: 'Tabs组件',
  controlPanel: controlPanel,
  config,
  property,
  render
}
