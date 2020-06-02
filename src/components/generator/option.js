//option构建
export default {
  // 构建options
  buildOptions(scheme, formPath, optionsList) {
    if (scheme.__vModel__ === undefined) return
    // el-cascader直接有options属性，其他组件都是定义在slot中，所以有两处判断
    let {options} = scheme
    if (!options) options = scheme.__slot__.options
    if (scheme.__config__.dataType === 'dynamic') {
      options = []
    }
    const str = `'${formPath}.${scheme.__vModel__}Options': ${JSON.stringify(options)},`
    optionsList.push(str)
  },
  buildOptionMethod(methodName, model, methodList) {
    const str = `${methodName}() {
      // TODO 发起请求获取数据
      this.${model}
    },`
    methodList.push(str)
  }
}
