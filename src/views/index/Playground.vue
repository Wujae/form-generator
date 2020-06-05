<template>

  <el-form label-position="top" label-width="100px">
    <el-form-item label="公式">
      <div id="functionEditor" class="function-editor"></div>
    </el-form-item>

    <el-form-item label="数据">
      <div id="dataEditor" class="data-editor"></div>
    </el-form-item>

    <el-form-item label="结果">
      <el-input type="textarea" v-model="result"></el-input>
    </el-form-item>

    <el-form-item label-width="0">
      <el-button @click="doFormula">执行公式</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
  import {now, run} from 'formula'
  import {beautifierConf} from '@/utils/index'
  import loadMonaco from '@/utils/loadMonaco'
  import loadBeautifier from '@/utils/loadBeautifier'

  let monaco, beautifier


  export default {
    name: "Playground",
    data() {
      return {
        result: '',
        functionEditor: null,
        dataEditor: null,
        data: '{"a": 1, "b": 2, "c": 3, "d": [1, 2, 3, 4]}',
        formula: 'sum(a, b, c)',
      }
    },
    mounted() {
      this.onLoad()
    },
    methods: {
      onLoad() {

        loadBeautifier(btf => {
          beautifier = btf
          this.beautifierJson = beautifier.js(this.data, beautifierConf.js)

          loadMonaco(val => {
            monaco = val
            this.initEditor('dataEditor', 'js',this.beautifierJson, this.dataEditor, 'data')
            this.initEditor('functionEditor', 'json',this.formula, this.functionEditor, 'formula')

          })

        })
      },
      initEditor(id, language, codeStr, target, model) {
        if (target) {

        } else {
          target = monaco.editor.create(document.getElementById(id), {
            value: codeStr ? codeStr : '',
            theme: 'vs-dark',
            language: language,
            automaticLayout: true
          })

          // 更新对象
          target.onKeyUp(e => {
            this[model] = target.getValue()
          })

        }
      },
      doFormula() {
        this.result = run(this.formula, JSON.parse(this.data));
        console.log('formula -> ', this.formula, 'data -> ',this.data, 'result -> ', this.result)
      }
    }
  }
</script>

<style scoped>
  .function-editor {
    height: 200px;
  }

  .data-editor {
    height: 300px;
  }
</style>
