<script setup>
import { ref } from 'vue'
import { useI18n } from '../../composables/useI18n.js'
import IconUpload from '../icon/IconUpload.vue'

const { t } = useI18n()
const model = defineModel()
const inputRef = ref(null)

function onChange(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => { model.value = reader.result }
  reader.readAsDataURL(file)
}

function remove() {
  model.value = null
  if (inputRef.value) inputRef.value.value = ''
}
</script>

<template>
  <div>
    <div v-if="model" class="flex items-center justify-between border-b border-gray-300 py-1.5">
      <div class="flex items-center gap-2">
        <img :src="model" class="h-6 w-auto rounded object-contain">
        <span class="text-xs text-gray-500">{{ t('sender.logoUploaded') }}</span>
      </div>
      <button @click="remove" class="text-xs text-red-400 hover:text-red-600">&times; {{ t('sender.remove') }}</button>
    </div>
    <label v-else class="flex items-center gap-2 border-b border-gray-300 py-1.5 text-sm text-gray-500 hover:text-emerald-500 hover:border-emerald-500 cursor-pointer transition">
      <IconUpload />
      {{ t('sender.uploadLogo') }}
      <input ref="inputRef" type="file" accept="image/*" @change="onChange" class="hidden">
    </label>
  </div>
</template>
