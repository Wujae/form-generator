import {classBuilder, colWrapper, UNDEFINED_GENERATOR, StructureBuilder as SB} from "../base/ComponentGenratorHelper";

/**
 * 子表单代码生成器
 * @param scheme
 * @param globalConfig
 * @param someSpanIsNot24
 * @param generators
 * @param path 字段路径数组
 * @return {string|*|*}
 */
export default function (scheme, globalConfig, someSpanIsNot24, path, generators) {

  const config = scheme.__config__

  let pathS = path.concat(scheme.__vModel__)

  const type = scheme.type === 'default' ? '' : `type="${scheme.type}"`
  const justify = scheme.justify === 'default' ? '' : `justify="${scheme.justify}"`
  const align = scheme.align === 'default' ? '' : `align="${scheme.align}"`
  const gutter = scheme.gutter ? `:gutter="${scheme.gutter}"` : ''
  const children = scheme.children.map(el => {

    let code = UNDEFINED_GENERATOR

    if (generators && generators[el.__config__.idf]) {

      code = generators[el.__config__.idf](el, globalConfig, someSpanIsNot24, pathS, generators)
    }

    return code

  })

  let str = `
    ${buildHeader(scheme, globalConfig, pathS)}
    <el-row ${type} ${justify} ${align} ${gutter}>
      ${children.join('\n')}
      </el-row>
    `

  str = cardWrapper(scheme, str, globalConfig, pathS)

  str = colWrapper(scheme, str, someSpanIsNot24)

  return str
}

/**
 * 当存在"新增"按钮时，需要包裹上template 以及 v-for
 * @param scheme
 * @param str
 * @param globalConfig
 * @param path 字段路径
 */
function cardWrapper(scheme, str, globalConfig, path) {

  const clazz = classBuilder(scheme, globalConfig)

  const uuid =  path.join('_')

  const inObject = `${path.slice(0, -1).join('_')}.${scheme.__vModel__}`

  //in 对象
  const  vfor = `:key='${uuid}_idx' v-for="(${uuid}, ${uuid}_idx) in ${inObject}"`

  return `<el-card ${vfor} ${clazz}>${str}</el-card>`
}

function buildHeader(scheme, globalConfig, path) {

  const config = scheme.__config__
  const uuid =  path.join('_')

  return `<div slot="header" class="layout-card-header">
    <span class="layout-card-header-label">
      <el-badge :value="${uuid}_idx + 1" class="index-symbol" type="primary"></el-badge>
      ${config.label}
    </span>
    <el-button-group class="layout-card-header-button-group">
      ${buildHeaderButtons(scheme, globalConfig, path).join('\n')}
    </el-button-group>
  </div>`
}

/**
 * 构造子表单头部按钮
 * @param scheme
 * @param globalConfig
 * @param path
 * @return {*}
 */
function buildHeaderButtons(scheme, globalConfig, path) {
  const buttonConfigs = scheme.__slot__['buttons']

  return buttonConfigs.filter(btn => ['header', 'all'].includes(btn.position)).map(btn => {

    //引用 方便后续扩展
    const key = `${path.join(".")}_header_${btn.key}`
    const ref = `ref="${key}"`
    const icon = `icon="${btn.icon}"`
    const type = `type="${btn.type}"`

    const vshow =  btn.key === 'delete' ? `v-show="${SB.getDataStructure(path, SB.ModeEum.PATH)}.length > 1"` : ''

    const methods = buildMethods(btn, scheme, globalConfig, key, path)

    return `<el-button size="mini" ${vshow} ${ref} ${icon} ${type} ${methods} >${btn.label}</el-button>`
  })

}

function buildMethods(btn, scheme, globalConfig, key, path) {

  if (btn.buildIn) {

    if (btn.key === 'add') {

      return `@click="addRow(${SB.getDataStructure(path, SB.ModeEum.MODEL)})"`
    }

    if (btn.key === 'delete') {

      return `@click="deleteRow(${SB.getDataStructure(path, SB.ModeEum.MODEL)}, ${path.join("_")}_idx)"`
    }

  } else {

    return `@click="customBtnClick('${key}', ${SB.getDataStructure(path, SB.ModeEum.MODEL)})"`
  }

}
