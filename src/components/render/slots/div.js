export default {
  text(h, conf, key) {
    return conf.__slot__[key]
  },
  html(h, conf, key) {

    const dataObject = {
      domProps: {
        innerHTML: conf.__slot__[key]
      }
    }

    return h('span', dataObject)
  }
}
