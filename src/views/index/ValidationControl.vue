<template>
  <div class="reg-item">
    <span class="close-btn" @click="deleteReg">
      <i class="el-icon-close"/>
    </span>
    <el-form-item label="类型">
      <el-select v-model="item.type" clearable placeholder="请选择验证类型" @change="clearPattern">
        <el-option v-for="regType in regTypeList" :label="regType.name" :value="regType.value" :key="regType.value"/>
      </el-select>
    </el-form-item>
    <template v-if="item.type === 'reg'">
      <el-form-item label="表达式">
        <el-input v-model="item.pattern" placeholder="请输入正则"/>
      </el-form-item>
    </template>
    <el-form-item label="错误提示" style="margin-bottom:0">
      <el-input v-model="item.message" placeholder="请输入错误提示"/>
    </el-form-item>
  </div>
</template>

<script>

  /**
   * 校验规则
   */
  export default {
    name: "ValidationControl",
    props: ['item'],
    data() {
      return {
        regTypeList: [
          {name: '数字',   value: 'number'},
          {name: '整数',   value: 'integer'},
          {name: '手机号', value: 'mobile'},
          {name: '身份证', value: 'idCard'},
          {name: '邮箱地址', value: 'mail'},
          {name: '自定义正则', value: 'reg'},
        ]
      }
    },
    methods: {
      deleteReg() {
        this.$emit('delete')
      },
      clearPattern(){
        this.item.pattern = null
      }
    }
  }
</script>

<style scoped>

</style>
