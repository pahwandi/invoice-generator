<script setup>
import InvoiceSidebar from './components/InvoiceSidebar.vue'
import InvoicePreview from './components/InvoicePreview.vue'
</script>

<template>
  <div class="h-screen flex overflow-hidden bg-gray-50">
    <InvoiceSidebar />
    <InvoicePreview />
  </div>
</template>
