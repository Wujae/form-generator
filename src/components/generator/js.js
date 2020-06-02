import {exportDefault, isNumberStr, titleCase} from '@/utils/index'
import mixinMethod from './method'
import optionBuilder from './option'
import uploadBuilder from './upload'
import rulesBuilder from '@/components/validator/rulesBuilder'


let confGlobal
const inheritAttrs = {
  file: '',
  dialog: 'inheritAttrs: false,'
}

/**
 * 组装js 【入口函数】
 * @param {Object} formConfig 整个表单配置
 * @param {String} type 生成类型，文件或弹窗等
 */
export function makeUpJs(formConfig, type) {
  confGlobal = formConfig = JSON.parse(JSON.stringify(formConfig))
  const dataList = []
  const subFormSchemaMap = {}
  const ruleList = []
  const optionsList = []
  const propsList = []
  const methodList = mixinMethod(type, formConfig)

  const uploadVarList = []

  formConfig.fields.forEach(el => {
    buildAttributes(el, confGlobal.formModel, dataList, subFormSchemaMap, ruleList, optionsList, methodList, propsList, uploadVarList)
  })

  const script = buildexport(
    formConfig,
    type,
    dataList.join('\n'),
    Object.keys(subFormSchemaMap).map( k => `"${k}" : ${JSON.stringify(subFormSchemaMap[k])},`).join('\n'),
    ruleList.join('\n'),
    optionsList.join('\n'),
    uploadVarList.join('\n'),
    propsList.join('\n'),
    methodList.join('\n')
  )
  confGlobal = null
  return script
}

/**
 * 构建组件属性
 * @param scheme
 * @param {string} parentForm 父form名称（null时，默认为主表单）
 * @param dataList dataForm基本结构
 * @param subFormSchemaMap  子表单结构定义
 * @param ruleList 验证规则定义
 * @param optionsList 选项（下拉/radio/checkbox）
 * @param methodList  方法
 * @param propsList
 * @param uploadVarList
 */
function buildAttributes(scheme, parentForm, dataList, subFormSchemaMap, ruleList, optionsList, methodList, propsList, uploadVarList) {
  // console.log('building js', scheme)
  let currentSchema

  const config = scheme.__config__

  //构建子表单结构定义
  if(config && config.subForm) currentSchema = buildSubFormSchema(scheme, parentForm, subFormSchemaMap)

  /*
   * 字段路径 内含有'.'的作为子表单，
   * table 类子表单字段不进行直接构建
   * form 类子表单字段需要对第一个对象执行构建
   */
  if(parentForm.indexOf('.') === -1){
    buildData(scheme, dataList, currentSchema)
  }

  rulesBuilder.buildRules(scheme, parentForm, ruleList)

  const slot = scheme.__slot__

  // 特殊处理options属性
  if (scheme.options || (slot && slot.options && slot.options.length)) {
    //buildOptions(scheme, parentForm, optionsList)

    optionBuilder.buildOptions(scheme, parentForm, optionsList)

    //TODO 动态加载options
    /*
    if (config.dataType === 'dynamic') {

      const model = `${scheme.__vModel__}Options`
      const options = titleCase(model)
      optionBuilder.buildOptionMethod(`get${options}`, model, methodList)

    }
    */
  }

  // 处理props el-cascader
  if (scheme.props && scheme.props.props) {
    buildProps(scheme, propsList)
  }

  // 处理el-upload的action
  if (scheme.action && config.tag === 'el-upload') {
    uploadVarList.push(
      `${scheme.__vModel__}Action: '${scheme.action}',
      ${scheme.__vModel__}fileList: [],`
    )
    methodList.push(uploadBuilder.buildBeforeUpload(scheme))

    // 非自动上传时，生成手动上传的函数
    if (!scheme['auto-upload']) {
      methodList.push(uploadBuilder.buildSubmitUpload(scheme))
    }
  }

  // 构建子级组件属性
  if (scheme.children) {

    let pForm = parentForm

    if(config && config.subForm) pForm = pForm ? `${pForm}.${scheme.__vModel__}`: scheme.__vModel__

    scheme.children.forEach(item => {
      buildAttributes(item, pForm, dataList, subFormSchemaMap, ruleList, optionsList, methodList, propsList, uploadVarList)
    })
  }
}

