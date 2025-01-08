<template>
  <div class="monitor-container">
    <a-card class="monitor-card">
      <template #title>
        <span class="card-title">交易监控</span>
      </template>

      <a-space direction="vertical" size="middle" fill>
        <a-form :model="form" :label-col-props="{ span: 6 }" layout="vertical">
          <a-form-item label="区块链浏览器">
            <a-space>
              <a :href="EXPLORER_URLS[form.chain]" target="_blank">{{EXPLORER_URLS[form.chain]}}</a>
            </a-space>
          </a-form-item>

          <a-form-item field="chain" label="链 & USDT合约地址">
            <a-select v-model="form.chain" placeholder="请选择链">
              <a-option value="ETH">ETH - {{ USDT_CONTRACTS.ETH }}</a-option>
              <a-option value="BSC">BSC - {{ USDT_CONTRACTS.BSC }}</a-option>
              <a-option value="TRON">TRON - {{ USDT_CONTRACTS.TRON }}</a-option>
            </a-select>
          </a-form-item>

          <a-form-item field="address" label="监听地址">
            <a-input v-model="form.address" placeholder="请输入要监听的账户地址" />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="handleStartMonitor">
              开始监控
            </a-button>
          </a-form-item>
        </a-form>

        <a-divider />

        <a-table :data="transactions" :bordered="false">
          <a-table-column title="交易哈希" data-index="hash" />
          <a-table-column title="区块高度" data-index="timestamp" />
          <a-table-column title="金额" data-index="amount" />
          <a-table-column title="发送方" data-index="from" />
          <a-table-column title="接收方" data-index="to" />
          <a-table-column title="区块链浏览器">
            <template #cell="{ record }">
              <a :href="`${EXPLORER_URLS[form.chain]}/tx/${record.hash}`" target="_blank">
                查看详情
              </a>
            </template>
          </a-table-column>
          <template #empty>
            <a-empty description="暂无交易记录" />
          </template>
        </a-table>
      </a-space>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { USDT_CONTRACTS,EXPLORER_URLS } from '@/utils/networks'
import { useMonitorService } from '@/services/monitorService'
const { watchTransferEvents } = useMonitorService()
const form = reactive({
  address: '0x0585b2D1Df27523712561163F73210096202aD52',
  chain: 'ETH' as 'ETH' | 'BSC' | 'TRON'
})

const transactions = ref<Array<{
  hash: string
  from: string
  to: string
  amount: string
  timestamp: number
}>>([])

const handleStartMonitor = async () => {
  if (!form.address) {
    return
  }

  try {
    const unsubscribe = watchTransferEvents(
      form.address,
      form.chain,
      (event) => {
        transactions.value.unshift({
          hash: event.hash,
          from: event.from,
          to: event.to,
          amount: event.amount,
          timestamp: Date.now()
        })
      }
    )

    return () => {
      unsubscribe()
    }
  } catch (error) {
    console.error('监控失败:', error)
  }
}
</script>

<style lang="less" scoped>
.monitor-container {
  padding: 16px;
  
  .monitor-card {
    max-width: 800px;
    margin: 0 auto;
    padding: 16px;
    
    :deep(.arco-form-item) {
      margin-bottom: 12px;
    }
    
    :deep(.arco-select) {
      width: 100%;
    }
    
    :deep(.arco-input) {
      width: 100%;
    }
    
    :deep(.arco-btn) {
      width: 100%;
      margin-top: 8px;
    }
  }
  
  .card-title {
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
