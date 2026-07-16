<script setup>
import { useInvoice } from '../composables/useInvoice.js'
import { useI18n } from '../composables/useI18n.js'

const { logo, sender, client, invoice, items, subtotal, taxAmount, grandTotal, fmt } = useInvoice()
const { t } = useI18n()
</script>

<template>
  <div class="flex-1 overflow-y-auto p-6">
    <div class="max-w-200 mx-auto">
      <div id="invoice-preview" class="bg-white shadow-lg border border-gray-300 p-10 text-sm">

        <div class="flex items-start justify-between mb-10 pb-8 border-b border-gray-300">
          <div class="w-24">
            <img v-if="logo" :src="logo" class="h-16 w-auto object-contain">
            <div v-else class="h-16 w-16 rounded border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-[10px] uppercase tracking-wider">{{ t('preview.logo') }}</div>
          </div>
          <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-200 uppercase tracking-[0.3em]">{{ t('preview.invoice') }}</h1>
          </div>
          <div class="text-right">
            <p class="text-gray-800 font-semibold text-lg" v-text="invoice.number || 'INV-001'"></p>
            <div class="mt-2 space-y-0.5">
              <p class="text-gray-500 text-xs">
                <span class="text-gray-500">{{ t('preview.issued') }}</span> {{ invoice.date || '—' }}
              </p>
              <p class="text-gray-500 text-xs">
                <span class="text-gray-500">{{ t('preview.due') }}</span> {{ invoice.dueDate || '—' }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex justify-between mb-10">
          <div>
            <p class="text-[11px] text-gray-500 uppercase tracking-wider mb-2">{{ t('preview.from') }}</p>
            <p class="font-semibold text-gray-800" v-text="sender.name || t('preview.yourCompany')"></p>
            <p class="text-gray-500 text-xs" v-text="sender.email"></p>
            <p class="text-gray-500 text-xs" v-text="sender.phone"></p>
            <p class="text-gray-500 text-xs whitespace-pre-line" v-text="sender.address"></p>
          </div>
          <div class="text-right">
            <p class="text-[11px] text-gray-500 uppercase tracking-wider mb-2">{{ t('preview.billTo') }}</p>
            <p class="font-semibold text-gray-800" v-text="client.name || t('preview.clientName')"></p>
            <p class="text-gray-500 text-xs" v-text="client.email"></p>
            <p class="text-gray-500 text-xs" v-text="client.phone"></p>
            <p class="text-gray-500 text-xs whitespace-pre-line" v-text="client.address"></p>
          </div>
        </div>

        <table class="w-full mb-8">
          <thead>
            <tr class="border-y border-gray-300 text-left text-[11px] text-gray-500 uppercase tracking-wider">
              <th class="py-3 font-medium">{{ t('preview.description') }}</th>
              <th class="py-3 font-medium text-center w-14">{{ t('preview.qty') }}</th>
              <th class="py-3 font-medium text-right w-24">{{ t('preview.rate') }}</th>
              <th class="py-3 font-medium text-right w-24">{{ t('preview.amount') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in items" :key="idx" class="border-b border-gray-300">
              <td class="py-3 text-gray-700" v-text="item.description || '—'"></td>
              <td class="py-3 text-gray-500 text-center" v-text="item.qty || 0"></td>
              <td class="py-3 text-gray-500 text-right" v-text="fmt(item.rate)"></td>
              <td class="py-3 text-gray-700 text-right font-medium" v-text="fmt(item.qty * item.rate)"></td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-end mb-8">
          <div class="w-56 space-y-1.5 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">{{ t('preview.subtotal') }}</span>
              <span class="text-gray-700 font-medium" v-text="fmt(subtotal)"></span>
            </div>
            <div v-if="invoice.taxRate > 0" class="flex justify-between">
              <span class="text-gray-500">{{ t('preview.tax') }} ({{ invoice.taxRate }}%)</span>
              <span class="text-gray-700" v-text="fmt(taxAmount)"></span>
            </div>
            <div v-if="invoice.discount > 0" class="flex justify-between">
              <span class="text-gray-500">{{ t('preview.discount') }}</span>
              <span class="text-gray-700">-{{ fmt(invoice.discount) }}</span>
            </div>
            <div class="flex justify-between border-t-2 border-gray-900 pt-2 font-bold text-base">
              <span class="text-gray-900">{{ t('preview.balanceDue') }}</span>
              <span class="text-gray-900" v-text="fmt(grandTotal)"></span>
            </div>
          </div>
        </div>

        <div v-if="invoice.notes" class="border-t border-gray-300 pt-5">
          <p class="text-[11px] text-gray-500 uppercase tracking-wider mb-2">{{ t('preview.notes') }}</p>
          <p class="text-gray-500 text-xs whitespace-pre-line" v-text="invoice.notes"></p>
        </div>

      </div>
    </div>
  </div>
</template>
