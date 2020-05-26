/**
 * 组件加载器
 * 自动扫描 src/components/form-components包内的组件定义， 组件定义统一按包独立存放，以index.js作为输出
 *
 */

const modulesFiles = require.context("@/components/form-components/", true, /index\.js$/);

console.log("loading components");

let componentDefinitions = [];

try {

  modulesFiles.keys().forEach(jsFile => {
    componentDefinitions = componentDefinitions.concat(modulesFiles(jsFile).default)
  });

} catch (e) {

  console.error('加载组件异常' ,e)
}

/**
 * 组件浏览器大类定义
 * @type {*[]}
 */
const SECTIONS = [
  {code: 'base', invisible: true, list: []},
  {code: 'static', name: '静态组件', list: []},
  {code: 'input', name: '输入型组件', list: []},
  {code: 'select', name: '选择型组件', list: []},
  {code: 'layout', name: '布局型组件', list: []},
]



let componentSections = SECTIONS, configPanels = [], customLayouts = {}, generators = {}

const sectionsLookUp = SECTIONS.reduce((p, c) => {
  p.push(c.code)
  return p
}, []);

function validComponentType(code){

  return sectionsLookUp.indexOf(code)
}

try {

  //console.log("component loader result", componentDefinitions)
  componentDefinitions.sort((cd1, cd2) =>  {
    if(cd1 && cd2 && cd1.idx && cd2.idx){
      if(cd1.idx > cd2.idx) return 1;
      if(cd1.idx < cd2.idx) return -1;
      if(cd1.idx === cd2.idx) return 0;
    }

  })

  console.log('组件清单%cv0.5.1',
    'background-color:#222;font-size:12px;font-weight: 500;color:#bada55; border:1px solid #222; border-radius: 5px')
  console.table(componentDefinitions, ['idf', 'type','describe'])

  componentDefinitions.forEach(cd => {
    if(cd) {

      //组件浏览器
      if(cd.type && cd.config) {

        //有索引序号则按照索引插入，否则就追加在结尾
        if(cd.idx && Number.isInteger(cd.idx)){
          componentSections[validComponentType(cd.type)].list.splice(cd.idx, 0,cd.config)
        }else{
          componentSections[validComponentType(cd.type)].list.push(cd.config)
        }
      }

      if(cd.controlPanel) configPanels = configPanels.concat(cd.controlPanel)

      // 组件渲染器
      if(cd.idf && cd.render && typeof cd.render === 'function') {
        customLayouts[cd.idf] = cd.render
      }

      // 组件代码生成器
      if(cd.idf && cd.generator && typeof  cd.generator === 'function'){
        generators[cd.idf] = cd.generator
      }
    }

  });

} catch (e) {
  console.error("组件清单解析异常" ,e)
}

export default {
  componentSections,
  configPanels,
  customLayouts,
  generators
}
