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
      <el-form-item v-if="activeData.__config__.labelWidth!==undefined" label="标签宽度">
        <el-input v-model.number="activeData.__config__.labelWidth" type="number" placeholder="请输入标签宽度"/>
      </el-form-item>
      <el-form-item v-if="activeData.style&&activeData.style.width!==undefined" label="组件宽度">
        <el-input v-model="activeData.style.width" placeholder="请输入组件宽度" clearable/>
      </el-form-item>
      <el-form-item v-if="activeData.__vModel__!==undefined" label="默认值">
        <el-input :value="setDefaultValue(activeData.__config__.defaultValue)"
                  placeholder="请输入默认值" @input="onDefaultValueInput"/>
      </el-form-item>

      <el-form-item v-if="activeData.autosize !== undefined" label="最小行数">
        <el-input-number v-model="activeData.autosize.minRows" :min="1" placeholder="最小行数"/>
      </el-form-item>
      <el-form-item v-if="activeData.autosize !== undefined" label="最大行数">
        <el-input-number v-model="activeData.autosize.maxRows" :min="1" placeholder="最大行数"/>
      </el-form-item>

      <el-form-item v-if="activeData.maxlength !== undefined" label="最多输入">
        <el-input v-model="activeData.maxlength" placeholder="请输入字符长度">
          <template slot="append">
            个字符
          </template>
        </el-input>
      </el-form-item>

      <el-form-item v-if="activeData.__config__.showLabel !== undefined
            && activeData.__config__.labelWidth !== undefined" label="显示标签">
        <el-switch v-model="activeData.__config__.showLabel"/>
      </el-form-item>
      <el-form-item v-if="activeData.__config__.showTip !== undefined" label="显示提示">
        <el-switch v-model="activeData.__config__.showTip"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: "STextControlPanel",
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

</style>
