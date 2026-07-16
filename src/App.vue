<script setup>
import { ref, computed } from 'vue'

const logo = ref(null)

function onLogoUpload(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => { logo.value = reader.result }
  reader.readAsDataURL(file)
}

function removeLogo() {
  logo.value = null
  const input = document.getElementById('logo-upload')
  if (input) input.value = ''
}

const sender = ref({
  name: 'Acme Studio',
  email: 'hello@acmestudio.com',
  phone: '+1 (555) 234-5678',
  address: '123 Design Street\nSan Francisco, CA 94107',
})

const client = ref({
  name: 'TechStart Inc.',
  email: 'billing@techstart.io',
  phone: '+1 (555) 876-5432',
  address: '456 Innovation Blvd\nAustin, TX 73301',
})

const currencies = [
  { code: 'USD', symbol: '$', locale: 'en-US', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', locale: 'de-DE', name: 'Euro' },
  { code: 'GBP', symbol: '£', locale: 'en-GB', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', locale: 'ja-JP', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', locale: 'zh-CN', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', locale: 'en-IN', name: 'Indian Rupee' },
  { code: 'CAD', symbol: '$', locale: 'en-CA', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: '$', locale: 'en-AU', name: 'Australian Dollar' },
  { code: 'CHF', symbol: 'CHF', locale: 'de-CH', name: 'Swiss Franc' },
  { code: 'SGD', symbol: '$', locale: 'en-SG', name: 'Singapore Dollar' },
  { code: 'MYR', symbol: 'RM', locale: 'ms-MY', name: 'Malaysian Ringgit' },
  { code: 'IDR', symbol: 'Rp', locale: 'id-ID', name: 'Indonesian Rupiah' },
]

const currency = ref('USD')

const invoice = ref({
  number: 'INV-2026-0042',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  taxRate: 0,
  discount: 0,
  notes: 'Payment is due within 30 days. Please include the invoice number with your payment.\n\nThank you for your business!',
})

const items = ref([
  { description: 'Website Redesign', qty: 1, rate: 3500 },
  { description: 'API Integration', qty: 2, rate: 1200 },
  { description: 'Monthly Maintenance', qty: 3, rate: 500 },
])

const subtotal = computed(() =>
  items.value.reduce((sum, i) => sum + (i.qty || 0) * (i.rate || 0), 0),
)

const taxAmount = computed(() =>
  (subtotal.value * (invoice.value.taxRate || 0)) / 100,
)

const grandTotal = computed(() =>
  subtotal.value + taxAmount.value - (invoice.value.discount || 0),
)

function fmt(val) {
  const c = currencies.find(c => c.code === currency.value)
  return new Intl.NumberFormat(c?.locale || 'en-US', {
    style: 'currency',
    currency: currency.value,
  }).format(val || 0)
}

function addItem() {
  items.value.push({ description: '', qty: 1, rate: 0 })
}

function removeItem(idx) {
  items.value.splice(idx, 1)
}

function resetInvoice() {
  sender.value = { name: '', email: '', phone: '', address: '' }
  client.value = { name: '', email: '', phone: '', address: '' }
  invoice.value = { number: '', date: '', dueDate: '', taxRate: 0, discount: 0, notes: '' }
  items.value = [{ description: '', qty: 1, rate: 0 }]
  currency.value = 'USD'
  logo.value = null
  const input = document.getElementById('logo-upload')
  if (input) input.value = ''
}

function printInvoice() {
  window.print()
}
</script>

<template>
  <div class="h-screen flex overflow-hidden bg-gray-50">

    <!-- SIDEBAR -->
    <div class="no-print w-[440px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
      <!-- Sidebar Header -->
      <div class="px-5 py-4 border-b border-gray-100">
        <h1 class="text-lg font-bold text-gray-900">Invoice Generator</h1>
      </div>

      <!-- Scrollable Form Area -->
      <div class="flex-1 overflow-y-auto px-5 py-4 space-y-6">

        <!-- Download Button -->
        <button @click="printInvoice" class="w-full bg-emerald-600 text-white py-2.5 rounded-md text-sm font-medium hover:bg-emerald-700 transition flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          Download Invoice
        </button>

        <!-- Currency -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Currency</label>
          <select v-model="currency" class="w-full rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white">
            <option v-for="c in currencies" :key="c.code" :value="c.code">{{ c.symbol }} {{ c.code }}</option>
          </select>
        </div>

        <div class="border-t border-gray-200"></div>

        <!-- From -->
        <div>
          <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">From</h2>
          <div class="mt-3">
            <div v-if="logo" class="flex items-center justify-between border-b border-gray-200 py-1.5">
              <div class="flex items-center gap-2">
                <img :src="logo" class="h-6 w-auto rounded object-contain">
                <span class="text-xs text-gray-400">Logo uploaded</span>
              </div>
              <button @click="removeLogo" class="text-xs text-red-400 hover:text-red-600">&times; Remove</button>
            </div>
            <label v-else class="flex items-center gap-2 border-b border-gray-200 py-1.5 text-sm text-gray-300 hover:text-emerald-500 hover:border-emerald-500 cursor-pointer transition">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Upload Logo
              <input id="logo-upload" type="file" accept="image/*" @change="onLogoUpload" class="hidden">
            </label>
          </div>
          <div class="space-y-2.5">
            <input v-model="sender.name" class="w-full border-0 border-b border-gray-200 py-1.5 text-sm placeholder:text-gray-300 focus:outline-none focus:border-emerald-500" placeholder="Who is this invoice from?">
            <input v-model="sender.email" class="w-full border-0 border-b border-gray-200 py-1.5 text-sm placeholder:text-gray-300 focus:outline-none focus:border-emerald-500" placeholder="Email">
            <input v-model="sender.phone" class="w-full border-0 border-b border-gray-200 py-1.5 text-sm placeholder:text-gray-300 focus:outline-none focus:border-emerald-500" placeholder="Phone">
            <input v-model="sender.address" class="w-full border-0 border-b border-gray-200 py-1.5 text-sm placeholder:text-gray-300 focus:outline-none focus:border-emerald-500" placeholder="Address">
          </div>
        </div>

        <!-- Bill To -->
        <div>
          <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Bill To</h2>
          <div class="space-y-2.5">
            <input v-model="client.name" class="w-full border-0 border-b border-gray-200 py-1.5 text-sm placeholder:text-gray-300 focus:outline-none focus:border-emerald-500" placeholder="Who is this invoice to?">
            <input v-model="client.email" class="w-full border-0 border-b border-gray-200 py-1.5 text-sm placeholder:text-gray-300 focus:outline-none focus:border-emerald-500" placeholder="Email">
            <input v-model="client.phone" class="w-full border-0 border-b border-gray-200 py-1.5 text-sm placeholder:text-gray-300 focus:outline-none focus:border-emerald-500" placeholder="Phone">
            <input v-model="client.address" class="w-full border-0 border-b border-gray-200 py-1.5 text-sm placeholder:text-gray-300 focus:outline-none focus:border-emerald-500" placeholder="Address">
          </div>
        </div>

        <!-- Invoice Details -->
        <div>
          <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Details</h2>
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-[11px] text-gray-400 mb-1">Invoice #</label>
              <input v-model="invoice.number" class="w-full border-0 border-b border-gray-200 py-1.5 text-sm placeholder:text-gray-300 focus:outline-none focus:border-emerald-500" placeholder="INV-001">
            </div>
            <div>
              <label class="block text-[11px] text-gray-400 mb-1">Date</label>
              <input v-model="invoice.date" type="date" class="w-full border-0 border-b border-gray-200 py-1.5 text-sm focus:outline-none focus:border-emerald-500">
            </div>
            <div>
              <label class="block text-[11px] text-gray-400 mb-1">Due Date</label>
              <input v-model="invoice.dueDate" type="date" class="w-full border-0 border-b border-gray-200 py-1.5 text-sm focus:outline-none focus:border-emerald-500">
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200"></div>

        <!-- Items -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Items</h2>
            <button @click="addItem" class="text-emerald-600 text-xs font-medium hover:text-emerald-700 transition">+ Add Item</button>
          </div>

          <div class="space-y-2">
            <div v-for="(item, idx) in items" :key="idx" class="flex gap-2 items-start group">
              <div class="flex-1">
                <input v-model="item.description" class="w-full border-0 border-b border-gray-200 py-1.5 text-sm placeholder:text-gray-300 focus:outline-none focus:border-emerald-500" placeholder="Description of item">
              </div>
              <div class="w-14">
                <input v-model.number="item.qty" type="number" min="1" class="w-full border-0 border-b border-gray-200 py-1.5 text-sm text-center focus:outline-none focus:border-emerald-500" placeholder="Qty">
              </div>
              <div class="w-20">
                <input v-model.number="item.rate" type="number" step="0.01" min="0" class="w-full border-0 border-b border-gray-200 py-1.5 text-sm text-right focus:outline-none focus:border-emerald-500" placeholder="0.00">
              </div>
              <div class="w-20 py-1.5 text-sm text-right text-gray-500">
                {{ fmt(item.qty * item.rate) }}
              </div>
              <button v-if="items.length > 1" @click="removeItem(idx)" class="py-1.5 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition text-sm">&times;</button>
              <div v-else class="w-5"></div>
            </div>
          </div>

          <!-- Totals below items -->
          <div class="mt-4 pt-3 border-t border-gray-100 space-y-2">
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[11px] text-gray-400 mb-1">Tax (%)</label>
                <input v-model.number="invoice.taxRate" type="number" step="0.1" min="0" class="w-full border-0 border-b border-gray-200 py-1.5 text-sm focus:outline-none focus:border-emerald-500" placeholder="0">
              </div>
              <div>
                <label class="block text-[11px] text-gray-400 mb-1">Discount</label>
                <input v-model.number="invoice.discount" type="number" step="0.01" min="0" class="w-full border-0 border-b border-gray-200 py-1.5 text-sm focus:outline-none focus:border-emerald-500" placeholder="0.00">
              </div>
            </div>
            <div class="flex justify-between items-center pt-1">
              <span class="text-sm font-semibold text-gray-700">Total</span>
              <span class="text-lg font-bold text-emerald-700">{{ fmt(grandTotal) }}</span>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div>
          <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Notes</h2>
          <textarea v-model="invoice.notes" rows="3" class="w-full border-0 border-b border-gray-200 py-1.5 text-sm placeholder:text-gray-300 focus:outline-none focus:border-emerald-500 resize-none" placeholder="Payment terms, thank you note, etc."></textarea>
        </div>

        <!-- Reset -->
        <div class="border-t border-gray-200 pt-4 pb-2">
          <button @click="resetInvoice" class="w-full border border-gray-300 text-gray-600 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition">
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- PREVIEW -->
    <div class="flex-1 overflow-y-auto p-6">
      <div class="max-w-200 mx-auto">
        <div id="invoice-preview" class="bg-white shadow-lg border border-gray-200 p-10 text-sm">

          <!-- Header -->
          <div class="flex items-start justify-between mb-10 pb-8 border-b border-gray-200">
            <div class="w-24">
              <img v-if="logo" :src="logo" class="h-16 w-auto object-contain">
              <div v-else class="h-16 w-16 rounded border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-[10px] uppercase tracking-wider">Logo</div>
            </div>
            <div class="text-center">
              <h1 class="text-4xl font-bold text-gray-100 uppercase tracking-[0.3em]">INVOICE</h1>
            </div>
            <div class="text-right">
              <p class="text-gray-800 font-semibold text-lg" v-text="invoice.number || 'INV-001'"></p>
              <div class="mt-2 space-y-0.5">
                <p class="text-gray-500 text-xs">
                  <span class="text-gray-300">Issued</span> {{ invoice.date || '—' }}
                </p>
                <p class="text-gray-500 text-xs">
                  <span class="text-gray-300">Due</span> {{ invoice.dueDate || '—' }}
                </p>
              </div>
            </div>
          </div>

          <!-- From & Bill To -->
          <div class="flex justify-between mb-10">
            <div>
              <p class="text-[11px] text-gray-300 uppercase tracking-wider mb-2">From</p>
              <p class="font-semibold text-gray-800" v-text="sender.name || 'Your Company'"></p>
              <p class="text-gray-400 text-xs" v-text="sender.email"></p>
              <p class="text-gray-400 text-xs" v-text="sender.phone"></p>
              <p class="text-gray-400 text-xs whitespace-pre-line" v-text="sender.address"></p>
            </div>
            <div class="text-right">
              <p class="text-[11px] text-gray-300 uppercase tracking-wider mb-2">Bill To</p>
              <p class="font-semibold text-gray-800" v-text="client.name || 'Client Name'"></p>
              <p class="text-gray-400 text-xs" v-text="client.email"></p>
              <p class="text-gray-400 text-xs" v-text="client.phone"></p>
              <p class="text-gray-400 text-xs whitespace-pre-line" v-text="client.address"></p>
            </div>
          </div>

          <!-- Items Table -->
          <table class="w-full mb-8">
            <thead>
              <tr class="border-y border-gray-200 text-left text-[11px] text-gray-300 uppercase tracking-wider">
                <th class="py-3 font-medium">Description</th>
                <th class="py-3 font-medium text-center w-14">Qty</th>
                <th class="py-3 font-medium text-right w-24">Rate</th>
                <th class="py-3 font-medium text-right w-24">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in items" :key="idx" class="border-b border-gray-50">
                <td class="py-3 text-gray-700" v-text="item.description || '—'"></td>
                <td class="py-3 text-gray-500 text-center" v-text="item.qty || 0"></td>
                <td class="py-3 text-gray-500 text-right" v-text="fmt(item.rate)"></td>
                <td class="py-3 text-gray-700 text-right font-medium" v-text="fmt(item.qty * item.rate)"></td>
              </tr>
            </tbody>
          </table>

          <!-- Totals -->
          <div class="flex justify-end mb-8">
            <div class="w-56 space-y-1.5 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-400">Subtotal</span>
                <span class="text-gray-700 font-medium" v-text="fmt(subtotal)"></span>
              </div>
              <div v-if="invoice.taxRate > 0" class="flex justify-between">
                <span class="text-gray-400">Tax ({{ invoice.taxRate }}%)</span>
                <span class="text-gray-700" v-text="fmt(taxAmount)"></span>
              </div>
              <div v-if="invoice.discount > 0" class="flex justify-between">
                <span class="text-gray-400">Discount</span>
                <span class="text-gray-700">-{{ fmt(invoice.discount) }}</span>
              </div>
              <div class="flex justify-between border-t-2 border-gray-900 pt-2 font-bold text-base">
                <span class="text-gray-900">Balance Due</span>
                <span class="text-gray-900" v-text="fmt(grandTotal)"></span>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div v-if="invoice.notes" class="border-t border-gray-200 pt-5">
            <p class="text-[11px] text-gray-300 uppercase tracking-wider mb-2">Notes</p>
            <p class="text-gray-400 text-xs whitespace-pre-line" v-text="invoice.notes"></p>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>
