<template>
  <div class="monitor-container">
    <h2>USDT 交易监控</h2>
    
    <div class="address-input">
      <a-input
        v-model="address"
        placeholder="请输入监控地址"
        allow-clear
      />
      <a-button
        type="primary"
        :disabled="!isValidAddress"
        @click="startMonitor"
      >
        {{ isMonitoring ? '停止监控' : '开始监控' }}
      </a-button>
    </div>

    <a-table
      :loading="loading"
      :data="transactions"
      :pagination="false"
      :scroll="{ y: 'calc(100vh - 200px)' }"
    >
      <a-table-column title="链" data-index="chain" :width="100" />
      <a-table-column title="交易哈希" data-index="hash" :width="200">
        <template #cell="{ record }">
          <a
            :href="`${EXPLORER_URLS[record.chain]}/tx/${record.hash}`"
            target="_blank"
          >
            {{ record.hash }}
          </a>
        </template>
      </a-table-column>
      <a-table-column title="时间" data-index="timestamp" :width="180">
        <template #cell="{ record }">
          {{ formatDate(record.timestamp) }}
        </template>
      </a-table-column>
      <a-table-column title="金额 (USDT)" data-index="amount" :width="120" />
      <a-table-column title="发送方" data-index="from" :width="200" />
      <a-table-column title="接收方" data-index="to" :width="200" />
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onUnmounted } from 'vue'
import { MultiChainMonitor } from '../../services/multiChainMonitorService'
import { USDT_CONTRACTS, EXPLORER_URLS } from '../../utils/networks'
import { formatDate } from '../../utils/format'

interface Transaction {
  hash: string
  timestamp: number
  amount: string
  status: boolean
  from: string
  to: string
  chain: string
}

const address = ref('')
const transactions = ref<Transaction[]>([])
const loading = ref(false)
const isMonitoring = ref(false)
let monitor: MultiChainMonitor | null = null

const isValidAddress = computed(() => {
  return /^0x[a-fA-F0-9]{40}$/.test(address.value)
})

function startMonitor() {
  if (isMonitoring.value) {
    stopMonitor()
    return
  }

  loading.value = true
  transactions.value = []
  
  monitor = new MultiChainMonitor(
    address.value,
    (newTransactions) => {
      transactions.value = [...newTransactions, ...transactions.value]
      loading.value = false
    }
  )

  monitor.start()
  isMonitoring.value = true
}

function stopMonitor() {
  if (monitor) {
    monitor.stop()
    monitor = null
    isMonitoring.value = false
  }
}

onUnmounted(() => {
  stopMonitor()
})
</script>

<style scoped>
.monitor-container {
  padding: 20px;
}

.address-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>
