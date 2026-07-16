<script setup>
import { useInvoice } from '../composables/useInvoice.js'
import { useI18n } from '../composables/useI18n.js'
import SectionSidebar from './SectionSidebar.vue'
import UiInput from './ui/UiInput.vue'

const { invoice } = useInvoice()
const { t } = useI18n()
</script>

<template>
  <SectionSidebar :title="t('sections.details')">
    <div class="grid grid-cols-3 gap-3">
      <div>
        <label class="block text-[11px] text-gray-500 mb-1">{{ t('details.invoiceNo') }}</label>
        <UiInput v-model="invoice.number" class="w-full" placeholder="INV-001" />
      </div>
      <div>
        <label class="block text-[11px] text-gray-500 mb-1">{{ t('details.date') }}</label>
        <UiInput v-model="invoice.date" class="w-full" type="date" />
      </div>
      <div>
        <label class="block text-[11px] text-gray-500 mb-1">{{ t('details.dueDate') }}</label>
        <UiInput v-model="invoice.dueDate" class="w-full" type="date" />
      </div>
    </div>
  </SectionSidebar>
</template>
