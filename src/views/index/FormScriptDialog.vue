<template>
  <div>
    <el-dialog v-bind="$attrs" :close-on-click-modal="false"
               :modal-append-to-body="false" v-on="$listeners" @open="onOpen" @close="onClose">
      <div class="action-bar" :style="{'text-align': 'left'}">
        <span ref="copyBtn" class="bar-btn copy-js-btn">
          <i class="el-icon-document-copy"/>复制JavaScript
        </span>
        <span class="bar-btn" @click="exportJsonFile">
          <i class="el-icon-download"/>导出到JS文件
        </span>
        <span ref="insertDefault" class="bar-btn insert-default-btn" @click="insertDefault">
          <i class="el-icon-notebook-1"/>插入默认脚本
        </span>
        <el-dropdown class="bar-btn" trigger="click" @command="insertFunction">
          <span class="el-dropdown-link">
            <i class="el-icon-circle-plus-outline" />添加预置函数
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="onLoad">表单加载事件(onLoad)</el-dropdown-item>
            <el-dropdown-item command="onValidation">表单提交验证事件(onValidation)</el-dropdown-item>
            <el-dropdown-item command="preSubmit">表单提交前事件(preSubmit)</el-dropdown-item>
            <el-dropdown-item command="afterSubmit">表单提交后事件(afterSubmit)</el-dropdown-item>
            <el-dropdown-item command="customBtnClick">自定义按钮点击事件(customBtnClick)</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div id="formScriptEditor" class="js-editor"/>
      <div class="instructions-container">
        <ul class="instructions">
          <li>支持<label class="code-label">JavaScript</label>的脚本.参考编写脚本API</li>
          <li><label class="code-label">this.form</label>对象，指向表单vue对象实例</li>
          <li>使用<label class="code-label">this</label>对象时，请注意作用域</li>
        </ul>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="handelConfirm">确定</el-button>
        <el-button @click="close">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {beautifierConf} from '@/utils/index'
  import ClipboardJS from 'clipboard'
  import {saveAs} from 'file-saver'
  import loadMonaco from '@/utils/loadMonaco'
  import loadBeautifier from '@/utils/loadBeautifier'

  const SCRIPT_TEMPLATE = {
    main: `FormScript =  {
    //表单加载事件 mounted内
    onLoad:function(){
      console.log('on load, form vue instance', this.form)
    },
}`,
    onLoad: `
    //表单加载事件 mounted内
    onLoad:function(){
      console.log('on load, form vue instance', this.form)
    },`,
    onValidation: `
    //表单提交验证事件
    onValidation:function(callback){

    },`,
    preSubmit: `
    //表单提交前事件
    preSubmit:function(){

    },`,
    afterSubmit: `
    //表单提交后事件
    afterSubmit:function(){

    },`,
    customBtnClick: `
    /**
     * 自定义按钮点击事件
     * @param {string} ref 按钮对象的refKey
     * @param {Object} data 数据对象，“头部按钮”时，为整个数组，“行按钮”为单行数据
     * @param {Number} index “行按钮”时为数据下标
     */
    customBtnClick:function(refKey, data, index){
      console.log('button clicked', refKey, data, index)
    },`
  }

  let beautifier
  let monaco

  /**
   * 表单脚本窗格
   * 用于添加表单的脚本事件
   * 包括：
   * vue钩子函数期间混入的可执行代码
   * 自定义按钮时间绑定
   * 表单数据生命周期内的函数构筑等
   */
  export default {
    name: "FormScriptDialog",
    props: {
      script: {
        type: String,
        required: false,
        beautifier: null,
        jsEditor: null
      }
    },
    mounted() {
      window.addEventListener('keydown', this.preventDefaultSave)
      const clipboard = new ClipboardJS('.copy-js-btn', {
        text: trigger => {
          this.$notify({
            title: '成功',
            message: '代码已复制到剪切板，可粘贴。',
            type: 'success'
          })
          return this.jsEditor.getValue()
        }
      })
      clipboard.on('error', e => {
        this.$message.error('代码复制失败')
      })
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.preventDefaultSave)
    },
    methods: {
      close() {
        this.$emit('update:visible', false)
      },
      handelConfirm() {
        this.$emit('commit', this.jsEditor.getValue())
        this.close()
      },
      insertDefault() {

        const defaultScript = SCRIPT_TEMPLATE.main

        this.setEditorValue(defaultScript)
      },
      preventDefaultSave(e) {
        if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
        }
      },
      onOpen() {
        loadBeautifier(btf => {
          beautifier = btf
          this.beautifierJson = beautifier.js(this.script, beautifierConf.js)

          loadMonaco(val => {
            monaco = val
            this.initEditor('formScriptEditor', this.beautifierJson)
          })
        })
      },
      onClose() {
      },
      insertFunction(commond) {

        this.insertEditorValue(SCRIPT_TEMPLATE[commond])
      },
      initEditor(id, codeStr) {
        if (this.jsEditor) {

        } else {
          this.jsEditor = monaco.editor.create(document.getElementById(id), {
            value: codeStr ? codeStr: '',
            theme: 'vs-dark',
            language: 'javascript',
            automaticLayout: true
          })

          // ctrl + s 刷新
          this.jsEditor.onKeyDown(e => {
            if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
              this.refresh()
            }
          })
        }
      },
      setEditorValue(codeStr) {

        if (this.jsEditor) {
          this.jsEditor.setValue(codeStr)
        }
      },
      insertEditorValue(codeStr) {
        if (this.jsEditor) {
          let selection = this.jsEditor.getSelection()
          let range = new monaco.Range(selection.startLineNumber, selection.startColumn, selection.endLineNumber, selection.endColumn)
          let id = { major: 1, minor: 1 }
          let op = {identifier: id, range: range, text: codeStr, forceMoveMarkers: true}
          this.jsEditor.executeEdits(this.jsEditor.getValue(), [op])
          this.jsEditor.focus()
        }
      },
      exportJsonFile() {
        this.$prompt('文件名:', '导出文件', {
          inputValue: `${+new Date()}.js`,
          closeOnClickModal: false,
          inputPlaceholder: '请输入文件名'
        }).then(({value}) => {
          if (!value) value = `${+new Date()}.js`
          const codeStr = this.jsEditor.getValue()
          const blob = new Blob([codeStr], {type: 'text/plain;charset=utf-8'})
          saveAs(blob, value)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/mixin.scss';

  @include action-bar;

  .js-editor {
    height: calc(500px - 33px);
  }

  .instructions-container {

    & > .instructions {
      color: #9c9c9c;
      font-size: 12px;
    }

    & .code-label {
      color: orange;
    }
  }
</style>
