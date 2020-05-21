<template>
  <div>
    <!-- 组件属性 -->
    <el-form size="small" label-width="90px">
      <el-form-item v-if="activeData.__config__.componentName!==undefined" label="组件名">
        {{ activeData.__config__.componentName }}
      </el-form-item>
      <el-form-item v-if="activeData.__config__.label!==undefined" label="标题">
        <el-input v-model="activeData.__config__.label" placeholder="请输入标题"/>
      </el-form-item>

      <el-form-item v-if="activeData.__config__.span!==undefined" label="表单栅格">
        <el-slider v-model="activeData.__config__.span" :max="24" :min="1" :marks="{12:''}" @change="spanChange"/>
      </el-form-item>

      <el-divider>按钮</el-divider>
      <draggable :list="activeData.__slot__.buttons" :animation="340" group="selectItem" handle=".option-drag">
        <div v-for="(item, index) in activeData.__slot__.buttons" :key="index" class="select-item">
          <div class="select-line-icon option-drag">
            <i class="el-icon-s-operation"/>
          </div>
          <el-input v-model="item.label" placeholder="按钮名称" size="small"/>
          <el-input placeholder="选项值" size="small" :value="item.value" @input="setOptionValue(item, $event)"/>
          <div class="close-btn select-line-icon" @click="activeData.__slot__.buttons.splice(index, 1)">
            <i class="el-icon-remove-outline"/>
          </div>
        </div>
      </draggable>
      <div style="margin-left: 20px;">
        <el-button style="padding-bottom: 0" icon="el-icon-circle-plus-outline" type="text" @click="addSelectItem">
          添加选项
        </el-button>
      </div>

    </el-form>
  </div>
</template>

<script>

  import {isNumberStr} from '@/utils/index'

  /**
   * Tab组件控制面板
   */
  export default {
    name: "LTableControlPanel",
    props: ['activeData', 'formConf'],
    data() {
      return {}
    },
    created() {

    },
    mounted() {

    },
    methods: {
      setOptionValue(item, val) {
        item.value = isNumberStr(val) ? +val : val
      },
      addSelectItem() {

        this.activeData.__slot__['el-tab-pane'].push({
          label: '',
          value: ''
        })
      },
      spanChange(val) {
        this.formConf.span = val
      }
    }

  }
</script>

<style lang="scss" scoped>
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
