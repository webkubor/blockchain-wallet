import { useWallect } from '@/hooks/useWallect'
import { ethers } from 'ethers' // eslint-disable-line
import { contractMap } from '@/utils/networks'
const { account, chain } = useWallect()

/**
 * @description: 获取log的provider
 * @param {*}
 * @return {*}
 */
export function getLogProvider () {
  const contractAddress = getContractAddress()
  if (contractAddress.infuraKey) {
    return new ethers.providers.InfuraProvider(contractAddress.infuraName)
  } else {
    return new ethers.providers.JsonRpcProvider(contractAddress.rpcURL)
  }
}

/**
 * @description: 基于ether.js返回的合约对象(用于区分只读和读写权限)
 * @param {*} tokenJson ABI文件
 * @param {*} contractAddress 合约地址
 * @return {*}
 */
export async function outContract (tokenJson, address) {
  if (!account.value) {
    window.$message?.warning('please connect Metamsk')
    return
  }
  const ethersProvider = new ethers.providers.Web3Provider(
    window.ethereum,
    'any'
  )  // eslint-disable-line
  const Contract = new ethers.Contract(
    address,
    tokenJson,
    ethersProvider.getSigner()
  )
  return Contract
}

/**
 * @description: 根据链ID直接获取合约配置
 * @param {*}
 * @return {*}
 */
export function getContractAddress () {
  if (!chain.id) {
    console.error('cannot found chanId')
    return
  }
  const chainId = chain.id
  const contractAddress = contractMap[chainId]
  if (contractAddress?.support) {
    return contractAddress
  } else {
    return null
  }
}

/**
 * @description: 监听链高度
 * @param {*}
 * @return {*}
 */
export function fetchBlockOnLine () {
  try {
    const provider = getLogProvider()
    provider.on('block', (blockNumber) => {
      window.blockNumber = blockNumber
      console.log(blockNumber, 'Block change')
    })
  } catch (error) {
    console.log(error, 'fetchBlockOnLine')
  }
}
/**
 * @description: 提前预估Gas free
 * @param {*} value
 * @param {*} contractAddress
 * @return {*}
 */
export function getEstimateGas (value, contractAddress) {
  if (!account.value) return
  const provider = new ethers.providers.getDefaultProvider() // eslint-disable-line
  const transaction = {
    from: account.value,
    to: contractAddress,
    value,
    data: '0x',
    chainId: provider.network.chainId
  }
  console.log('%c%s', 'color: #86bf60', 'getEstimateGas', transaction)
  return provider.estimateGas(transaction)
}
