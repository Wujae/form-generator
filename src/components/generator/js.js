import {exportDefault, isNumberStr, titleCase} from '@/utils/index'
import rulesBuilder from '@/components/validator/rulesBuilder'

const units = {
  KB: '1024',
  MB: '1024 / 1024',
  GB: '1024 / 1024 / 1024'
}
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
  const subFormSchemaList = []
  const ruleList = []
  const optionsList = []
  const propsList = []
  const methodList = mixinMethod(type)

  const uploadVarList = []

  formConfig.fields.forEach(el => {
    buildAttributes(el, confGlobal.formModel, dataList, subFormSchemaList, ruleList, optionsList, methodList, propsList, uploadVarList)
  })

  const script = buildexport(
    formConfig,
    type,
    dataList.join('\n'),
    subFormSchemaList.join('\n'),
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
 * @param subFormSchemaList  子表单结构定义
 * @param ruleList 验证规则定义
 * @param optionsList 选项（下拉/radio/checkbox）
 * @param methodList  方法
 * @param propsList
 * @param uploadVarList
 */
function buildAttributes(scheme, parentForm, dataList, subFormSchemaList, ruleList, optionsList, methodList, propsList, uploadVarList) {
  // console.log('building js', scheme)

  const config = scheme.__config__

  //子表单字段不进行构建。 表单路径 内含有'.'的作为子表单，不直接构建入formData内
  if(parentForm.indexOf('.') === -1){
    buildData(scheme, dataList)
  }

  //构建子表单结构定义
  if(config && config.subForm) buildSubFormSchema(scheme, parentForm, subFormSchemaList)

  rulesBuilder.buildRules(scheme, parentForm, ruleList)

  const slot = scheme.__slot__

  // 特殊处理options属性
  if (scheme.options || (slot && slot.options && slot.options.length)) {
    buildOptions(scheme, optionsList)
    if (config.dataType === 'dynamic') {
      const model = `${scheme.__vModel__}Options`
      const options = titleCase(model)
      buildOptionMethod(`get${options}`, model, methodList)
    }
  }

  // 处理props
  if (scheme.props && scheme.props.props) {
    buildProps(scheme, propsList)
  }

  // 处理el-upload的action
  if (scheme.action && config.tag === 'el-upload') {
    uploadVarList.push(
      `${scheme.__vModel__}Action: '${scheme.action}',
      ${scheme.__vModel__}fileList: [],`
    )
    methodList.push(buildBeforeUpload(scheme))
    // 非自动上传时，生成手动上传的函数
    if (!scheme['auto-upload']) {
      methodList.push(buildSubmitUpload(scheme))
    }
  }

  // 构建子级组件属性
  if (scheme.children) {

    let pForm = parentForm

    if(config && config.subForm) pForm = pForm ? `${pForm}.${scheme.__vModel__}`: scheme.__vModel__

    scheme.children.forEach(item => {
      buildAttributes(item, pForm, dataList, subFormSchemaList, ruleList, optionsList, methodList, propsList, uploadVarList)
    })
  }
}

// 构建子表结构定义
function buildSubFormSchema(scheme, parentForm, subFormSchemaList){

  //子表结构 构建, 构建出子表的结构定义
  const formFields = scheme.children.reduce((p, c) => {

    const config = c.__config__;

    if (c.__vModel__ !== undefined) p[c.__vModel__] = config.defaultValue

    return p

  }, {})

  //console.log('subFormSchema', formFields)

  subFormSchemaList.push(`"${parentForm}.${scheme.__vModel__}": ${JSON.stringify(formFields)},`)

}

// 构建data
function buildData(scheme, dataList) {

  const config = scheme.__config__
  if (scheme.__vModel__ === undefined) return

  if(!config) return

  if (config.subForm) {

    dataList.push(`${scheme.__vModel__}: [],`)

  } else {

    const defaultValue = JSON.stringify(config.defaultValue)
    dataList.push(`${scheme.__vModel__}: ${defaultValue},`)
  }

  // console.log(dataList)
}

// 构建options
function buildOptions(scheme, optionsList) {
  if (scheme.__vModel__ === undefined) return
  // el-cascader直接有options属性，其他组件都是定义在slot中，所以有两处判断
  let {options} = scheme
  if (!options) options = scheme.__slot__.options
  if (scheme.__config__.dataType === 'dynamic') {
    options = []
  }
  const str = `${scheme.__vModel__}Options: ${JSON.stringify(options)},`
  optionsList.push(str)
}

// 混入处理函数
function mixinMethod(type) {
  const list = [];
  const
    minxins = {
      file: confGlobal.formBtns ? {
        submitForm: `submitForm() {
          this.$refs['${confGlobal.formRef}'].validate(valid => {
            if(!valid) return
            // TODO 提交表单
            console.log(this.formData)
          })
        },`,
        resetForm: `resetForm() {
          this.$refs['${confGlobal.formRef}'].resetFields()
        },`,
        handleCommand: `handleCommand(command) {
          
          if(typeof command === 'object' && typeof command.func === 'string'){
            console.log('handling command', command)
            if(command.func === 'custom'){
              this.customBtnClick.apply(this, command.params)
            } else {
              this[command.func].apply(this, command.params)
            }          
          }else{
            console.log('invalid command', command)
          }
          
        },`,
        addRow: `addRow(subFormPath) {
          const structure = subFormPath.split('.')
          let target =  structure.reduce((p, c) => {
            if(p[c]) return p[c]
            return p
          }, this)
  
          target.push(Object.assign({}, this.subFormSchema[subFormPath]))
        },`,
        deleteRow: `deleteRow(field, index) {
          if(typeof field !== 'string') return
    
          const tabRef = this.$refs[field]
      
          const structure = field.split('.')
          let target = structure.reduce((p, c) => {
            if (p[c]) return p[c]
            return p
          }, this)
    
          if (Number.isInteger(index)) {
            target.splice(index, 1)
          }
          else {
            const tabRef = this.$refs[field]
            if (tabRef) {
              const selection = tabRef.selection
              if (selection && Array.isArray(selection) && selection.length > 0) {
                //console.log(tabRef, selection)
                
                selection.forEach(sel => {
                  const idx = target.indexOf(sel);
                  if (idx > -1) {
                    target.splice(idx, 1)
                  }
                })
              }
              else {
                this.$message.error('请选择一条记录')
              }
            }
          }
        },`,
        customBtnClick: `customBtnClick(refKey, data, index) {
          if(this.FormScript && this.FormScript.customBtnClick){
            this.FormScript.customBtnClick(refKey, data, index)
          }
        },`
      } : null,
      dialog: {
        onOpen: 'onOpen() {},',
        onClose: `onClose() {
          this.$refs['${confGlobal.formRef}'].resetFields()
        },`,
        close: `close() {
          this.$emit('update:visible', false)
        },`,
        handelConfirm: `handelConfirm() {
          this.$refs['${confGlobal.formRef}'].validate(valid => {
            if(!valid) return
            this.close()
          })
        },`,
        handleCommand: `handleCommand(command) {
          
          if(typeof command === 'object' && typeof command.func === 'string'){
            console.log('handling command', command)
            if(command.func === 'custom'){
              this.customBtnClick.apply(this, command.params)
            } else {
              this[command.func].apply(this, command.params)
            }          
          }else{
            console.log('invalid command', command)
          }
          
        },`,
        addRow: `addRow(subFormPath) {
          const structure = subFormPath.split('.')
          let target =  structure.reduce((p, c) => {
            if(p[c]) return p[c]
            return p
          }, this)
  
          target.push(Object.assign({}, this.subFormSchema[subFormPath]))
        },`,
        deleteRow: `deleteRow(field, index) {
          if(typeof field !== 'string') return
    
          const tabRef = this.$refs[field]
      
          const structure = field.split('.')
          let target = structure.reduce((p, c) => {
            if (p[c]) return p[c]
            return p
          }, this)
    
          if (Number.isInteger(index)) {
            target.splice(index, 1)
          }
          else {
            const tabRef = this.$refs[field]
            if (tabRef) {
              const selection = tabRef.selection
              if (selection && Array.isArray(selection) && selection.length > 0) {
                //console.log(tabRef, selection)
                
                selection.forEach(sel => {
                  const idx = target.indexOf(sel);
                  if (idx > -1) {
                    target.splice(idx, 1)
                  }
                })
              }
              else {
                this.$message.error('请选择一条记录')
              }
            }
          }
        },`,
        customBtnClick: `customBtnClick(refKey, data, index) {
          if(this.FormScript && this.FormScript.customBtnClick){
            this.FormScript.customBtnClick(refKey, data, index)
          }
        },`
      }
    }

  const methods = minxins[type]
  if (methods) {
    Object.keys(methods).forEach(key => {
      list.push(methods[key])
    })
  }

  return list
}

function buildProps(scheme, propsList) {
  const str = `${scheme.__vModel__}Props: ${JSON.stringify(scheme.props.props)},`
  propsList.push(str)
}

// el-upload的BeforeUpload
function buildBeforeUpload(scheme) {
  const config = scheme.__config__
  const unitNum = units[config.sizeUnit];
  let rightSizeCode = '';
  let acceptCode = '';
  const
    returnList = []
  if (config.fileSize) {
    rightSizeCode = `let isRightSize = file.size / ${unitNum} < ${config.fileSize}
    if(!isRightSize){
      this.$message.error('文件大小超过 ${config.fileSize}${config.sizeUnit}')
    }`
    returnList.push('isRightSize')
  }
  if (scheme.accept) {
    acceptCode = `let isAccept = new RegExp('${scheme.accept}').test(file.type)
    if(!isAccept){
      this.$message.error('应该选择${scheme.accept}类型的文件')
    }`
    returnList.push('isAccept')
  }
  const str = `${scheme.__vModel__}BeforeUpload(file) {
    ${rightSizeCode}
    ${acceptCode}
    return ${returnList.join('&&')}
  },`
  return returnList.length ? str : ''
}

// el-upload的submit
function buildSubmitUpload(scheme) {
  const str = `submitUpload() {
    this.$refs['${scheme.__vModel__}'].submit()
  },`
  return str
}

function buildOptionMethod(methodName, model, methodList) {
  const str = `${methodName}() {
    // TODO 发起请求获取数据
    this.${model}
  },`
  methodList.push(str)
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
      ${selectOptions}
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
