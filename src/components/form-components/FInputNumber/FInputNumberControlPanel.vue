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

      <el-form-item v-if="activeData.__vModel__!==undefined" label="默认值">
        <el-input
          :value="setDefaultValue(activeData.__config__.defaultValue)"
          placeholder="请输入默认值"
          @input="onDefaultValueInput"
        />
      </el-form-item>

      <el-form-item v-if="isShowMin" label="最小值">
        <el-input-number v-model="activeData.min" placeholder="最小值" />
      </el-form-item>
      <el-form-item v-if="isShowMax" label="最大值">
        <el-input-number v-model="activeData.max" placeholder="最大值" />
      </el-form-item>
      <el-form-item v-if="isShowStep" label="步长">
        <el-input-number v-model="activeData.step" placeholder="步数" />
      </el-form-item>
      <el-form-item v-if="activeData.__config__.tag === 'el-input-number'" label="精度">
        <el-input-number v-model="activeData.precision" :min="0" placeholder="精度" />
      </el-form-item>
      <el-form-item v-if="activeData.__config__.tag === 'el-input-number'" label="按钮位置">
        <el-radio-group v-model="activeData['controls-position']">
          <el-radio-button label="">
            默认
          </el-radio-button>
          <el-radio-button label="right">
            右侧
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="activeData.__config__.showLabel !== undefined
            && activeData.__config__.labelWidth !== undefined" label="显示标签">
        <el-switch v-model="activeData.__config__.showLabel"/>
      </el-form-item>
      <el-form-item v-if="activeData.__config__.tag === 'el-input-number'" label="严格步数">
        <el-switch v-model="activeData['step-strictly']" />
      </el-form-item>

      <el-form-item v-if="activeData.disabled !== undefined" label="是否禁用">
        <el-switch v-model="activeData.disabled"/>
      </el-form-item>
      <el-form-item v-if="activeData.__config__.required !== undefined" label="是否必填">
        <el-switch v-model="activeData.__config__.required"/>
      </el-form-item>

      <el-divider>正则校验</el-divider>
      <div
        v-for="(item, index) in activeData.__config__.regList"
        :key="index"
        class="reg-item"
      >
              <span class="close-btn" @click="activeData.__config__.regList.splice(index, 1)">
                <i class="el-icon-close"/>
              </span>
        <el-form-item label="表达式">
          <el-input v-model="item.pattern" placeholder="请输入正则"/>
        </el-form-item>
        <el-form-item label="错误提示" style="margin-bottom:0">
          <el-input v-model="item.message" placeholder="请输入错误提示"/>
        </el-form-item>
      </div>
      <div style="margin-left: 20px">
        <el-button icon="el-icon-circle-plus-outline" type="text" @click="addReg">
          添加规则
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>

  import { isNumberStr } from '@/utils/index'

  /**
   * 组件配置模版
   */
  export default {
    name: "FInputNumberControlPanel",
    props: ['activeData', 'formConf'],
    components: {

    },
    data() {
      return {
        currentNode: null,
        dialogVisible: false,
        iconsVisible: false,
        currentIconModel: null
      }
    },
    computed: {
      activeTag() {
        return this.activeData.__config__.tag
      },
      isShowMin() {
        return ['el-input-number', 'el-slider'].indexOf(this.activeTag) > -1
      },
      isShowMax() {
        return ['el-input-number', 'el-slider', 'el-rate'].indexOf(this.activeTag) > -1
      },
      isShowStep() {
        return ['el-input-number', 'el-slider'].indexOf(this.activeTag) > -1
      }
    },
    created() {
      console.log('in f_input_number control panel', this);
    },
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
        if (Array.isArray(this.activeData.__config__.defaultValue)) {
          // 数组
          this.$set(
            this.activeData.__config__,
            'defaultValue',
            str.split(',').map(val => (isNumberStr(val) ? +val : val))
          )
        } else if (['true', 'false'].indexOf(str) > -1) {
          // 布尔
          this.$set(this.activeData.__config__, 'defaultValue', JSON.parse(str))
        } else {
          // 字符串和数字
          this.$set(
            this.activeData.__config__,
            'defaultValue',
            isNumberStr(str) ? +str : str
          )
        }
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
