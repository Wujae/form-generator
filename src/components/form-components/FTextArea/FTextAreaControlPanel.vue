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
      <el-form-item v-if="activeData.placeholder!==undefined" label="占位提示">
        <el-input v-model="activeData.placeholder" placeholder="请输入占位提示"/>
      </el-form-item>
      <el-form-item v-if="activeData['start-placeholder']!==undefined" label="开始占位">
        <el-input v-model="activeData['start-placeholder']" placeholder="请输入占位提示"/>
      </el-form-item>
      <el-form-item v-if="activeData['end-placeholder']!==undefined" label="结束占位">
        <el-input v-model="activeData['end-placeholder']" placeholder="请输入占位提示"/>
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

      <el-form-item v-if="activeData.__config__.showLabel !== undefined
            && activeData.__config__.labelWidth !== undefined" label="显示标签">
        <el-switch v-model="activeData.__config__.showLabel"/>
      </el-form-item>
      <el-form-item v-if="activeData['show-word-limit'] !== undefined" label="输入统计">
        <el-switch v-model="activeData['show-word-limit']"/>
      </el-form-item>
      <el-form-item v-if="activeData.clearable !== undefined" label="能否清空">
        <el-switch v-model="activeData.clearable"/>
      </el-form-item>
      <el-form-item v-if="activeData.__config__.showTip !== undefined" label="显示提示">
        <el-switch v-model="activeData.__config__.showTip"/>
      </el-form-item>
      <el-form-item v-if="activeData.readonly !== undefined" label="是否只读">
        <el-switch v-model="activeData.readonly"/>
      </el-form-item>
      <el-form-item v-if="activeData.disabled !== undefined" label="是否禁用">
        <el-switch v-model="activeData.disabled"/>
      </el-form-item>

      <el-divider>校验</el-divider>

      <el-form-item v-if="activeData.__config__.required !== undefined" label="是否必填">
        <el-switch v-model="activeData.__config__.required"/>
      </el-form-item>

      <el-form-item v-if="activeData.minlength !== undefined" label="至少输入">
        <el-input v-model="activeData.minlength" placeholder="请输入字符长度">
          <template slot="append">
            个字符
          </template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="activeData.maxlength !== undefined" label="最多输入">
        <el-input v-model="activeData.maxlength" placeholder="请输入字符长度">
          <template slot="append">
            个字符
          </template>
        </el-input>
      </el-form-item>

      <template v-for="(item, index) in activeData.__config__.regList">
        <validation-control :key="index" :item="item" @delete="activeData.__config__.regList.splice(index, 1)"></validation-control>
      </template>
      <div style="margin-left: 20px">
        <el-button icon="el-icon-circle-plus-outline" type="text" @click="addReg">
          添加规则
        </el-button>
      </div>

    </el-form>
  </div>
</template>

<script>

  import ValidationControl from '@/views/index/ValidationControl'

  /**
   * 组件配置模版
   */
  export default {
    name: "FTextAreaControlPanel",
    props: ['activeData', 'formConf'],
    components: { ValidationControl },
    data() {
      return {}
    },
    created() {
      // console.log('in f_text control panel', this);
    },
    methods: {
      setDefaultValue(val) {
        return val
      },
      onDefaultValueInput(str) {

        // 字符串和数字
        this.$set(this.activeData.__config__, 'defaultValue', str)

      },
      addReg() {
        this.activeData.__config__.regList.push({
          pattern: '',
          message: ''
        })
      },
      spanChange(val) {
        this.formConf.span = val
      }
    }
  }
</script>

<style scoped>

</style>
