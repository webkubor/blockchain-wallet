<template>
  <div class="admin-container">
    <h1>USDT 充值记录</h1>
    
    <div class="address-control">
      <input
        v-model="newAddress"
        placeholder="输入监控地址"
      />
      <button @click="addAddress">添加监控地址</button>
    </div>

    <div class="record-list">
      <div v-for="record in records" :key="record.txHash" class="record-item">
        <div class="record-info">
          <div>From: {{ record.from }}</div>
          <div>To: {{ record.to }}</div>
          <div>Amount: {{ record.value }} USDT</div>
          <div>Time: {{ formatTime(record.timestamp) }}</div>
        </div>
        <a 
          :href="`https://etherscan.io/tx/${record.txHash}`"
          target="_blank"
          class="tx-link"
        >
          查看交易详情
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { 
  addMonitoredAddress,
  getMonitoredAddresses,
  getTransactionRecords 
} from '@/services/monitorService'

const newAddress = ref('')
const records = ref([])

const addAddress = () => {
  if (newAddress.value) {
    addMonitoredAddress(newAddress.value)
    newAddress.value = ''
  }
}

const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleString()
}

onMounted(async () => {
  // 初始化时加载已有记录
  records.value = getTransactionRecords()
})
</script>

<style scoped>
.admin-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.address-control {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.record-list {
  margin-top: 30px;
}

.record-item {
  border: 1px solid #eee;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.record-info {
  flex: 1;
}

.tx-link {
  color: #409eff;
  text-decoration: none;
}

.tx-link:hover {
  text-decoration: underline;
}
</style>
