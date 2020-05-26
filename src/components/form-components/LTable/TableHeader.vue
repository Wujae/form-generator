<template>
  <div class="layout-table-header">
    <span class="layout-table-label">{{conf.__config__.label}}</span>
    <el-button-group class="layout-table-header-button-group">
      <el-button size="mini" v-for="btn in conf.__slot__['buttons'].filter(btn => ['header', 'all'].includes(btn.position))" :key="btn.key" :icon="btn.icon" :type="btn.type">{{btn.label}}</el-button>
    </el-button-group>
  </div>
</template>

<script>
  export default {
    name: "TableHeader",
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
