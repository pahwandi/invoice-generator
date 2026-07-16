<script setup>
import { useI18n } from '../composables/useI18n.js'

const { locale, setLocale } = useI18n()

const langs = [
  { code: 'id', label: 'ID' },
  { code: 'en', label: 'EN' },
]
</script>

<template>
  <div class="flex gap-1">
    <button
      v-for="l in langs"
      :key="l.code"
      @click="setLocale(l.code)"
      :class="[
        'px-2 py-0.5 rounded text-xs font-medium transition',
        locale === l.code
          ? 'bg-emerald-600 text-white'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
      ]"
    >
      {{ l.label }}
    </button>
  </div>
</template>
