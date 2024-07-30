
<template>
  <div class="flex">
    <!-- 左边的列表 -->
    <draggable
      class="dragArea list-group"
      :list="list1"
      :group="{ name: 'people', pull: 'clone', put: false }"
      item-key="name"
      :clone="cloneItem"
    >
      <template #item="{ element }">
        <span class="border-1px border-amber border-solid p-10px">
          {{ element.name }}
        </span>
      </template>
    </draggable>

    <!-- 右边的列表 -->
    <draggable
      class="cursor-move ml-100px w-200px min-h-400px border-b-blue border-solid border"
      v-model="list2"
      group="people"
      item-key="name"
      :clone="cloneItem"
    >
      <template #item="{ element }">
        <NestedItem :item="element" />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import draggable from "vuedraggable";
import NestedItem from"./NestedItem.vue"

// import cloneDeep from 'lodash/cloneDeep';
function cloneDeep(data){
  return JSON.parse(JSON.stringify(data))
}
const list1 = [
  { name: "Juan1", id: 5, children: [] },
  { name: "Edgard2", id: 6, children: [] },
  { name: "Johnson3", id: 7, children: [] },
];

const list2 = ref([]);

const cloneItem = (item) => {
  return cloneDeep(item);
};

watch(() => list2.value,(v) => {
  console.log('list2 updated:', v);
});
</script>

<style scoped></style>
