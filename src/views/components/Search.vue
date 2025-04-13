<template>
  <el-dialog v-model="dialogVisible" :title="`条数: ${all.length}`" :close-on-click-modal="false">
    <el-input
      v-model="searchInput"
      placeholder="请输入数字，用逗号或空格分隔"
      @keyup.enter="searchNumbers"
    />
    <section style="display: flex; justify-content: space-around">
      <div style="height: 600px; overflow: auto">
        <h3>重复 4 个数字的项-{{ matches4.length }}</h3>
        <div v-for="item in matches4" :key="item.combinedKey">
          {{ item.before.join(', ') }}
        </div>
      </div>
      <div style="height: 600px; overflow: auto">
        <h3>重复 5 个数字的项-{{ matches5.length }}</h3>
        <div v-for="item in matches5" :key="item.combinedKey">
          {{ item.before.join(', ') }}
        </div>
      </div>
      <div style="height: 600px; overflow: auto">
        <h3>重复 6个数字的项-{{ matches6.length }}</h3>
        <div v-for="item in matches6" :key="item.combinedKey">
          {{ item.before.join(', ') }}
        </div>
      </div>
    </section>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from 'vue';
import { defineModel } from 'vue/macros';

const props = defineProps({
  skey: {
    type: String,
    default: 'ssqStr',
  },
});

const dialogVisible = defineModel<boolean>('modelValue', {
  default: false,
});
const searchInput = ref('');
const matches4 = ref<{ before: number[]; combinedKey: string }[]>([]);
const matches5 = ref<{ before: number[]; combinedKey: string }[]>([]);
const matches6 = ref<{ before: number[]; combinedKey: string }[]>([]);

const all = ref<number[][]>([]);

// 生成组合的辅助函数
function getCombinations(arr: number[], size: number): number[][] {
  const result: number[][] = [];
  const helper = (start: number, current: number[]) => {
    if (current.length === size) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      helper(i + 1, current);
      current.pop();
    }
  };
  helper(0, []);
  return result;
}
const loadData = () => {
  const data = localStorage.getItem(props.skey) || '';

  const lines = data.split('\n');
  for (const line of lines) {
    const [frontNumbersStr] = line.split('#');
    const frontNumbers = frontNumbersStr.trim().split(/\s+/).map(Number).filter(Boolean);
    if (frontNumbers.length >= 5) {
      const combinations = getCombinations(frontNumbers, 5);
      // 对每个组合进行排序
      const sortedCombinations = combinations.map((combination) => combination.sort((a, b) => a - b));
      all.value.push(...sortedCombinations);
    }
  }
};

const searchNumbers = () => {
  const inputNumbers = searchInput.value.split(/[,\s]+/).map(Number).filter(Boolean);
  matches4.value = [];
  matches5.value = [];
  matches6.value = [];

  let match4Index = 0;
  let match5Index = 0;
  let match6Index = 0;


  for (const combination of all.value) {
    const commonCount = combination.filter((num) => inputNumbers.includes(num)).length;
    if (commonCount === 4) {
      matches4.value.push({
        before: combination,
        combinedKey: `match4-${match4Index++}`,
      });
    } else if (commonCount === 5) {
      matches5.value.push({
        before: combination,
        combinedKey: `match5-${match5Index++}`,
      });
    } else if (commonCount === 6 ) {
      matches6.value.push({
        before: combination,
        combinedKey: `match5-${match6Index++}`,
      });
    }
  }
};
watch(dialogVisible, (v) => {
  if (v) {
    all.value = []
    loadData();
  }
});
</script>

<style scoped></style>    
