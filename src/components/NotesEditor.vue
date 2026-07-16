<script setup>
import { useInvoice } from '../composables/useInvoice.js'
import { useI18n } from '../composables/useI18n.js'
import SectionSidebar from './SectionSidebar.vue'
import UiTextarea from './ui/UiTextarea.vue'

const { invoice } = useInvoice()
const { t } = useI18n()
</script>

<template>
  <SectionSidebar :title="t('sections.notes')">
    <UiTextarea v-model="invoice.notes" class="w-full" rows="4" :placeholder="t('notes.placeholder')" />
  </SectionSidebar>
</template>
