import { ref, computed } from 'vue'
import { currencies } from '../data/currencies.js'
import { useI18n } from './useI18n.js'

const { t } = useI18n()

const logo = ref(null)
const currency = ref('IDR')

const sender = ref({
  name: t('defaults.senderName'),
  email: t('defaults.senderEmail'),
  phone: t('defaults.senderPhone'),
  address: t('defaults.senderAddress'),
})

const client = ref({
  name: t('defaults.clientName'),
  email: t('defaults.clientEmail'),
  phone: t('defaults.clientPhone'),
  address: t('defaults.clientAddress'),
})

const invoice = ref({
  number: 'INV-2026-0042',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  taxRate: 11,
  discount: 0,
  notes: t('defaults.notes'),
})

const items = ref([
  { description: t('defaults.item1'), qty: 1, rate: 15000000 },
  { description: t('defaults.item2'), qty: 2, rate: 5000000 },
  { description: t('defaults.item3'), qty: 3, rate: 2500000 },
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
  currency.value = 'IDR'
  logo.value = null
}

function printInvoice() {
  window.print()
}

export function useInvoice() {
  return {
    logo,
    currency,
    sender,
    client,
    invoice,
    items,
    subtotal,
    taxAmount,
    grandTotal,
    currencies,
    fmt,
    addItem,
    removeItem,
    resetInvoice,
    printInvoice,
  }
}
