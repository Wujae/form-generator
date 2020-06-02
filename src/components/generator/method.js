//方法构建
// 混入处理函数
export default function (type, confGlobal) {
  const list = [];
  const minxins = {
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
        getStructureFormData: `getStructureFormData(path) {
          // console.log(path)
          const structure = path.split('.')
          let target = structure.reduce((p, c) => {

            let haveIndex = c.match(/\\[(\\d+)\\]/)

            if(haveIndex && haveIndex[1]){

              haveIndex = haveIndex[1]

              let nc = c.substr(0, c.lastIndexOf('['))

              //console.log("haveIndex", haveIndex, this.formData, nc)

              if(p[nc] && p[nc][haveIndex]) return p[nc][haveIndex]

            } else if(p[c]){
              return p[c]
            }
            return p
          }, this)

          //console.log(target, this.formData)
          return target
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
