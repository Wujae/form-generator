import ruleTrigger from "@/components/validator/ruleTrigger";
import {tags, colWrapper} from "./ComponentGenratorHelper";

/**
 * 通用form型组件html代码生成工具
 *
 */
export default function generator(scheme, confGlobal, someSpanIsNot24) {

  console.log('from generator scheme', scheme)

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

  const required = config.required ? 'required' : ''
  const tagDom = tags[config.tag] ? tags[config.tag](scheme, confGlobal) : null

  let str

  //在el-table的单元格内时, 不需要包裹el-form-item和el-col
  if(config.isCell){

    const rules = buildRules(scheme)

    str = `<el-form-item label-width="0" :prop="'${config.containerForm}.' + scope.$index + '.${scheme.__vModel__}'" ${rules}>
        ${tagDom}
      </el-form-item>`

  }else{
    str = `<el-form-item ${labelWidth} ${label} prop="${scheme.__vModel__}" ${required}>
        ${tagDom}
      </el-form-item>`
  }



  str = colWrapper(scheme, str, someSpanIsNot24)
  return str
}

/**
 * 绑定校验规则
 * @param scheme
 * @return {string}
 */
function buildRules(scheme) {
  const config = scheme.__config__

  if(!ruleTrigger[config.tag]) return ''

  return `:rules="rules.${scheme.__vModel__}"`
}