/**
 * 构建子表结构定义
 * 递归内部嵌套子表 实现完整的结构解析
 * @param scheme
 * @param parentForm
 * @param subFormSchemaMap
 * @return {*}
 */
function buildSubFormSchema(scheme, parentForm, subFormSchemaMap){

  //子表结构 构建, 构建出子表的结构定义
  const formFields = scheme.children.reduce((p, cs) => {

    const config = cs.__config__, csc = cs.children

    if(csc && Array.isArray(csc)) {

      const subFormFields = buildSubFormSchema(cs, `${parentForm}.${scheme.__vModel__}`, subFormSchemaMap)

      if (cs.__vModel__ !== undefined) p[cs.__vModel__] = config.subForm === 'table'? [] :  [ subFormFields ]
    }  else {

      if (cs.__vModel__ !== undefined) p[cs.__vModel__] = config.defaultValue
    }

    return p

  }, {})

  // console.log('subFormSchema', formFields)

  subFormSchemaMap[`${parentForm}.${scheme.__vModel__}`] = formFields

  return formFields

}

// 构建data
function buildData(scheme, dataList, currentSchema) {

  const config = scheme.__config__
  if (scheme.__vModel__ === undefined) return

  if(!config) return

  //form类子表单需要提供一个初始的scheme定义
  if (config.subForm) {

    dataList.push(`${scheme.__vModel__} : [${config.subForm === 'form' ? JSON.stringify(currentSchema): ''}],`)

  } else {

    const defaultValue = JSON.stringify(config.defaultValue)
    dataList.push(`${scheme.__vModel__}: ${defaultValue},`)
  }

  // console.log(dataList)
}

function buildProps(scheme, propsList) {
  const str = `${scheme.__vModel__}Props: ${JSON.stringify(scheme.props.props)},`
  propsList.push(str)
}

// js整体拼接
function buildexport(conf, type, data, subFormSchema, rules, selectOptions, uploadVar, props, methods) {
  const str = `${exportDefault}{
  ${inheritAttrs[type]}
  components: {},
  props: [],
  data () {
    return {
      ${conf.formModel}: {
        ${data}
      },
      subFormSchema: {
        ${subFormSchema}
      },
      ${conf.formRules}: {
        ${rules}
      },
      ${uploadVar}
      options: {${selectOptions}},
      ${props}
    }
  },
  computed: {},
  watch: {},
  created () {
    ${mixinCreated(conf)}
  },
  mounted () {
    ${mixinMounted(conf)}
  },
  methods: {
    ${methods}
    ${mixinLoadFormScript(conf)}
  }
}
`
  return str
}

function mixinCreated(formConfig){
  if(formConfig && formConfig.script && formConfig.script.trim().length > 0){

    return `
      this.installFormScript()
      `
  }

  return ''
}

function mixinMounted(formConfig){
  if(formConfig && formConfig.script && formConfig.script.trim().length > 0){

    return `
      if(this.FormScript && this.FormScript.onLoad){
        this.FormScript.onLoad()
      }
    `
  }

  return ''
}

function mixinLoadFormScript(formConfig){

  if(formConfig && formConfig.script && formConfig.script.trim().length > 0){

    return `
    installFormScript() {
      this.${formConfig.script.trim()}
      this.FormScript.form = this
    },`
  }

  return ''
}

function mixinOnValidation(formConfig){

  if(formConfig && formConfig.script && formConfig.script.trim().length > 0){

    return `
      if(this.FormScript && this.FormScript.onValidation){
        this.FormScript.onValidation()
      }
    `
  }

  return ''

}
