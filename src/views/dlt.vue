<template>
  <el-table :data="tableData" border row-key="id" height="700" @sort-change="handleSortChange">
    <el-table-column type="index" align="center"  label="序号"></el-table-column>
    <el-table-column></el-table-column>
    <el-table-column
      v-for="(col, index) in tableColumns"
      :key="index"
      :prop="col.prop"
      :label="col.label"
      align="center"
      :width="col.prop === '#' ? 60 : 20"
      :sortable="col.prop === '#' ? true : false"
    >
      <template #default="{ row }">
        <div @click="handleNum(row, col.prop)">
          <div
            :class="[
              col.prop === '#' ? '' : 'ball',
              hideNumbers ? 'hideNumbers' : '',
              getClass(row, col.label, col.prop),
            ]"
          >
            {{ getStr(row, col.prop, col.label) }}
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="{ row }">
        <el-button type="primary" @click="copyRow(row)">复制</el-button>
        <el-button type="danger" @click="deleteRow(row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="button-group">
    <el-button @click="$router.push('/ssq')" type="success">去ssq</el-button>
    <el-button @click="clear" type="danger">清空数据</el-button>
    <el-button @click="toggleNumberVisibility" type="primary">显示隐藏</el-button>
    <el-button @click="addRow" type="primary">增加行</el-button>
    <el-button @click="getData" type="success">获取字符串</el-button>
  </div>
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
import { useClipboard } from '@vueuse/core'

interface TableData {
  id: string
  [key: string]: string | number
  hashCount?: number // 新增字段，用于存储 # 列对应的数字
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

function getStr(row, prop, label) {
  if (label === '#') {
    return `# ${row.hashCount || 0} #`
  }
  return label
}

function handleNum(row: any, prop: string) {
  const key = `${row.id},${prop}`
  if (selectedNumbers.value.has(key)) {
    selectedNumbers.value.delete(key)
  } else {
    selectedNumbers.value.add(key)
  }
  updateHashCount()
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
  console.log(tableData.value)
  console.log(selectedNumbers.value)

  const result = []
  for (const row of tableData.value) {
    const before = []
    const after = []
    for (const val of selectedNumbers.value) {
      const [itemId, str] = val.split(',')
      if (itemId === row.id) {
        const isBefore = str.startsWith('before')
        const number = str.slice(isBefore ? 6 : 5)
        if (isBefore) {
          before.push(number)
        } else {
          after.push(number)
        }
      }
    }
    const combined = [...before, '#', ...after].join(' ')
    result.push(combined)
  }
  source.value = result.join('\n')
  console.log(result.join('\n'))
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
    tableData.value.push(obj)
  }
  const list = new Array(10)
  for (const element of list) {
    helper()
  }
  updateHashCount()
}

// 更新每一行的 hashCount 字段
const updateHashCount = () => {
  tableData.value.forEach((row) => {
    let count = 0
    for (const element of selectedNumbers.value) {
      if (element.includes('before') && element.includes(row.id)) {
        count++
      }
    }
    row.hashCount = count
  })
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
  updateHashCount()
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
      updateHashCount()
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

// 处理排序变化
const handleSortChange = (sort) => {
  if (sort.prop === '#') {
    const newData = [...tableData.value]
    newData.sort((a, b) => {
      return (b.hashCount || 0) - (a.hashCount || 0)
    })
    tableData.value = newData
  }
}

const copyRow = (row: TableData) => {
  const newId = generateUniqueId()
  const newRow = { ...row, id: newId }
  const currentIndex = tableData.value.findIndex((r) => r.id === row.id)
  tableData.value.splice(currentIndex + 1, 0, newRow)

  // 复制选中的数字
  const newSelectedNumbers = new Set(selectedNumbers.value)
  for (const element of selectedNumbers.value) {
    if (element.includes(row.id)) {
      const newElement = element.replace(row.id, newId)
      newSelectedNumbers.add(newElement)
    }
  }
  selectedNumbers.value = newSelectedNumbers

  updateHashCount()
  saveData()
}

onMounted(() => {
  loadData()
  // 初始化拖拽
  nextTick(() => {
    initSortable()
  })
})
</script>

<style scoped>
/* 可根据需要添加样式 */
</style>
