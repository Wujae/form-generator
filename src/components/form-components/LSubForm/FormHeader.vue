<template>
  <div class="layout-table-header">
    <span class="layout-table-label">
     <el-badge v-if="conf.showIndex" :value="'N'" class="index-symbol" type="primary"></el-badge> {{conf.__config__.label}}
      <el-button v-if="conf.collapse" type="text" icon="el-icon-arrow-down" ></el-button>
    </span>
    <el-button-group class="layout-table-header-button-group">
      <el-button size="mini"
                 v-for="btn in conf.__slot__['buttons'].filter(btn => ['header', 'all'].includes(btn.position))"
                 :key="btn.key" :icon="btn.icon" :type="btn.type">{{btn.label}}</el-button>
    </el-button-group>
  </div>
</template>

<script>
  export default {
    name: "FormHeader",
    props: [
      'conf'
    ],
    mounted(){

    }
  }
</script>

<style scoped lang="scss">
  .layout-table-header{
    display: flex;
    justify-content: space-between;
  }
</style>
