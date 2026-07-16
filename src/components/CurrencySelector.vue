<script setup>
import { useInvoice } from '../composables/useInvoice.js'
import { useI18n } from '../composables/useI18n.js'
import SectionSidebar from './SectionSidebar.vue'

const { currency, currencies } = useInvoice()
const { t } = useI18n()
</script>

<template>
  <SectionSidebar :title="t('app.currency')">
    <select v-model="currency" class="w-full rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white">
      <option v-for="c in currencies" :key="c.code" :value="c.code">{{ c.symbol }} {{ c.code }}</option>
    </select>
  </SectionSidebar>
</template>
