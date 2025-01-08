import { ref } from 'vue'
import { USDT_CONTRACTS } from '@/utils/networks'
import { 
  JsonRpcProvider,
  Contract,
  formatUnits
} from 'ethers'
import ERC20_ABI from '@/abis/ERC20.json'

interface Transaction {
  hash: string
  timestamp: number
  amount: string
  status: string
  from: string
  to: string
}

interface TransferEvent {
  transactionHash: string
  args: {
    from: string
    to: string
    value: bigint
  }
}

const RPC_URLS: Record<string, string> = {
  eth: 'https://rpc.ankr.com/eth',
  bsc: 'https://bsc-dataseed1.defibit.io/'
}

export const useMonitorService = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const watchTransferEvents = (
    address: string,
    chain: keyof typeof USDT_CONTRACTS,
    callback: (event: {
      hash: string
      from: string
      to: string
      amount: string
    }) => void
  ) => {
    const contractAddress = USDT_CONTRACTS[chain]
    if (!contractAddress) {
      throw new Error('不支持的链类型')
    }

    const provider = new JsonRpcProvider(RPC_URLS[chain])
    const contract = new Contract(contractAddress, ERC20_ABI, provider)
    
    const filter = contract.filters.Transfer(null, address)
    const handler = (from: string, to: string, value: bigint, event: { transactionHash: string }) => {
      callback({
        hash: event.transactionHash,
        from,
        to,
        amount: formatUnits(value, 6).toString()
      })
    }
    
    contract.on(filter, handler)

    return () => {
      contract.off(filter, handler)
    }
  }

  const getTransactions = async (address: string, chain: keyof typeof USDT_CONTRACTS): Promise<Transaction[]> => {
    try {
      loading.value = true
      error.value = null

      const contractAddress = USDT_CONTRACTS[chain]
      if (!contractAddress) {
        throw new Error('不支持的链类型')
      }

      const provider = new JsonRpcProvider(RPC_URLS[chain])
      const contract = new Contract(contractAddress, ERC20_ABI, provider)

      const transferEvent = contract.interface.getEvent('Transfer')
      if (!transferEvent) {
        throw new Error('Transfer event not found in contract ABI')
      }
      
      const logs = await provider.getLogs({
        address: contractAddress,
        topics: [
          transferEvent.topicHash,
          null,
          address
        ]
      })

      const transactions: Transaction[] = []
      
      for (const log of logs) {
        const event = contract.interface.parseLog(log)
        if (!event) continue
        
        const block = await provider.getBlock(log.blockNumber)
        if (!block) {
          console.warn(`Block ${log.blockNumber} not found`)
          continue
        }
        
        const [from, to, value] = event.args
        transactions.push({
          hash: log.transactionHash,
          from,
          to,
          amount: formatUnits(value, 6).toString(),
          timestamp: block.timestamp * 1000,
          status: '成功'
        })
      }

      return transactions
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      error.value = message
      throw new Error(message)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    getTransactions,
    watchTransferEvents
  }
}
