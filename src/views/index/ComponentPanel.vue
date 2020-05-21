<script>

  /**
   * 组件属性配置面板
   */
  export default {
    functional: true,
    name: "ComponentPanel",
    props: ['activeData', 'formConf'],
    render(h, c) {

      const dataObject = {
        attrs: {},
        props: c.props,
        on: {},
        style: {}
      }

      console.log('component control panel', c.props, c.props.activeData.__c_panel);

      return h(c.props.activeData.__c_panel, dataObject)
    }
  }

</script>
