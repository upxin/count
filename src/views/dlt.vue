<template>
  <el-table :data="tableData" border row-key="id" height="900">
    <el-table-column type="index" align="center" width="34" label="序号"></el-table-column>
    <el-table-column
      v-for="(col, index) in tableColumns"
      :key="index"
      :prop="col.prop"
      :label="col.label"
      align="center"
      width="38"
    >
      <template #default="{ row }">
        <div
          @click="handleNum(row, col.prop)"
          :class="[
            col.prop === '#' ? '' : 'ball',
            hideNumbers ? 'hideNumbers' : '',
            getClass(row, col.label, col.prop),
          ]"
        >
          {{ getStr(row, col.prop, col.label) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="{ row }">
        <el-button type="danger" text @click="deleteRow(row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="button-group">
    <el-button @click="$router.push('/ssq')" type="success">去双色球</el-button>
    <el-button @click="clear" type="danger">清空数据</el-button>
    <el-button @click="toggleNumberVisibility" type="primary">显示隐藏</el-button>
    <el-button @click="addRow" type="primary">增加行</el-button>
    <el-button @click="getData" type="success">获取字符串</el-button>
    <el-button @click="visible = true" type="success">搜索</el-button>
  </div>
  <Search v-model:model-value="visible" key="ssqStr"></Search>
  <div style="display: flex; justify-content: center">
    <div v-if="isSupported">
      <el-button type="primary" @click="copy(source)">
        <span v-if="!copied">Copy</span>
        <span v-else>Copied!</span>
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick, shallowRef, computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import Sortable from 'sortablejs'
import Search from './components/Search.vue'
import { useClipboard } from '@vueuse/core'
interface TableData {
  id: string
  [key: string]: string | number
}

interface SelectedNumbers {
  [key: string]: string | number
}

const visible = ref(false)
const source = ref('Hello')
const { text, copy, copied, isSupported } = useClipboard({ source })
// 表格列配置
const tableColumns = ref([
  ...Array.from({ length: 35 }, (_, i) => ({
    prop: `before${i + 1}`,
    label: `${i + 1}`,
  })),
  { label: '#', prop: '#' },
  ...Array.from({ length: 12 }, (_, i) => ({
    prop: `after${i + 1}`,
    label: `${i + 1}`,
  })),
])

// 响应式数据
const tableData = ref<TableData[]>([])
const selectedNumbers = ref(new Set())
const hideNumbers = ref(false)

function getNewRow() {
  return [
    ...Array.from({ length: 35 }, (_, i) => ({
      [`before${i + 1}`]: `${i + 1}`,
    })),
    { '#': '#' },
    ...Array.from({ length: 12 }, (_, i) => ({
      [`after${i + 1}`]: `${i + 1}`,
    })),
  ]
}

function getStr(row, prop, label) {
  let len = 0
  if (label === '#') {
    for (const element of selectedNumbers.value) {
      if (element.includes('before') && element.includes(row.id)) {
        len += 1
      }
    }
    return `# ${len} #`
  }
  return label
}

function handleNum(row: any, prop: string) {
  const key = `${row.id},${prop}`
  if (selectedNumbers.value.has(key)) {
    selectedNumbers.value.delete(key)
    return
  }
  selectedNumbers.value.add(key)
  if (prop.includes('after') || prop === '#') {
    saveData()
  }
}

function getClass(row: any, label: string, prop: string) {
  const key = `${row.id},${prop}`
  const checked = selectedNumbers.value.has(key)
  if (prop === '#' && checked) {
    return 'isGold'
  }
  if (prop.startsWith('before') && checked) {
    return 'isRed'
  }
  if (checked) {
    return 'isBlue'
  }
}

function getData() {
  const resultMap = new Map()
  // 遍历数据
  for (const val of selectedNumbers.value) {
    const [id, str] = val.split(',')
    const isBefore = str.startsWith('before')
    const number = str.slice(isBefore ? 6 : 5)

    if (!resultMap.has(id)) {
      resultMap.set(id, { before: [], after: [] })
    }

    const entry = resultMap.get(id)
    if (isBefore) {
      entry.before.push(number)
    } else {
      entry.after.push(number)
    }
  }

  // 转换为二维数组
  const result = []
  for (const { before, after } of resultMap.values()) {
    const combined = [...before, '#', ...after].join(' ')
    result.push(combined)
  }
  source.value = result.join('\n')
  localStorage.setItem('ssqStr', result.join('\n'))
  return result.join('\n')
}
// 生成唯一 ID
const generateUniqueId = () => {
  return `row-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// 添加新行
const addRow = () => {
  const helper = () => {
    const id = generateUniqueId()
    const obj: TableData = { id }
    for (const element of getNewRow()) {
      Object.assign(obj, element)
    }
    tableData.value.push(obj)
  }
  helper()
  helper()
  helper()
}

// 保存数据
function saveData() {
  localStorage.setItem('dltSel', JSON.stringify(Array.from(selectedNumbers.value)))
  localStorage.setItem('dltTable', JSON.stringify(tableData.value))
}

// 清空数据
const clear = () => {
  tableData.value = []
  selectedNumbers.value.clear()
  localStorage.removeItem('dltSel')
  localStorage.removeItem('dltTable')
}

// 加载数据
const loadData = () => {
  const sD = localStorage.getItem('dltSel') as string
  const tD = localStorage.getItem('dltTable') as string
  selectedNumbers.value = new Set(JSON.parse(sD) || new Set())
  tableData.value = JSON.parse(tD) || []
}

// 显示隐藏功能
const toggleNumberVisibility = () => {
  hideNumbers.value = !hideNumbers.value
}

// 删除行
const deleteRow = (uniqueId: string) => {
  ElMessageBox.confirm(`确定要删除这一行吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      tableData.value = tableData.value.filter((row) => row.id !== uniqueId)
      for (const element of selectedNumbers.value) {
        if (element.includes(uniqueId)) {
          selectedNumbers.value.delete(element)
        }
      }
    })
    .catch(() => {
      // 用户取消删除
    })
}

// 修改后的拖拽处理函数
const rowDragendEvent = (newIndex: number, oldIndex: number) => {
  const [movedItem] = tableData.value.splice(oldIndex, 1)
  tableData.value.splice(newIndex, 0, movedItem)
  saveData()
}

let sortableInstance: Sortable | null = null // 存储 Sortable 实例
const initSortable = () => {
  // 先销毁旧实例
  if (sortableInstance) {
    sortableInstance.destroy()
  }

  const wrapper = document.querySelector('.el-table__body-wrapper tbody') as HTMLElement
  if (wrapper) {
    sortableInstance = new Sortable(wrapper, {
      animation: 150,
      onEnd: (evt) => {
        rowDragendEvent(evt.newIndex!, evt.oldIndex!)
      },
    })
  }
}
onMounted(() => {
  loadData()
  // 初始化拖拽
  nextTick(() => {
    initSortable()
  })
})
</script>
