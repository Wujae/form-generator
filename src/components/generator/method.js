//TODO 根据引入的组件实现按需加方案

//基础方法
const defaultMethod = {
  //获取根据路径获取formData数据结构
  getStructureFormData: `getStructureFormData(path, defaultVal) {
          // console.log(path)
          const structure = path.split('.')
          let target = structure.reduce((p, c) => {

            let haveIndex = c.match(/\\[(\\d+)\\]/)

            if(haveIndex && haveIndex[1]){

              haveIndex = haveIndex[1]

              let nc = c.substr(0, c.lastIndexOf('['))

              // console.log("haveIndex", haveIndex, this.formData, nc)

              if(p[nc] && p[nc][haveIndex] !== undefined){
                
                if(defaultVal  && !p[nc][haveIndex]) p[nc][haveIndex] = defaultVal
                return p[nc][haveIndex]
              }
            } else if(p[c] !== undefined){
              if(defaultVal && !p[c]) p[c] = defaultVal
              return p[c]
            }
            return p
          }, this)

          //console.log(target, this.formData)
          return target
        },`,
}

//文件上传相关方法
const fileUploadMethod = {
  fileUploadSuccess: `fileUploadSuccess(response, file, fileList, modelPath) {
          //文件上传成功回调
          console.log('on file upload success', response, file, fileList, modelPath)
          if(modelPath && typeof modelPath === 'string'){
            let target = this.getStructureFormData(modelPath, [])
            target.push(file)
          }
        
        },`,
  fileOnRemove: `fileOnRemove(file, fileList, modelPath){
          let target = this.getStructureFormData(modelPath)
          target.splice(target.indexOf(file), 1)
        
        },`
}

/**
 * 表单基本方法 提交 清楚 验证等
 * @param {object} formConfig
 */
const formBaseMethod = (formConfig) => {
  return {
    submitForm: `submitForm() {
          this.$refs['${formConfig.formRef}'].validate(valid => {
            if(!valid) return
            // TODO 提交表单
            console.log(this.formData)
          })
        },`,
    resetForm: `resetForm() {
          this.$refs['${formConfig.formRef}'].resetFields()
        },`,
  }
}

//子表单方法 新增。删除记录项目 自定义按钮事件等
const subFormMethod = {
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
  addRow: `addRow(fieldPath) {
          let target = this.getStructureFormData(fieldPath)
          let schemaField = fieldPath.replace(/\\[\\d+\\]/g, '')

          //拷贝对象
          target.push(JSON.parse(JSON.stringify(this.subFormSchema[schemaField])))
        },`,
  deleteRow: `deleteRow(fieldPath, index) {
          if(typeof fieldPath !== 'string') return

          let target = this.getStructureFormData(fieldPath)

          if (Number.isInteger(index)) {
            target.splice(index, 1)
          }
          else {
            //处理table 头部删除动作
            let tabRef = this.$refs[fieldPath]
                      
            if (tabRef) {
              //vue会将v-for中的ref返回一个数组
              if(Array.isArray(tabRef) && tabRef.length > 0){
                tabRef = tabRef[0]
              }
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

const dialogMethod = (formConfig) => {
  return {
    onOpen: 'onOpen() {},',
    onClose: `onClose() {
          this.$refs['${formConfig.formRef}'].resetFields()
        },`,
    close: `close() {
          this.$emit('update:visible', false)
        },`,
  }

}

//方法构建
// 混入处理函数
export default function (type, confGlobal) {
  const list = [];
  const minxins = {
    file: confGlobal.formBtns ? Object.assign({}, formBaseMethod(confGlobal), defaultMethod, fileUploadMethod, subFormMethod) : null,
    dialog: Object.assign(dialogMethod(confGlobal), defaultMethod, fileUploadMethod, subFormMethod)
  }

  const methods = minxins[type]
  if (methods) {
    Object.keys(methods).forEach(key => {
      list.push(methods[key])
    })
  }

  return list
}
