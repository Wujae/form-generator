<template>
  <div class="table-col-wrapper">
    <div class="col-title">{{this.element.__config__.label}}</div>
    <div class="col-cell">
      <renders :key=this.element.renderKey :conf=this.element />
    </div>
  </div>
</template>

<script>

  import renders from '@/components/render/render'

  /**
   * 表格行wrapper
   * TODO 布局组件无法被引入
   * TODO 执行render函数，渲染出单元格子内的组件样式
   */
  export default {
    name: "ColWrapper",
    components: {
      renders
    },
    props: [
      'element',
      'index',
      'drawingList',
      'activeId',
      'formConf'
    ],
    mounted() {

      const { activeItem } = this.$listeners

      console.log('in col wrapper mounted', this.element)


      let config = this.element.__config__;

      //将'showLabel'置为false
      // config.showLabel = false


    }
  }

</script>

<style lang="scss" scoped>
  .table-col-wrapper {
    width: 200px;

    .col-title {
      background-color: #FCFCFC;
      font-weight: bold;
      color: #AAA;
      padding: 0 5px;
      border: 1px solid #ECECEC;
      font-size: 13px;
      height: 40px;
    }

    .col-cell {
      min-height: 50px;
      border: 1px solid #ECECEC;

    }
  }


</style>
