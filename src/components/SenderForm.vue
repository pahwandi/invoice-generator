<script setup>
import { useInvoice } from '../composables/useInvoice.js'
import { useI18n } from '../composables/useI18n.js'
import SectionSidebar from './SectionSidebar.vue'
import UiInput from './ui/UiInput.vue'
import UiUpload from './ui/UiUpload.vue'

const { logo, sender } = useInvoice()
const { t } = useI18n()
</script>

<template>
  <SectionSidebar :title="t('sections.from')">
    <div class="flex flex-col gap-3">
      <UiUpload v-model="logo" />
      <UiInput v-model="sender.name" class="w-full" :placeholder="t('sender.namePlaceholder')" />
      <UiInput v-model="sender.email" class="w-full" :placeholder="t('sender.emailPlaceholder')" />
      <UiInput v-model="sender.phone" class="w-full" :placeholder="t('sender.phonePlaceholder')" />
      <UiInput v-model="sender.address" class="w-full" :placeholder="t('sender.addressPlaceholder')" />
    </div>
  </SectionSidebar>
</template>
