<script setup>
const model = defineModel()
</script>

<template>
  <input
    v-model="model"
    v-bind="$attrs"
    class="border-0 border-b border-gray-300 py-1.5 text-sm placeholder:text-gray-500 focus:outline-none focus:border-emerald-500"
  />
</template>
