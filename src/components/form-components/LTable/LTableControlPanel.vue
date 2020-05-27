<template>
  <div>
    <!-- 组件属性 -->
    <el-form size="small" label-width="90px">
      <el-form-item v-if="activeData.__vModel__!==undefined" label="表单名">
        <el-input v-model="activeData.__vModel__" placeholder="请输入表单名（v-model）"/>
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

      <el-form-item v-if="activeData.selection !== undefined" label="选择行">
        <el-switch v-model="activeData.selection"/>
      </el-form-item>

      <el-form-item v-if="activeData.showIndex !== undefined" label="显示序号">
        <el-switch v-model="activeData.showIndex"/>
      </el-form-item>

      <el-divider>按钮</el-divider>
      <draggable :list="activeData.__slot__.buttons" :animation="340" group="buttonItem" handle=".option-drag">
        <div v-for="(item, index) in activeData.__slot__.buttons" :key="index" class="button-item">
          <div class="select-line-icon option-drag">
            <i class="el-icon-s-operation"/>
          </div>
          <div class="item-name">{{item.label}}<span class="item-key">({{item.key}})</span></div>
          <div class="button-group">
            <div class="open-button select-line-icon" @click="openButtonDialog(index)">
              <i class="el-icon-setting"/>
            </div>
            <div class="close-btn select-line-icon" @click="activeData.__slot__.buttons.splice(index, 1)">
              <i class="el-icon-remove-outline"/>
            </div>
          </div>
        </div>
      </draggable>
      <div style="margin-left: 20px;">
        <el-dropdown style="padding-bottom: 0" trigger="click" @command="addButton">
          <span class="el-dropdown-link">
            <i class="el-icon-circle-plus-outline"> 添加按钮</i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="haveAddBtn" command="add">新增</el-dropdown-item>
            <el-dropdown-item :disabled="haveDeleteBtn" command="delete">删除</el-dropdown-item>
            <el-dropdown-item command="custom">自定义按钮</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <el-divider>字段</el-divider>
      <draggable :list="activeData.children" :animation="340" group="fieldItem" handle=".option-drag">
        <div v-for="(item, index) in activeData.children" :key="index" class="field-item">
          <div class="select-line-icon option-drag">
            <i class="el-icon-s-operation"/>
          </div>
          <span>{{item.__config__.label}}</span>
          <div class="close-btn select-line-icon" @click="activeData.children.splice(index, 1)">
            <i class="el-icon-remove-outline"/>
          </div>
        </div>
      </draggable>
    </el-form>
    <button-dialog title="按钮设置" :visible.sync="buttonDialogVisible" :current="currentBtn" @commit="setButton"/>
  </div>
</template>

<script>

  import ButtonDialog from '@/views/index/ButtonDialog'
  import {isNumberStr} from '@/utils/index'

  /**
   * Tab组件控制面板
   */
  export default {
    name: "LTableControlPanel",
    components: {
      ButtonDialog
    },
    props: ['activeData', 'formConf'],
    data() {
      return {
        buttonDialogVisible: false,
        currentBtnIdx: 0
      }
    },
    computed: {
      currentBtn() {
        return this.activeData.__slot__.buttons[this.currentBtnIdx]
      },
      haveAddBtn() {
        return this.activeData.__slot__.buttons.filter(btn => btn.key === 'add').length > 0
      },
      haveDeleteBtn() {
        return this.activeData.__slot__.buttons.filter(btn => btn.key === 'delete').length > 0
      }
    },
    watch: {
      'activeData.children': {  //检查children 构造 __vModel__
        handler: function (newChildren) {

        },
        deep: true
      },
    },
    created() {

    },
    mounted() {

    },
    methods: {
      setOptionValue(item, val) {
        item.value = isNumberStr(val) ? +val : val
      },
      addButton(command) {
        let newBtn = {
          label: '自定义按钮',
          key: undefined,
          position: 'header',
          type: 'primary',
          icon: undefined,
          buildIn: false
        }

        if(command === 'add'){

          newBtn.label = '新增'
          newBtn.key = 'add'
          newBtn.icon = 'el-icon-plus'
          newBtn.buildIn = true

          this.activeData.__slot__.buttons.push(newBtn);
        }else if(command === 'delete'){

          newBtn.label = '删除'
          newBtn.key = 'delete'
          newBtn.icon = 'el-icon-close'
          newBtn.type = 'danger'
          newBtn.position = 'all'
          newBtn.buildIn = true

          this.activeData.__slot__.buttons.push(newBtn);
        }else if (command === 'custom'){

          this.activeData.__slot__.buttons.push(newBtn);
        }

      },
      openButtonDialog(btnIdx) {

        if (Number.isInteger(btnIdx)) {
          this.currentBtnIdx = btnIdx
          this.buttonDialogVisible = true
        }
      },
      setButton(data) {
        // console.log('set button', data, this.currentBtnIdx)
        if (data && Number.isInteger(this.currentBtnIdx)) {
          this.activeData.__slot__.buttons.splice(this.currentBtnIdx, 1, data)
        }

      },
      addField() {

        //TODO
        this.activeData.children.push()
      },
      spanChange(val) {
        this.formConf.span = val
      }
    }

  }
</script>

<style lang="scss" scoped>
  .el-dropdown-link {
    color: #409EFF;
  }

  .button-item {
    display: flex;
    border: 1px solid #f1f1f1;
    border-radius: 5px;
    background-color: #f1f1f1;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;

    & .el-input + .el-input {
      margin-left: 4px;
    }
    & .item-name {
      font-size: 13px;

      & .item-key {
        color: gray
      }
    }

    & .button-group {
      display: flex;
      flex-direction: row;

      & .open-button {
        cursor: pointer;
      }

      & .close-btn {
        cursor: pointer;
        color: #f56c6c;
      }
    }
  }

  .button-item + .button-item {
    margin-top: 4px;
  }

  .button-item.sortable-chosen, .field-item.sortable-chosen {
    border: 1px dashed #409eff;
  }

  .field-item {
    display: flex;
    border: 1px dashed #fff;
    border-radius: 5px;
    background-color: #f1f1f1;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    & .close-btn {
      cursor: pointer;
      color: #f56c6c;
      align-self: flex-end;
    }
    & > span {
      font-size: 12px;
    }
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
