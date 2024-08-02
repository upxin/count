<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';

const props = withDefaults(defineProps<{ name: string }>(), { name: '' });
</script>

<template>
  <component :is="props.name"></component>
</template>
