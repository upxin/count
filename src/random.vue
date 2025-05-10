<template>
  <el-button type="primary" @click="generateNumbers">
    <i class="el-icon-refresh mr-1"></i>生成随机数
  </el-button>

  <el-table :data="tableData" border stripe highlight-current-row>
    <el-table-column></el-table-column>

    <el-table-column
      v-for="index in count"
      :key="index"
      :label="index"
      :prop="index.toString()"
      align="center"
      :width="20"
    >
      <template #default="scope">
        <span>
          {{ scope.row[index] || '' }}
        </span>
      </template>
    </el-table-column>

    <el-table-column></el-table-column>
  </el-table>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const count = ref(16)
const generateRandomNumbers = () => {
  const numbers = []
  while (numbers.length < 1) {
    const num = Math.floor(Math.random() * count.value) + 1
    if (!numbers.includes(num)) {
      numbers.push(num)
    }
  }
  return numbers.sort((a, b) => a - b)
}

// 生成100组随机数
const generateNumbers = () => {
  const newData = []
  for (let i = 0; i < 80; i++) {
    const group = generateRandomNumbers()
    const row = {}

    // 初始化所有列，存在的数字标记为该数字，不存在则为 null
    for (let j = 1; j <= 33; j++) {
      row[j] = group.includes(j) ? j : null
    }

    newData.push(row)
  }

  tableData.value = newData
  currentPage.value = 1 // 重置分页

  // 显示成功提示
}

// 处理分页变化
const handleSizeChange = (newSize) => {
  pageSize.value = newSize
}

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
}
</script>

<style scoped>
.random-number-generator {
  padding: 20px;
}
</style>
