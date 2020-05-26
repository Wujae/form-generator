const styles = {
  'el-rate': '.el-rate{display: inline-block; vertical-align: text-top;}',
  'el-upload': '.el-upload__tip{line-height: 1.2;}',
  'el-card': `
    .layout-card {
      margin-bottom: 20px;
    }
  `,
  'el-tabs': `
    .layout-tabs {
      margin-bottom: 20px;
    }
  `,
  'el-table': ` 
    .layout-table {
      margin-bottom: 20px;
    }
    .layout-table-header {
      display: flex;
      justify-content: space-between;
      height:40px;
    }
    .layout-table-label {
    
    }
    .layout-table-row {
      
    }
    .layout-table-header-row {
      font-weight: bold;
      font-size: 13px;
    }
    .el-dropdown-link {
      cursor: pointer;
    }
  `
}

function addCss(cssList, el) {

  const config = el.__config__

  if(config){
    const css = styles[config.tag]
    css && cssList.indexOf(css) === -1 && cssList.push(css)
  }

  if (el.children) {
    el.children.forEach(el2 => addCss(cssList, el2))
  }
}

/**
 * 组装css 【入口函数】
 * @param conf
 * @return {string}
 */
export function makeUpCss(conf) {
  const cssList = []
  conf.fields.forEach(el => addCss(cssList, el))
  return cssList.join('\n')
}
