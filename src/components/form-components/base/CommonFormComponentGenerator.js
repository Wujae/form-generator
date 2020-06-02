import ruleTrigger from "@/components/validator/ruleTrigger";
import {tags, colWrapper, StructureBuilder as SB} from "./ComponentGenratorHelper";

/**
 * 通用form型组件html代码生成工具
 * @param scheme
 * @param confGlobal
 * @param someSpanIsNot24
 * @param path 字段路径数组
 * @return {string|*|*}
 */
export default function generator(scheme, confGlobal, someSpanIsNot24, path) {

  // console.log('in common form generator', scheme, path)

  const config = scheme.__config__
  let labelWidth = ''
  let label = `label="${config.label}"`
  if (config.labelWidth && config.labelWidth !== confGlobal.labelWidth) {
    labelWidth = `label-width="${config.labelWidth}px"`
  }
  if (config.showLabel === false) {
    labelWidth = 'label-width="0"'
    label = ''
  }

  //required通过rules进行验证
  const required = !ruleTrigger[config.tag] && config.required ? 'required' : ''

  const tagDom = tags[config.tag] ? tags[config.tag](scheme, confGlobal, path) : null

  const hidden = config.hidden? `v-show='false'` : ''

  let str

  //在el-table的单元格内时, 不需要包裹el-form-item和el-col
  if(config.isCell){

    const rules = buildRules(scheme, path)

    str = `<el-form-item label-width="0" :prop="${SB.getDataStructure(path, SB.ModeEum.PROP)} + '.' + scope.$index + '.${scheme.__vModel__}'" ${rules} ${hidden}>
        ${tagDom}
      </el-form-item>`

  }else{

    const rules = buildRules(scheme, path)

    str = `<el-form-item ${labelWidth} ${label} :prop="${SB.getDataStructure(path.concat(scheme.__vModel__), SB.ModeEum.PROP)}" ${rules} ${required} ${hidden}>
        ${tagDom}
      </el-form-item>`
  }

  //console.log('field path', path)

  str = colWrapper(scheme, str, someSpanIsNot24)
  return str
}

/**
 * 绑定校验规则
 * 通过完整的路径绑定，实现不同子表字段同名区分
 * @param scheme
 * @param path
 * @return {string}
 */
function buildRules(scheme, path) {
  const config = scheme.__config__

  if(!ruleTrigger[config.tag]) return ''

  return `:rules="rules['${path.join('.')}.${scheme.__vModel__}']"`
}
