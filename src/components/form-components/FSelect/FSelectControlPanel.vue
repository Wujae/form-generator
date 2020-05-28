<template>
  <div>
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
      <el-form-item v-if="activeData.__config__.span!==undefined" label="表单栅格">
        <el-slider v-model="activeData.__config__.span" :max="24" :min="1" :marks="{12:''}" @change="spanChange" />
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

      <template v-if="['el-checkbox-group', 'el-radio-group', 'el-select'].indexOf(activeData.__config__.tag) > -1">
        <el-divider>选项</el-divider>
        <draggable :list="activeData.__slot__.options" :animation="340" group="selectItem" handle=".option-drag">
          <div v-for="(item, index) in activeData.__slot__.options" :key="index" class="select-item">
            <div class="select-line-icon option-drag">
              <i class="el-icon-s-operation"/>
            </div>
            <el-input v-model="item.label" placeholder="选项名" size="small"/>
            <el-input placeholder="选项值" size="small" :value="item.value" @input="setOptionValue(item, $event)"/>
            <div class="close-btn select-line-icon" @click="activeData.__slot__.options.splice(index, 1)">
              <i class="el-icon-remove-outline"/>
            </div>
          </div>
        </draggable>
        <div style="margin-left: 20px;">
          <el-button style="padding-bottom: 0" icon="el-icon-circle-plus-outline" type="text" @click="addSelectItem">
            添加选项
          </el-button>
        </div>
        <el-divider/>
      </template>

      <el-form-item v-if="activeData.__config__.showLabel !== undefined
            && activeData.__config__.labelWidth !== undefined" label="显示标签">
        <el-switch v-model="activeData.__config__.showLabel"/>
      </el-form-item>
      <el-form-item v-if="activeData.clearable !== undefined" label="能否清空">
        <el-switch v-model="activeData.clearable"/>
      </el-form-item>
      <el-form-item v-if="activeData.disabled !== undefined" label="是否禁用">
        <el-switch v-model="activeData.disabled"/>
      </el-form-item>
      <el-form-item v-if="activeData.__config__.tag === 'el-select'" label="能否搜索">
        <el-switch v-model="activeData.filterable"/>
      </el-form-item>
      <el-form-item v-if="activeData.__config__.tag === 'el-select'" label="是否多选">
        <el-switch v-model="activeData.multiple" @change="multipleChange"/>
      </el-form-item>

      <el-divider>校验</el-divider>

      <el-form-item v-if="activeData.__config__.required !== undefined" label="是否必填">
        <el-switch v-model="activeData.__config__.required"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: "FSelectControlPanel",
    props: ['activeData', 'formConf'],
    components: {},
    data() {
      return {
        currentNode: null,
        dialogVisible: false,
        iconsVisible: false,
        currentIconModel: null
      }
    },
    computed: {},
    created() {
      // console.log('in f_select control panel', this);
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
          this.$set(this.activeData.__config__, 'defaultValue', str.split(','))
        } else if (['true', 'false'].indexOf(str) > -1) {
          // 布尔
          this.$set(this.activeData.__config__, 'defaultValue', JSON.parse(str))
        } else {
          // 字符串和数字
          this.$set(this.activeData.__config__, 'defaultValue', str)}
      },
      setOptionValue(item, val) {
        item.value = val
      },
      addSelectItem() {
        this.activeData.__slot__.options.push({
          label: '',
          value: ''
        })
      },
      multipleChange(val) {
        this.$set(this.activeData.__config__, 'defaultValue', val ? [] : '')
      },
      spanChange(val) {
        this.formConf.span = val
      }
    }
  }
</script>

<style scoped lang="scss">
  .select-item {
    display: flex;
    border: 1px dashed #fff;
    box-sizing: border-box;
    & .close-btn {
      cursor: pointer;
      color: #f56c6c;
    }
    & .el-input + .el-input {
      margin-left: 4px;
    }
  }
  .select-item + .select-item {
    margin-top: 4px;
  }
  .select-item.sortable-chosen {
    border: 1px dashed #409eff;
  }
  .select-line-icon {
    line-height: 32px;
    font-size: 22px;
    padding: 0 4px;
    color: #777;
  }
  .option-drag {
    cursor: move;
  }

</style>
