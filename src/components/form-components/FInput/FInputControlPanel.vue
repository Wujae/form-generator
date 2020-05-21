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
        <el-input
          :value="setDefaultValue(activeData.__config__.defaultValue)"
          placeholder="请输入默认值"
          @input="onDefaultValueInput"
        />
      </el-form-item>
      <el-form-item v-if="activeData.__slot__&&activeData.__slot__.prepend!==undefined" label="前缀">
        <el-input v-model="activeData.__slot__.prepend" placeholder="请输入前缀"/>
      </el-form-item>
      <el-form-item v-if="activeData.__slot__&&activeData.__slot__.append!==undefined" label="后缀">
        <el-input v-model="activeData.__slot__.append" placeholder="请输入后缀"/>
      </el-form-item>
      <el-form-item v-if="activeData['prefix-icon']!==undefined" label="前图标">
        <el-input v-model="activeData['prefix-icon']" placeholder="请输入前图标名称">
          <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('prefix-icon')">
            选择
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item v-if="activeData['suffix-icon'] !== undefined" label="后图标">
        <el-input v-model="activeData['suffix-icon']" placeholder="请输入后图标名称">
          <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('suffix-icon')">
            选择
          </el-button>
        </el-input>
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
    <icons-dialog :visible.sync="iconsVisible" :current="activeData[currentIconModel]" @select="setIcon"/>
  </div>
</template>

<script>

  import { isNumberStr } from '@/utils/index'
  import IconsDialog from '@/views/index/IconsDialog'

  /**
   * 组件配置模版
   */
  export default {
    name: "FInputControlPanel",
    props: ['activeData', 'formConf'],
    components: {
      IconsDialog
    },
    data() {
      return {
        currentNode: null,
        dialogVisible: false,
        iconsVisible: false,
        currentIconModel: null
      }
    },
    created() {
      console.log('in f_input control panel', this);
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
      openIconsDialog(model) {
        this.iconsVisible = true
        this.currentIconModel = model
      },
      setIcon(val) {
        this.activeData[this.currentIconModel] = val
      },
      spanChange(val) {
        this.formConf.span = val
      }
    }
  }
</script>

<style scoped>

</style>
