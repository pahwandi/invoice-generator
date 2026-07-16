<script setup>
import { useInvoice } from '../composables/useInvoice.js'
import { useI18n } from '../composables/useI18n.js'
import SectionSidebar from './SectionSidebar.vue'
import UiInput from './ui/UiInput.vue'

const { client } = useInvoice()
const { t } = useI18n()
</script>

<template>
  <SectionSidebar :title="t('sections.billTo')">
    <div class="space-y-2.5">
      <UiInput v-model="client.name" class="w-full" :placeholder="t('client.namePlaceholder')" />
      <UiInput v-model="client.email" class="w-full" :placeholder="t('client.emailPlaceholder')" />
      <UiInput v-model="client.phone" class="w-full" :placeholder="t('client.phonePlaceholder')" />
      <UiInput v-model="client.address" class="w-full" :placeholder="t('client.addressPlaceholder')" />
    </div>
  </SectionSidebar>
</template>
