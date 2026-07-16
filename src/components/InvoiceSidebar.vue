<script setup>
import { useInvoice } from '../composables/useInvoice.js'
import { useI18n } from '../composables/useI18n.js'
import CurrencySelector from './CurrencySelector.vue'
import SenderForm from './SenderForm.vue'
import ClientForm from './ClientForm.vue'
import DetailsForm from './DetailsForm.vue'
import ItemsEditor from './ItemsEditor.vue'
import NotesEditor from './NotesEditor.vue'
import LangSwitcher from './LangSwitcher.vue'
import IconDownload from './icon/IconDownload.vue'

const { resetInvoice, printInvoice } = useInvoice()
const { t } = useI18n()
</script>

<template>
  <div class="no-print w-110 shrink-0 bg-white border-r border-gray-300 flex flex-col">
    <div class="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
      <h1 class="text-lg font-bold text-gray-900">{{ t('app.title') }}</h1>
      <LangSwitcher />
    </div>

    <div class="flex flex-col gap-8 flex-1 overflow-y-auto px-5 py-4">
      <CurrencySelector />
      <SenderForm />
      <ClientForm />
      <DetailsForm />
      <ItemsEditor />
      <NotesEditor />

      <div class="flex flex-col gap-3">
        <button @click="resetInvoice" class="w-full border border-gray-300 text-gray-600 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition">
          {{ t('app.reset') }}
        </button>
        <button @click="printInvoice" class="w-full bg-emerald-600 text-white py-2.5 rounded-md text-sm font-medium hover:bg-emerald-700 transition flex items-center justify-center gap-2">
          <IconDownload />
          {{ t('app.download') }}
        </button>
      </div>
    </div>
  </div>
</template>
