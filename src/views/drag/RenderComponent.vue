<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';

const props = withDefaults(defineProps<{ name: string }>(), { name: '' });
const Comp = resolveComponent(props.name);
</script>

<template>
  <component :is="Comp"></component>
</template>
