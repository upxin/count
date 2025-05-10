<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Random from './random.vue';
</script>

<template>
  <el-config-provider size="small">
    <!-- <RouterView /> -->
    <Random></Random>
  </el-config-provider>
</template>
