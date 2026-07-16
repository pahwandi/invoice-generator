<script setup>
defineProps({
  title: { type: String, required: true },
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">{{ title }}</h2>
      <slot name="actions" />
    </div>
    <div class="flex flex-col gap-3">
      <slot />
    </div>
  </div>
</template>
