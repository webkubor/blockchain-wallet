import TronWeb from 'tronweb'

export const tronService = {
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
    const tronWeb = new TronWeb({ fullHost: rpcUrl })
    const contract = await tronWeb.contract().at(contractAddress)

    const watch = contract.Transfer().watch((err: any, event: any) => {
      if (err) {
        console.error('TRON event error:', err)
        return
      }
      if (event.result.to === address) {
        callback({
          hash: event.transaction,
          from: event.result.from,
          to: event.result.to,
          amount: (event.result.value / 1e6).toString()
        })
      }
    })

    return () => watch.stop()
  },

  getTransactions: async (
    rpcUrl: string,
    contractAddress: string,
    address: string
  ) => {
    const tronWeb = new TronWeb({ fullHost: rpcUrl })
    const events = await tronWeb.getEventResult(contractAddress, {
      eventName: 'Transfer',
      filters: { to: address }
    })

    return events.map((event: any) => ({
      hash: event.transaction,
      from: event.result.from,
      to: event.result.to,
      amount: (event.result.value / 1e6).toString(),
      timestamp: event.timestamp,
      status: '成功'
    }))
  }
}