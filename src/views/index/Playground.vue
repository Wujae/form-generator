<template>

  <el-form label-position="top" label-width="100px">
      <el-form-item label="公式">
        <el-input type="textarea" v-model="formula"></el-input>
      </el-form-item>

      <el-form-item label="结果">
        <el-input type="textarea" v-model="result"></el-input>
      </el-form-item>

      <el-form-item label-width="0">
        <el-button @click="doFormula">执行公式</el-button>
      </el-form-item>
  </el-form>

</template>

<script>
  import {run, now} from 'formula'

  export default {
    name: "Playground",
    data() {
      return {
        result: '',
        formula: 'sum(a, b, c)'
      }
    },
    methods: {
      doFormula() {
        this.result = run(this.formula, {a: 1, b: 2, c: 3, d: [1,2,3,4]});

        console.log(now(12312313))
      }
    }
  }
</script>

<style scoped>

</style>
