<script setup>
import { useInvoice } from '../composables/useInvoice.js'
import { useI18n } from '../composables/useI18n.js'
import SectionSidebar from './SectionSidebar.vue'
import UiInput from './ui/UiInput.vue'

const { invoice, items, fmt, grandTotal, addItem, removeItem } = useInvoice()
const { t } = useI18n()
</script>

<template>
  <SectionSidebar :title="t('sections.items')">
    <template #actions>
      <button @click="addItem" class="text-emerald-600 text-xs font-medium hover:text-emerald-700 transition">{{ t('items.addItem') }}</button>
    </template>

    <div class="space-y-2">
      <div class="flex gap-2 items-start">
        <div class="flex-1">
          <label class="block text-[11px] text-gray-500 mb-1">{{ t('preview.description') }}</label>
        </div>
        <div class="w-14">
          <label class="block text-[11px] text-gray-500 mb-1 text-center">{{ t('preview.qty') }}</label>
        </div>
        <div class="w-20">
          <label class="block text-[11px] text-gray-500 mb-1 text-right">{{ t('preview.rate') }}</label>
        </div>
        <div class="w-20">
          <label class="block text-[11px] text-gray-500 mb-1 text-right">{{ t('preview.amount') }}</label>
        </div>
      </div>
      <div v-for="(item, idx) in items" :key="idx" class="flex gap-2 items-start group">
        <div class="flex-1">
          <UiInput v-model="item.description" class="w-full" :placeholder="t('items.descriptionPlaceholder')" />
        </div>
        <div class="w-14">
          <UiInput v-model.number="item.qty" class="w-full text-center" type="number" min="1" :placeholder="t('items.qty')" />
        </div>
        <div class="w-20">
          <UiInput v-model.number="item.rate" class="w-full text-right" type="number" step="0.01" min="0" placeholder="0.00" />
        </div>
        <div class="flex gap-1 items-center justify-end flex-1 text-xs text-right text-gray-500">
          <span>{{ fmt(item.qty * item.rate) }}</span>
          <button v-if="items.length > 1" @click="removeItem(idx)" class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition text-lg">&times;</button>
        </div>
      </div>

      <div class="pt-1">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-[11px] text-gray-500 mb-1">{{ t('items.tax') }}</label>
            <UiInput v-model.number="invoice.taxRate" class="w-full" type="number" step="0.1" min="0" placeholder="0" />
          </div>
          <div>
            <label class="block text-[11px] text-gray-500 mb-1">{{ t('items.discount') }}</label>
            <UiInput v-model.number="invoice.discount" class="w-full" type="number" step="0.01" min="0" placeholder="0.00" />
          </div>
        </div>
      </div>
    </div>
  </SectionSidebar>
</template>
