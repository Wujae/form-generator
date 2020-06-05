export default [
  {
    "__c_panel": "FInputControlPanel",
    "__config__": {
      "formId": 93,
      "idf": "f_input",
      "layout": "form",
      "label": "手机号",
      "labelWidth": null,
      "showLabel": true,
      "changeTag": true,
      "tag": "el-input",
      "tagIcon": "input",
      "required": true,
      "span": 24,
      "document": "https://element.eleme.cn/#/zh-CN/component/input",
      "regList": [{
        "pattern": "/^1(3|4|5|7|8|9)\\d{9}$/",
        "message": "手机号格式错误"
      }]
    },
    "__slot__": {
      "prepend": "",
      "append": ""
    },
    "__vModel__": "mobile",
    "placeholder": "请输入手机号电话",
    "style": {
      "width": "100%"
    },
    "clearable": true,
    "prefix-icon": "el-icon-mobile",
    "suffix-icon": "",
    "maxlength": 11,
    "show-word-limit": true,
    "readonly": false,
    "disabled": false
  }, {
    "__c_panel": "LTableControlPanel",
    "__config__": {
      "idf": "l_sub_form",
      "layout": "form",
      "subForm": "form",
      "label": "子表单",
      "tag": "el-card",
      "tagIcon": "card",
      "defaultValue": null,
      "span": 24,
      "showLabel": true,
      "labelWidth": null,
      "required": true,
      "changeTag": true,
      "formId": 94,
      "renderKey": 1591345375540,
      "componentName": "l_sub_form103"
    },
    "__slot__": {
      "buttons": [{
        "key": "add",
        "position": "header",
        "type": "primary",
        "label": "添加",
        "icon": "el-icon-plus",
        "buildIn": true
      }, {
        "key": "delete",
        "position": "all",
        "type": "danger",
        "label": "删除",
        "icon": "el-icon-close",
        "buildIn": true
      }]
    },
    "type": "default",
    "justify": "start",
    "align": "top",
    "children": [{
      "__c_panel": "LTableControlPanel",
      "__config__": {
        "idf": "l_sub_form",
        "layout": "form",
        "subForm": "form",
        "label": "子表单",
        "tag": "el-card",
        "tagIcon": "card",
        "defaultValue": null,
        "span": 24,
        "showLabel": true,
        "labelWidth": null,
        "required": true,
        "changeTag": true,
        "formId": 95,
        "renderKey": 1591345382626,
        "componentName": "l_sub_form105"
      },
      "__slot__": {
        "buttons": [{
          "key": "add",
          "position": "header",
          "type": "primary",
          "label": "添加",
          "icon": "el-icon-plus",
          "buildIn": true
        }, {
          "key": "delete",
          "position": "all",
          "type": "danger",
          "label": "删除",
          "icon": "el-icon-close",
          "buildIn": true
        }]
      },
      "type": "default",
      "justify": "start",
      "align": "top",
      "children": [{
        "__c_panel": "LTableControlPanel",
        "__config__": {
          "idf": "l_table",
          "layout": "form",
          "subForm": "table",
          "label": "表格",
          "tag": "el-table",
          "tagIcon": "table",
          "defaultValue": null,
          "span": 24,
          "showLabel": true,
          "labelWidth": null,
          "required": true,
          "regList": [],
          "changeTag": true,
          "formId": 96,
          "renderKey": 1591345394174,
          "componentName": "l_table106"
        },
        "__slot__": {
          "buttons": [{
            "key": "add",
            "position": "header",
            "type": "primary",
            "label": "添加",
            "icon": "el-icon-plus",
            "buildIn": true
          }, {
            "key": "delete",
            "position": "all",
            "type": "danger",
            "label": "删除",
            "icon": "el-icon-close",
            "buildIn": true
          }]
        },
        "children": [{
          "__c_panel": "FInputControlPanel",
          "__config__": {
            "idf": "f_input",
            "layout": "form",
            "label": "单行文本",
            "labelWidth": null,
            "showLabel": true,
            "changeTag": true,
            "tag": "el-input",
            "tagIcon": "input",
            "required": true,
            "span": 24,
            "regList": [],
            "formId": 97,
            "renderKey": 1591345396408,
            "componentName": "f_input107"
          },
          "__slot__": {
            "prepend": "",
            "append": ""
          },
          "placeholder": "请输入单行文本",
          "style": {
            "width": "100%"
          },
          "clearable": true,
          "prefix-icon": "",
          "suffix-icon": "",
          "minlength": null,
          "maxlength": null,
          "show-word-limit": false,
          "readonly": false,
          "disabled": false,
          "__vModel__": "text"
        }, {
          "__c_panel": "FSelectControlPanel",
          "__config__": {
            "idf": "f_select",
            "label": "下拉选择",
            "layout": "form",
            "showLabel": true,
            "labelWidth": null,
            "tag": "el-select",
            "tagIcon": "select",
            "span": 24,
            "required": true,
            "regList": [],
            "changeTag": true,
            "formId": 98,
            "renderKey": 1591345401957,
            "componentName": "f_select109"
          },
          "__slot__": {
            "options": [{
              "label": "选项一",
              "value": "1"
            }, {
              "label": "选项二",
              "value": "2"
            }]
          },
          "placeholder": "请选择下拉选择",
          "style": {
            "width": "100%"
          },
          "clearable": true,
          "disabled": false,
          "filterable": false,
          "multiple": false,
          "__vModel__": "select"
        }],
        "class": ["layout-table"],
        "header-row-class-name": ["layout-table-header-row"],
        "row-class-name": ["layout-table-row"],
        "showIndex": false,
        "selection": true,
        "__vModel__": "table"
      }],
      "class": ["layout-card"],
      "header-class-name": ["layout-form-header-row"],
      "showIndex": true,
      "collapse": true,
      "__vModel__": "sform_s"
    }],
    "class": ["layout-card"],
    "header-class-name": ["layout-form-header-row"],
    "showIndex": false,
    "collapse": false,
    "__vModel__": "sform"
  }, {
    "__c_panel": "SHtmlControlPanel",
    "__config__": {
      "idf": "s_html",
      "label": "",
      "layout": "form",
      "labelWidth": null,
      "showLabel": false,
      "tag": "div",
      "tagIcon": "html5",
      "defaultValue": "演示文本",
      "span": 24,
      "regList": [],
      "formId": 99,
      "renderKey": 1591345359939,
      "componentName": "s_html101"
    },
    "__slot__": {
      "html": "<h1>have a <span style=\"color: red\">nice</span> day !</h1>"
    },
    "style": {
      "width": "100%"
    },
    "readonly": true,
    "__vModel__": "ht"
  }
]
