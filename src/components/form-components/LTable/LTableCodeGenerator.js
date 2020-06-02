import {classBuilder, colWrapper, UNDEFINED_GENERATOR, StructureBuilder as SB} from "../base/ComponentGenratorHelper";


/**
 * Table容器代码生成器
 * @param scheme
 * @param globalConfig
 * @param someSpanIsNot24
 * @param path 字段路径数组
 * @param generators
 * @return {string|*}
 */
export default function (scheme, globalConfig, someSpanIsNot24, path, generators) {

  // console.log('building el-table', scheme)

  const config = scheme.__config__

  //table 标题表头固定
  let labelWidth = 'label-width="0"'

  let pathS = path.concat(scheme.__vModel__)

  const type = scheme.type ? `type="${scheme.type}"` : ''
  const clazz = classBuilder(scheme, globalConfig)
  const headerClass = classBuilder(scheme, globalConfig, 'header-row-class-name')
  const rowClass = classBuilder(scheme, globalConfig, 'row-class-name')


  const children = scheme.children.map(col => {
    //clone配置信息
    const cellClone = Object.assign({}, col);
    // console.log('cell config clone', cellClone)

    const cellConfig = cellClone.__config__

    //label不需要显示，也不需要行el-col包裹
    cellConfig.showLabel = false
    cellConfig.span = 24

    //v-model加上slot前缀
    cellConfig.isCell = true
    //containerForm 父表单容器
    cellConfig.containerForm = scheme.__vModel__

    return buildElTableCol(cellClone, globalConfig, someSpanIsNot24, pathS, generators)
  })

  const modelPath = path.concat(scheme.__vModel__)

  const ref = `:ref="${SB.getDataStructure(modelPath, SB.ModeEum.REF)}"`

  const tableHeader = buildTableHeader(scheme, globalConfig, modelPath)

  const selectionCol = buildSelectionCol(scheme, globalConfig)
  const indexCol = buildIndexCol(scheme, globalConfig)

  const operationCol = buildOperationCol(scheme, globalConfig, modelPath)

  const dataPath = `${path.join('_')}.${scheme.__vModel__}`

  let str = `<div ${labelWidth}>
      ${tableHeader}
      <el-table ${ref} ${type} ${clazz} ${headerClass} ${rowClass} :data="${dataPath}" border="true">
        ${selectionCol} ${indexCol} ${children.join('\n')} ${operationCol}
      </el-table>
     </div>`
  str = colWrapper(scheme, str, someSpanIsNot24)
  return str
}

/**
 * 表头 子表标题、按钮等
 * @param scheme
 * @param globalConfig
 * @param path
 */
function buildTableHeader(scheme, globalConfig, path){
  const config = scheme.__config__

  return `<div class="layout-table-header">
    <span class="layout-table-label">${config.label}</span>
    <el-button-group class="layout-table-header-button-group">
      ${buildHeaderButtons(scheme, globalConfig, path).join("\n")}
    </el-button-group>
  </div>`
}

/**
 * 构建表格头部按钮
 * @param scheme
 * @param globalConfig
 * @param path
 * @return {*}
 */
function buildHeaderButtons(scheme, globalConfig, path) {
  const buttonConfigs = scheme.__slot__['buttons']

  return buttonConfigs.filter(btn => ['header', 'all'].includes(btn.position)).map(btn => {

    //引用 方便后续扩展
    const key =`${path.join('.')}_header_${btn.key}`
    const ref = `ref="${key}"`
    const icon = `icon="${btn.icon}"`
    const type = `type="${btn.type}"`

    const methods = buildMethods(btn, scheme, globalConfig, key, path)

    return `<el-button size="mini" ${ref} ${icon} ${type} ${methods} >${btn.label}</el-button>`
  })

}

/**
 * 构建表格列
 * @param col
 * @param globalConfig
 * @param someSpanIsNot24
 * @param path
 * @param generators
 * @return {string}
 */
