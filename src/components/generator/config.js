import componentsLoader from '@/components/loader/ComponentsLoader'

// 表单属性【右面板】
export const formConf = {
  formRef: 'elForm',
  formName: null,
  formModel: 'formData',
  size: 'medium',
  labelPosition: 'right',
  labelWidth: 100,
  formRules: 'rules',
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: true
}

// 组件清单【左面板】
export const componentSections = componentsLoader.componentSections

export const configPanels =  componentsLoader.configPanels

export const customLayouts =  componentsLoader.customLayouts

export const generators =  componentsLoader.generators
