import {colWrapper, classBuilder, UNDEFINED_GENERATOR} from "../base/ComponentGenratorHelper";

/**
 * Tabs容器代码生成器
 * @param scheme
 * @param globalConfig
 * @param someSpanIsNot24
 * @param path 字段路径数组
 * @param generators
 * @return {string|*}
 */
export default function (scheme, globalConfig, someSpanIsNot24, path, generators) {

  // console.log('building el-tabs', scheme)

  const config = scheme.__config__
  const type = scheme.type ? `type="${scheme.type}"` : ''
  const tabPosition = scheme.tabPosition ? `tab-position="${scheme.tabPosition}"` : ''
  const stretch = scheme.stretch ? `stretch='true'` : ''

  const clazz = classBuilder(scheme, globalConfig)

  const activeName = scheme.activeName ? `v-model="${scheme.activeName}"`
    : `value="${scheme.children[0].value}"`

  const children = scheme.children.map(tab =>
    buildElTabPanel(tab, globalConfig, someSpanIsNot24, path, generators)
  )

  let str = `<el-tabs ${type} ${activeName} ${tabPosition} ${stretch} ${clazz}>
        ${children.join('\n')}
      </el-tabs>`
  str = colWrapper(scheme, str, someSpanIsNot24)
  return str
}


function buildElTabPanel(el, globalConfig, someSpanIsNot24, path, generators) {
  const label = el.label ? `label="${el.label}"` : ''
  const name = el.value ? `name="${el.value}"` : ''
  const disabled = el.disabled ? `disabled="${el.disabled}"` : ''

  let child = buildElTabPaneChild(el, globalConfig, someSpanIsNot24, path, generators)
  if (child) child = `\n${child}\n` // 换行

  const type = el.type ? `type="${el.type}"` : ''
  const justify = el.justify ? `justify="${el.justify}"` : ''
  const align = el.align ? `align="${el.align}"` : ''
  const gutter = globalConfig.gutter ? `:gutter="${globalConfig.gutter}"` : ''

  let rowWrapper = `<el-row ${type} ${justify} ${align} ${gutter}>
      ${child}
    </el-row>`

  return `<el-tab-pane ${label} ${name} ${disabled}>${rowWrapper}</el-tab-pane>`
}

function buildElTabPaneChild(el, globalConfig, someSpanIsNot24, path, generators) {

  const children = el.children.map(paneEl => {


    let code = UNDEFINED_GENERATOR

    // console.log('building el-tab-pane\'s child', paneEl, generators)

    if (generators && generators[paneEl.__config__.idf]) {

      code = generators[paneEl.__config__.idf](paneEl, globalConfig, someSpanIsNot24, path, generators)
    }

    return code

  })

  return children.join('\n')

}
