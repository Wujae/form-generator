import ruleTrigger  from './ruleTrigger'

/**
 * 基本规则定义
 * @type {{}}
 */
const RULE_DEFINE = {
  'number': {
    pattern: '/^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$/',
    message: '请输入数字类型'
  },
  'integer': {
    pattern: '/^-?[1-9]\\d*$/',
    message: '请输入整数'
  },
  'mobile': {
    pattern: '/^1(3|4|5|7|8|9)[0-9]{9}$/',
    message: '手机号格式错误'
  },
  'idCard': {
    pattern: '/^\\d{17}[\\d|x]|\\d{15}$/',
    message: '身份证号码格式有误'
  },
  'mail': {
    pattern: '/\\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\\.)+[A-Za-z]{2,14}/',
    message: '电子邮箱格式有误'
  }
}


/**
 * 生成校验规则代码使用
 * 处理子表的校验规则时候，规则名称使用完整路径，以区分不同子表的结构定义中存在同名字段的场景
 *
 */
export default {
  /**
   * 构建校验规则
   * @param scheme
   * @param parentForm 父表单
   * @param ruleList
   */
  buildRules(scheme, parentForm, ruleList) {

    // console.log('in build rules', parentForm, scheme)

    const config = scheme.__config__
    if (scheme.__vModel__ === undefined) return
    const rules = []
    if (ruleTrigger[config.tag]) {

      //必填
      if (config.required) {
        const type = Array.isArray(config.defaultValue) ? 'array' : undefined
        let message = Array.isArray(config.defaultValue) ? `请至少选择一个${config.label}` : scheme.placeholder
        if (message === undefined) message = `${config.label}不能为空`
        rules.push(buildRule(true, undefined, undefined, type, undefined, message, ruleTrigger[config.tag]))
      }

      //至少 最大 输入
      if(scheme.minlength || scheme.maxlength){
        let message = `长度在 ${scheme.minlength} 到 ${scheme.maxlength} 个字符`
        message = !scheme.minlength ? `长度不能超过 ${scheme.maxlength} 个字符` : message
        message = !scheme.maxlength ? `长度至少达到 ${scheme.minlength} 个字符` : message

        rules.push(buildRule(undefined, scheme.minlength, scheme.maxlength, undefined, undefined, message, ruleTrigger[config.tag]))
      }

      //正则 / 预置校验规则
      if (config.regList && Array.isArray(config.regList)) {
        config.regList.forEach(item => {
          if (item.pattern) {
            rules.push(buildRule(undefined, undefined, undefined, undefined, item.pattern,item.message, ruleTrigger[config.tag]))
          } else if(item.type && RULE_DEFINE[item.type]) {
            //预置规则
            let rule = RULE_DEFINE[item.type]
            if(item.message) rule.message  = item.message
            rule.trigger = ruleTrigger[config.tag]

            rules.push(buildRuleObj(rule))

          }
        })
      }
      ruleList.push(`'${parentForm}.${scheme.__vModel__}': [${rules.join(',')}],`)
    }
  }
}

function buildRule(required, min, max, type, pattern, message, trigger){

  let rule = {
    required,
    min,
    max,
    type,
    pattern,
    message,
    trigger
  }

  return buildRuleObj(rule)

}

function buildRuleObj(rule){

  let required = rule.required ? 'required: true,' : ''
  let min = rule.min ? `min: ${rule.min},` : ''
  let max = rule.max ? `max: ${rule.max},` : ''
  let type = rule.type ? `type: '${rule.type}',` : ''
  let pattern = rule.pattern ? `pattern: ${eval(rule.pattern)},` : ''
  let message = rule.message ? `message: '${rule.message}',` : ''
  let trigger = rule.trigger ? `trigger: '${rule.trigger}',` : ''

  return `{ ${required} ${min} ${max} ${type} ${pattern} ${message} ${trigger} }`

}




