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
      <el-form-item  label="默认显示">
      </el-form-item>

      <el-form-item label-width="0">
        <div id="htmlEditor" class="html-editor"></div>
      </el-form-item>

      <el-form-item v-if="activeData.__config__.showLabel !== undefined
            && activeData.__config__.labelWidth !== undefined" label="显示标签">
        <el-switch v-model="activeData.__config__.showLabel"/>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

  import {beautifierConf} from '@/utils/index'
  import loadMonaco from '@/utils/loadMonaco'
  import loadBeautifier from '@/utils/loadBeautifier'

  let beautifier
  let monaco

  export default {
    name: "SHtmlControlPanel",
    props: ['activeData', 'formConf'],
    watch: {
      activeData(nv) {
        if(this.htmlEditor)  this.htmlEditor.setValue(nv.__slot__.html)
      }
    },
    mounted() {
      this.onLoad()
    },
    methods: {
      onLoad() {
        loadBeautifier(btf => {
          beautifier = btf
          this.beautifierJson = beautifier.js(this.activeData.__slot__.html, beautifierConf.js)

          loadMonaco(val => {
            monaco = val
            this.initEditor('htmlEditor', this.beautifierJson)
          })
        })
      },
      initEditor(id, codeStr) {
        if (this.htmlEditor) {

        } else {
          this.htmlEditor = monaco.editor.create(document.getElementById(id), {
            value: codeStr ? codeStr: '',
            theme: 'vs-dark',
            language: 'html',
            automaticLayout: true
          })

          // 更新对象
          this.htmlEditor.onKeyUp(e => {
            this.activeData.__slot__.html = this.htmlEditor.getValue()
          })

        }
      },
      setDefaultValue(val) {
        return val
      },
      onDefaultValueInput(str) {
        this.$set(this.activeData.__slot__, 'html', str)
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
