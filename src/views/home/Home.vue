<script lang='ts' setup>
const name = ref('NInput');
</script>

<template>
  <div>
    <component :is="name"></component>
    <NInput></NInput>
  </div>
</template>
