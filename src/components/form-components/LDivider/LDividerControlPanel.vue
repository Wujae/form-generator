<template>
  <div>
    <!-- 组件属性 -->
    <el-form size="small" label-width="90px">
      <el-form-item v-if="activeData.__vModel__!==undefined" label="字段名">
        <el-input v-model="activeData.__vModel__" placeholder="请输入字段名（v-model）"/>
      </el-form-item>
      <el-form-item v-if="activeData.__config__.componentName!==undefined" label="组件名">
        {{ activeData.__config__.componentName }}
      </el-form-item>
      <el-form-item v-if="activeData.__config__.label!==undefined" label="标题">
        <el-input v-model="activeData.__config__.label" placeholder="请输入标题"/>
      </el-form-item>
      <el-form-item v-if="activeData.__config__.span!==undefined" label="表单栅格">
        <el-slider v-model="activeData.__config__.span" :max="24" :min="1" :marks="{12:''}" @change="spanChange"/>
      </el-form-item>
      {{activeData['content-position']}}
      <el-form-item v-if="activeData['content-position']!==undefined" label="标签位置">
        <el-radio-group v-model="activeData['content-position']" style="margin-bottom: 30px;">
          <el-radio-button label="left">左</el-radio-button>
          <el-radio-button label="center">中</el-radio-button>
          <el-radio-button label="right">右</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: "LDividerControlPanel",
    props: ['activeData', 'formConf'],
    methods: {
      setDefaultValue(val) {
        if (Array.isArray(val)) {
          return val.join(',')
        }
        // if (['string', 'number'].indexOf(typeof val) > -1) {
        //   return val
        // }
        if (typeof val === 'boolean') {
          return `${val}`
        }
        return val
      },
      spanChange(val) {
        this.formConf.span = val
      }
    }
  }
</script>

<style scoped>

</style>
