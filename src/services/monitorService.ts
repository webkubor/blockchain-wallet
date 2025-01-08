import { ref } from 'vue'
import { ethers } from 'ethers'
import ERC20 from '@/abis/ERC20.json'

// 监控地址列表
const monitoredAddresses = ref<string[]>([])

// 交易记录
const transactionRecords = ref<any[]>([])

// USDT 合约地址
const USDT_CONTRACT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7'

// 初始化 provider
const provider = new ethers.providers.InfuraProvider('mainnet', process.env.VITE_INFURA_PROJECT_ID)

// 初始化 USDT 合约
const usdtContract = new ethers.Contract(
  USDT_CONTRACT_ADDRESS,
  ERC20.abi,
  provider
)

// 添加监控地址
export function addMonitoredAddress(address: string) {
  if (!monitoredAddresses.value.includes(address)) {
    monitoredAddresses.value.push(address)
    startWatchingAddress(address)
  }
}

// 获取监控地址列表
export function getMonitoredAddresses() {
  return monitoredAddresses.value
}

// 获取交易记录
export function getTransactionRecords() {
  return transactionRecords.value
}

// 启动地址监控
function startWatchingAddress(address: string) {
  // 监听 Transfer 事件
  const filter = usdtContract.filters.Transfer(null, address)
  
  usdtContract.on(filter, (from, to, value, event) => {
    const record = {
      txHash: event.transactionHash,
      from: from,
      to: to,
      value: ethers.utils.formatUnits(value, 6), // USDT 6 decimals
      timestamp: Math.floor(Date.now() / 1000)
    }
    
    transactionRecords.value.unshift(record)
  })
}

// 启动监控服务
export function startMonitoring() {
  // 加载已配置的地址
  const storedAddresses = localStorage.getItem('monitoredAddresses')
  if (storedAddresses) {
    monitoredAddresses.value = JSON.parse(storedAddresses)
    monitoredAddresses.value.forEach(startWatchingAddress)
  }

  // 定期保存地址列表
  setInterval(() => {
    localStorage.setItem(
      'monitoredAddresses',
      JSON.stringify(monitoredAddresses.value)
    )
  }, 10000)
}
