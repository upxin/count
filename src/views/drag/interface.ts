// for fast get type

import type { PropType } from 'vue';

interface Autosize {
  minRows: number
  maxRows: number
}

interface Schema {
  'colName': string
  'showLabel': boolean
  'changeTag': boolean
  'tag': string
  'colType': string
  'defaultValue': string | number | any[] | null
  'colRequired': boolean
  'colShowName': boolean
  'layout': 'areaFormItem' | 'colFormItem'
  'promptSetting': string
  'min': number
  'max': number
  'span': number
  'maxlength': number
  'millimeter': boolean
  'regList': any[]
  'disabled': boolean
  'precision': number
  'step': number
  'controls': boolean
  'clearable': boolean
  'prefix-icon': string
  'suffix-icon': string
  'colRepeat': boolean
  'show-word-limit': boolean
  'formula': Record<string, any>
  'autosize': Autosize
  'readonly': boolean
  'format': string
  'showTip': boolean
  'buttonText': string
  'fileSize': number | string
}
export type DragSchema = Partial<Schema> & { [key: string]: any };

export const DragItemProps = {
  item: {
    type: Object as PropType<DragSchema>,
  },
  dragedList: {
    type: Array as PropType<Schema[]>,
  },
  tasks: {
    type: Array as PropType<Schema[]>,
    default: () => [],
  },

};
