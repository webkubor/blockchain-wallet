import { ref } from 'vue'
import { USDT_CONTRACTS } from '@/utils/networks'
import { getTransactions as getEthTransactions } from '@/contract/eth'
import { getTransactions as getBscTransactions } from '@/contract/bsc'

interface Transaction {
  hash: string
  timestamp: number
  amount: string
  status: string
  from: string
  to: string
}

/**
 * 获取监控服务实例
 */
export const useMonitorService = () => {
  const loading = ref(false)
  const error = ref(null)

  /**
   * 获取指定地址的 USDT 交易记录
   * @param {string} address - 监控地址
   * @param {string} chain - 链类型 (ETH/BSC)
   * @returns {Promise<Transaction[]>} 交易记录数组
   */
  const getTransactions = async (address: string, chain: string): Promise<Transaction[]> => {
    try {
      loading.value = true
      error.value = null

      const contractAddress = USDT_CONTRACTS[chain]
      if (!contractAddress) {
        throw new Error('不支持的链类型')
      }

      let transactions: Transaction[] = []
      switch (chain) {
        case 'ETH':
          transactions = await getEthTransactions(address, contractAddress)
          break
        case 'BSC':
          transactions = await getBscTransactions(address, contractAddress)
          break
        default:
          throw new Error('不支持的链类型')
      }

      return transactions.map(tx => ({
        ...tx,
        status: tx.status ? '成功' : '失败'
      }))
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    getTransactions
  }
}
