<script setup lang="ts">
import type { Component } from 'vue';
import { ref, watch } from 'vue';
import Draggable from 'vuedraggable';
import { cloneDeep } from 'lodash-es';
import { Time } from '@vicons/carbon';
import DraggableItem from './DraggableItem.tsx';
import type { DragSchema } from './interface.ts';
import { inputComponents, layoutComponents, selectComponents } from '@/views/drag/config/index.ts';

const leftComponents = [
  {
    title: '布局型组件',
    list: layoutComponents,
  },
  {
    title: '输入型组件',
    list: inputComponents,
  },
  {
    title: '选择型组件',
    list: selectComponents,
  },
];
const iconMap: Record<string, Component> = {
  date: Time,
};
const dragedList = ref([]);

watch(
  () => dragedList.value,
  (v) => {
    console.log('dragedList updated:', v);
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <div class="flex p-40px">
    <!-- 左边的列表 -->
    <section class="">
      <section v-for="item of leftComponents" :key="item.title">
        <p>{{ item.title }}</p>
        <Draggable
          :list="item.list"
          :group="{ name: 'dragComponent', pull: 'clone', put: false }"
          item-key="name"
          :clone="cloneDeep"
          class="flex flex-wrap w-260px justify-between"
        >
          <template #item="{ element }">
            <div
              min-w-100px m-b-10px cursor-move flex items-center px-10px rounded-sm border-gray border border-solid
              hover="border-dashed border-primary"
              py-6px
              bg="gray"
            >
              <n-icon :component="iconMap[element.colType]" size="20" :depth="5" />
              <span class="ml-10px">{{ element.colName }}</span>
            </div>
          </template>
        </Draggable>
      </section>
    </section>
    <!-- 右边的列表 -->
    <Draggable
      v-model="dragedList"
      class="cursor-move ml-100px w-600px min-h-800px border-b-blue border-solid border drawing-board"
      group="dragComponent"
      item-key="name"
      :clone="cloneDeep"
    >
      <template #item="{ element }">
        <DraggableItem :item="element" :draged-list="dragedList" :tasks="element.tasks" />
      </template>
    </Draggable>
  </div>
</template>

<style scoped></style>
