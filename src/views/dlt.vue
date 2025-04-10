<template>
  <el-config-provider size="small">
    <div>
      <div class="button-group">
        <el-button @click="clear" :type="'danger'">清空数据</el-button>
        <el-button @click="toggleNumberVisibility">显示隐藏</el-button>
        <el-button @click="addRow">增加行</el-button>
        <el-button @click="printSelectedData">存储数据</el-button>
      </div>
      <el-table :data="tableData" border style="width: 1920px; margin: 0 auto;">
        <el-table-column :width="40" v-for="(header, index) in tableHeaders" :key="index" :prop="`col${index}`"
          :label="header" align="center">
          <template #default="{ row, column, $index: rowIndex }">
            <div style="cursor: pointer;" :class="{
              hideNumbers: hideNumbers,
              selected: isBeforeSeparator(index)
                ? selectedNumbersBefore[rowIndex].includes(row[column.property])
                : selectedNumbersAfter[rowIndex].includes(row[column.property]),
            }" @click="toggleSelection(rowIndex, index, row[column.property])">
              {{ row[column.property] }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

// 初始化表头
const tableHeaders = [];
for (let i = 1; i <= 35; i++) {
  tableHeaders.push(i.toString());
}
tableHeaders.push('#');
for (let i = 1; i <= 12; i++) {
  tableHeaders.push(i.toString());
}

// 表格数据
const tableData = ref([]);

// 控制非表头数字的显示隐藏
const hideNumbers = ref(false);

// 选中的数字，分为 # 前面和 # 后面两个数组
const selectedNumbersBefore = ref<Array<string[]>>([[]]);
const selectedNumbersAfter = ref<Array<string[]>>([[]]);

// 判断是否在 # 之前
const isBeforeSeparator = (index: number) => index < tableHeaders.indexOf('#');

// 切换数字的显示隐藏
const toggleNumberVisibility = () => {
  hideNumbers.value = !hideNumbers.value;
  tableData.value = []
};
const clear = () => {
  localStorage.setItem('dlt', '')
}
// 增加行
const addRow = () => {
  const newRow = {};
  tableHeaders.forEach((header, index) => {
    if (header !== '#') {
      newRow[`col${index}`] = header;
    }
  });
  tableData.value = [...tableData.value, { ...newRow }];
  // 为新行添加空的选中数字数组
  selectedNumbersBefore.value = [...selectedNumbersBefore.value, []];
  selectedNumbersAfter.value = [...selectedNumbersAfter.value, []];
};

// 切换数字的选择状态
const toggleSelection = (rowIndex: number, columnIndex: number, number: string | undefined) => {
  if (number) {
    const targetArray = isBeforeSeparator(columnIndex)
      ? selectedNumbersBefore.value[rowIndex]
      : selectedNumbersAfter.value[rowIndex];
    const index = targetArray.indexOf(number);
    if (index !== -1) {
      targetArray.splice(index, 1);
    } else {
      targetArray.push(number);
    }
    // 更新响应式数据
    if (isBeforeSeparator(columnIndex)) {
      selectedNumbersBefore.value = [...selectedNumbersBefore.value];
    } else {
      selectedNumbersAfter.value = [...selectedNumbersAfter.value];
    }
  }
};

// 打印选择的数据
const printSelectedData = () => {
  const printedData = selectedNumbersBefore.value.map((beforeRow, rowIndex) => {
    const afterRow = selectedNumbersAfter.value[rowIndex];
    const beforeNumbers = beforeRow.join(' ');
    const afterNumbers = afterRow.join(' ');
    return `${beforeNumbers} # ${afterNumbers}`;
  });
  localStorage.setItem('dlt', JSON.stringify(printedData));
  return printedData
};

function processAndAssignData(initData: string | null) {
  if (initData) {
    const parsedData = JSON.parse(initData);
    const newTableData: any[] = [];
    selectedNumbersBefore.value = [];
    selectedNumbersAfter.value = [];

    parsedData.forEach((rowStr: string) => {
      const [beforePart, afterPart] = rowStr.split('#');
      const beforeNumbers = beforePart ? beforePart.split(' ') : [];
      const afterNumbers = afterPart ? afterPart.split(' ') : [];

      const newRow: any = {};
      tableHeaders.forEach((header, index) => {
        if (header === '#') {
          newRow[`col${index}`] = '#';
        } else if (index < tableHeaders.indexOf('#')) {
          newRow[`col${index}`] = header;
        } else {
          newRow[`col${index}`] = header;
        }
      });

      newTableData.push(newRow);
      selectedNumbersBefore.value.push(beforeNumbers);
      selectedNumbersAfter.value.push(afterNumbers);
    });

    tableData.value = newTableData;
  }
}

onMounted(() => {
  const initData = localStorage.getItem('dlt')
  processAndAssignData(initData)
  setInterval(() => {
    printSelectedData()
  }, 20000)
})
</script>

<style scoped>
.button-group {
  width: 900px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.hideNumbers {
  color: #fff;
}

.selected {
  background-color: red;
  color: white;
  cursor: pointer;
}
</style>
