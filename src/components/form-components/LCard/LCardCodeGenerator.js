import {colWrapper, classBuilder, UNDEFINED_GENERATOR} from "../base/ComponentGenratorHelper";


/**
 * 行容器代码生成器
 * @param scheme
 * @param globalConfig
 * @param someSpanIsNot24
 * @param generators
 * @return {string|*}
 */
export default function (scheme, globalConfig, someSpanIsNot24, generators) {
  const config = scheme.__config__
  const type = scheme.type === 'default' ? '' : `type="${scheme.type}"`
  const justify = scheme.type === 'default' ? '' : `justify="${scheme.justify}"`
  const align = scheme.type === 'default' ? '' : `align="${scheme.align}"`
  const gutter = scheme.gutter ? `:gutter="${scheme.gutter}"` : ''
  const clazz = classBuilder(scheme, globalConfig)
  const children = scheme.children.map(el => {

    let code = UNDEFINED_GENERATOR

    if (generators && generators[el.__config__.idf]) {

      code = generators[el.__config__.idf](el, globalConfig, someSpanIsNot24, generators)
    }

    return code

  })

  let str = `<el-card ${clazz}>
      <el-row ${type} ${justify} ${align} ${gutter}>
        ${children.join('\n')}
      </el-row>
    </el-card>`

  str = colWrapper(scheme, str, someSpanIsNot24)
  return str
}
