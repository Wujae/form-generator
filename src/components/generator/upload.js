const units = {
  KB: '1024',
  MB: '1024 / 1024',
  GB: '1024 / 1024 / 1024'
}

//文件上传
export default {
  // el-upload的BeforeUpload
  buildBeforeUpload(scheme) {
    const config = scheme.__config__
    const unitNum = units[config.sizeUnit];
    let rightSizeCode = '';
    let acceptCode = '';
    const returnList = []

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
  },
  // el-upload的submit
  buildSubmitUpload(scheme) {
    const str = `submitUpload() {
      this.$refs['${scheme.__vModel__}'].submit()
    },`
    return str
  }

}