function buildElTableCol(col, globalConfig, someSpanIsNot24, path, generators) {

  const config = col.__config__

  const label = config.label ? `label="${config.label}"` : ''
  const name = col.value ? `name="${col.value}"` : ''
  const disabled = col.disabled ? `disabled="${col.disabled}"` : ''


  const type = col.type ? `type="${col.type}"` : ''
  const justify = col.justify ? `justify="${col.justify}"` : ''
  const align = col.align ? `align="${col.align}"` : ''
  const gutter = globalConfig.gutter ? `:gutter="${globalConfig.gutter}"` : ''

  const cellStr = buildCell(col, globalConfig, someSpanIsNot24, path, generators)

  const hidden = config.hidden? `v-if='false'` : ''

  return `<el-table-column ${label} ${hidden}>
    ${cellStr}
    </el-table-column>`

}

//选择列
function buildSelectionCol(scheme, globalConfig) {

  return scheme.selection ? `<el-table-column type="selection"  width="55"/>` : ''
}

//序号列
function buildIndexCol(scheme, globalConfig) {
  return scheme.showIndex ? `<el-table-column type="index"/>` : ''
}

//操作按钮列 删除、自定义按钮
function buildOperationCol(scheme, globalConfig, path) {

  const operationBtns = scheme.__slot__['buttons'].filter(btn => ['line', 'all'].includes(btn.position))

  //不存在行内按钮
  if(!operationBtns || !Array.isArray(operationBtns) || operationBtns.length === 0) return ''

  const label =`label="操作"`

  return `<el-table-column ${label} width="55px">
      <template slot-scope="scope">
        <el-dropdown trigger="hover" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            ${buildDropDownItem(scheme, globalConfig, path).join("\n")}
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>`

}

function buildDropDownItem(scheme, globalConfig, path) {

  const buttonConfigs = scheme.__slot__['buttons']

  return buttonConfigs.filter(btn => ['line', 'all'].includes(btn.position)).map(btn => {

    //引用 方便后续扩展
    const key =`${path.join('.')}_line_${btn.key}`
    const ref = `ref="${key}"`

    const icon = `icon="${btn.icon}"`
    const type = `type="${btn.type}"`

    const command = buildCommand(btn, scheme, globalConfig, key, path)

    return `<el-dropdown-item  ${ref} ${icon} ${type} ${command} >${btn.label}</el-dropdown-item>`
  })
}

/**
 *
 * @param cell 单元格组件配置
 * @param globalConfig 全局配置
 * @param someSpanIsNot24 暂无用
 * @param generators 组件代码生成器组
 * @param path 字段路径数组
 * @return {string}
 */
function buildCell(cell, globalConfig, someSpanIsNot24, path, generators) {
  let cellCode = UNDEFINED_GENERATOR

  // console.log('building el-table-colum\'s cell', cell, generators)

  if (generators && generators[cell.__config__.idf]) {

    cellCode = generators[cell.__config__.idf](cell, globalConfig, undefined, path, generators)

  }

  return `<template slot-scope="scope">
      ${cellCode}
    </template>`
}

/**
 * 构建按钮on-click 方法
 * @param btn
 * @param scheme
 * @param globalConfig
 * @param key
 * @param path
 * @return {string}
 */
function buildMethods(btn, scheme, globalConfig, key, path){

  if(btn.buildIn) {

    if(btn.key === 'add'){

      return `@click="addRow(${SB.getDataStructure(path, SB.ModeEum.MODEL)})"`
    }

    if(btn.key === 'delete'){

      return `@click="deleteRow(${SB.getDataStructure(path, SB.ModeEum.MODEL)})"`
    }

  }else {

    return `@click="customBtnClick('${key}', ${SB.getDataStructure(path, SB.ModeEum.MODEL)})"`
  }

}


function buildCommand(btn, scheme, globalConfig, key, path){

  if(btn.buildIn) {

    if(btn.key === 'delete'){

      return `:command="{func: 'deleteRow', params: [${SB.getDataStructure(path, SB.ModeEum.MODEL)}, scope.$index]}"`
    }

  }else {

    return `:command="{func: 'custom', params: ['${key}', ${SB.getDataStructure(path, SB.ModeEum.PATH)}, scope.$index]}"`

  }

}

