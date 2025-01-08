import { JsonRpcProvider, Contract, formatUnits } from 'ethers'

const ERC20_ABI = [
  'event Transfer(address indexed from, address indexed to, uint256 value)'
]

export const evmService = {
  watchTransferEvents: async (
    rpcUrl: string,
    contractAddress: string,
    address: string,
    callback: (event: {
      hash: string
      from: string
      to: string
      amount: string
    }) => void
  ) => {
    const provider = new JsonRpcProvider(rpcUrl)
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

    // 定时检查网络状态
    const interval = setInterval(async () => {
      try {
        await provider.getBlockNumber()
      } catch (err) {
        console.warn('Network error, retrying...')
        contract.off(filter, handler)
        contract.on(filter, handler)
      }
    }, 10000)

    return () => {
      clearInterval(interval)
      contract.off(filter, handler)
    }
  },

  getTransactions: async (
    rpcUrl: string,
    contractAddress: string,
    address: string
  ) => {
    const provider = new JsonRpcProvider(rpcUrl)
    const contract = new Contract(contractAddress, ERC20_ABI, provider)

    const logs = await provider.getLogs({
      address: contractAddress,
      topics: [
        contract.interface.getEventTopic('Transfer'),
        null,
        address
      ]
    })

    const transactions = []
    for (const log of logs) {
      const event = contract.interface.parseLog(log)
      const block = await provider.getBlock(log.blockNumber)
      transactions.push({
        hash: log.transactionHash,
        from: event.args.from,
        to: event.args.to,
        amount: formatUnits(event.args.value, 6).toString(),
        timestamp: block.timestamp * 1000,
        status: '成功'
      })
    }
    return transactions
  }
}