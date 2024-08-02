import type { DragSchema } from '../interface.ts';

// 区域属性【右面板】
export const formConf = {
  templateCheck: '', // 表单校验规则
  templateRelation: '', // 单据关联关系配置

  // formModel: 'formData',
  // size: 'medium',
  // labelPosition: 'right',
  // label,
  // formRules: 'rules',
  // gutter: 15,
  // disabled: false,
  // span: 24,
  // formBtns: true
};

// 输入型组件 【左面板】
export const inputComponents: DragSchema[] = [
  {
    // 组件的自定义配置
    'colName': '单行文本',
    // labelWidth: null,
    'showLabel': true, // 显示标题
    'changeTag': true,
    'tag': 'n-input',
    'colType': 'input',
    'defaultValue': undefined,
    'colRequired': true,
    'colShowName': true, // 是否显示
    'colRepeat': false,
    'layout': 'colFormItem',
    'span': 6,
    'promptSetting': '请输入',
    // 正则校验规则
    'regList': [],
    'disabled': false,
    'clearable': true,
    'prefix-icon': '',
    'suffix-icon': '',
    'maxlength': 500,
    'show-word-limit': false,
  },
  {
    'colName': '多行文本',
    // labelWidth: null,
    'showLabel': true,
    'tag': 'n-input',
    'colType': 'textarea',
    'defaultValue': undefined,
    'colRequired': true,
    'colShowName': true,
    'layout': 'colFormItem',
    'span': 6,
    'regList': [],
    'promptSetting': '请输入',
    'changeTag': true,
    'disabled': false,
    'maxlength': 1000,
    'show-word-limit': false,
    'clearable': true,
    'autosize': {
      minRows: 4,
      maxRows: 4,
    },
  },
  {
    // 组件的自定义配置
    'colName': '数字',
    'showLabel': true,
    'changeTag': true,
    'tag': 'n-input-number',
    'colType': 'number',
    'defaultValue': undefined,
    'colRequired': true,
    'colShowName': true,
    'layout': 'colFormItem',
    'promptSetting': '请输入',
    'min': 0,
    'max': 100000000,
    'span': 6,
    'millimeter': true, // 千分位
    // 正则校验规则
    'regList': [],
    'disabled': false,
    'precision': 2,
    'step': 1,
    'controls': true, // 控制按钮
    'clearable': true,
    'prefix-icon': '',
    'suffix-icon': '',
    'formula': {},
  },
  {
    // 组件的自定义配置
    'colName': '金额',
    'showLabel': true,
    'changeTag': true,
    'tag': 'n-input-number',
    'colType': 'money',
    'defaultValue': undefined,
    'colRequired': true,
    'colShowName': true,
    'layout': 'colFormItem',
    'promptSetting': '请输入',
    // 正则校验规则
    'regList': [],
    'disabled': false,
    'precision': 2,
    'span': 6,
    'millimeter': true, // 千分位
    'step': 1,
    'controls': true, // 控制按钮
    'clearable': true,
    'prefix-icon': '',
    'suffix-icon': '',
    'formula': {},
    'max': 100000000,
    'min': 0,
  },
];

// 选择型组件 【左面板】
export const selectComponents: DragSchema[] = [
  {
    colName: '下拉选择',
    showLabel: true,
    // labelWidth: null,
    tag: 'n-select',
    colType: 'select',
    colShowName: true,
    layout: 'colFormItem',
    span: 6,
    colRequired: true,
    regList: [],
    changeTag: true,
    template_data_source: '',
    staticDat: '',
    promptSetting: '请选择',
    disabled: false,
    filterable: false,
    multiple: false,
    clearable: true,
  },
  {
    colName: '级联选择',
    url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList',
    method: 'get',
    dataPath: 'list',
    dataConsumer: 'options',
    showLabel: true,
    // labelWidth: null,
    tag: 'n-cascader',
    colType: 'cascader',
    colShowName: true,
    layout: 'colFormItem',
    defaultValue: [],
    dataType: 'STATIC_DATA',
    span: 6,
    colRequired: true,
    regList: [],
    promptSetting: '请选择',
    changeTag: true,
    filterable: false,
    disabled: false,
    clearable: true,
    separator: '/',
    checkStrictly: true,
    options: [],
  },
  {
    disabled: false,
    colName: '关联数据',
    showLabel: true,
    filterable: false,
    tag: 'n-input',
    colType: 'table',
    colShowName: true,
    layout: 'colFormItem',
    defaultValue: '',
    colRequired: true,
    regList: [],
    promptSetting: '请选择',
    changeTag: true,
    showArea: '',
    associationArea: '',
    associationSelectOptions: [],
    linkFormInfoId: '', // 关联表
    // associationSelectAjaxUrl: '/bpm/form-info/getAreasByFormInfoId',
    // associationSelectAjaxUrl: '',
    tableAjaxUrl: '/bpm/form-data/query',
    selectAjaxUrl: '/bpm/form-template/relatedDataList',
    // selectType: '',
    selectOptions: [],
    selectParmas: {},
    span: 6,
    clearable: true,
    fieldList: [
      {
        fieldCode: '',
        showName: '',
      },
    ], //  选择数据时显示的字段
    showAssociationTableData: [
      {
        fieldCode: '',
      },
    ], // 单据行数据回显的字段
    conditionList: [
      {
        fieldCode: '',
        operation: '',
        valueType: '',
        values: '',
      },
    ],
    queryList: [
      {
        fieldCode: '',
        fieldValue: '',
        fieldType: '',
        fieldResour: '',
      },
    ],
    reSetList: [
      {
        fieldCode: '',
        fieldValue: '',
        showCode: '',
      },
    ],
    allowAdd: false,
    allowDetail: false,
  },
  {
    colName: '日期选择',
    tag: 'n-date-picker',
    colType: 'date',
    defaultValue: null,
    showLabel: true,
    span: 6,
    colShowName: true,
    layout: 'colFormItem',
    colRequired: true,
    regList: [],
    promptSetting: '请选择',
    changeTag: true,
    disabled: false,
    readonly: false,
    clearable: true,
    format: 'yyyy-MM-dd',
    valueFormat: 'yyyy-MM-dd',
  },
  {
    'colName': '上传',
    'tag': 'n-upload',
    'colType': 'upload',
    'colShowName': true,
    'layout': 'colFormItem',
    'defaultValue': null,
    'showLabel': true,
    // labelWidth: null,
    'colRequired': false,
    'span': 6,
    'showTip': false,
    'buttonText': '点击上传',
    'regList': [],
    'changeTag': true,
    'fileSize': 10,
    'sizeUnit': 'MB',
    'multiple': true,
    'disabled': false,
    'auto-upload': true,
    'accept': ['jpeg,jpg,bmp,png,gif', 'rar,zip', 'doc,docx,xls,xlsx,ppt,pptx,pdf,txt,ofd', 'mp4,m4v', 'mp3,wav'],
    'name': 'file',
    'list-type': 'text',
    'action': '',
  },
];

// 布局型组件 【左面板】
export const layoutComponents: DragSchema[] = [
  {
    areaCode: '1',
    changeTag: true,
    areaName: '区域', // 区域名称
    areaShowName: 'Y', // 区域标题
    areaRemark: '', // 备注
    template_area_type: ' ', // 区域标识
    areaStype: 'TABLE', // 展示类型
    areaShowRule: '',
    layout: 'areaFormItem',
    colType: 'row',
    showLabel: true,
    colShowName: true,
    colName: '区域容器',
    layoutTree: true,
    tasks: [],
  },
];
