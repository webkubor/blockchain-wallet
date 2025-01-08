import { evmService } from './evmService'
import { tronService } from './tronService'
import { USDT_CONTRACTS } from '@/utils/networks'

const RPC_URLS: Record<string, string> = {
  ETH: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
  BSC: 'https://bsc-dataseed1.defibit.io/',
  TRON: 'https://api.trongrid.io'
}

export const monitorService = {
  watchTransferEvents: async (
    chain: 'ETH' | 'BSC' | 'TRON',
    address: string,
    callback: (event: {
      hash: string
      from: string
      to: string
      amount: string
    }) => void
  ) => {
    const contractAddress = USDT_CONTRACTS[chain]
    console.log(contractAddress, USDT_CONTRACTS,chain)
    if (!contractAddress) throw new Error('不支持的链类型')

    const rpcUrl = RPC_URLS[chain]
    if (chain === 'TRON') {
      return tronService.watchTransferEvents(rpcUrl, contractAddress, address, callback)
    } else {
      return evmService.watchTransferEvents(rpcUrl, contractAddress, address, callback)
    }
  },

  getTransactions: async (
    chain: 'ETH' | 'BSC' | 'TRON',
    address: string
  ) => {
    const contractAddress = USDT_CONTRACTS[chain]
    if (!contractAddress) throw new Error('不支持的链类型')

    const rpcUrl = RPC_URLS[chain]
    if (chain === 'TRON') {
      return tronService.getTransactions(rpcUrl, contractAddress, address)
    } else {
      return evmService.getTransactions(rpcUrl, contractAddress, address)
    }
  }
}