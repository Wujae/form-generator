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

      <el-form-item v-if="activeData.__config__.defaultValue !== undefined" label="默认显示">
        <el-input :value="setDefaultValue(activeData.__config__.defaultValue)"
                  placeholder="请输入默认值" @input="onDefaultValueInput"/>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

  export default {
    name: "SHiddenControlPanel",
    props: ['activeData', 'formConf'],
    methods: {
      setDefaultValue(val) {
        return val
      },
      onDefaultValueInput(str) {
        this.$set(this.activeData.__config__, 'defaultValue', str)
      },
      spanChange(val) {
        this.formConf.span = val
      }
    }
  }
</script>

<style scoped>
  .html-editor {
    height: calc(250px - 33px);
  }

</style>
