/*
 * @Date: 2022-04-25 11:29:51
 * @LastEditTime: 2022-04-25 11:42:50
 */
import { ethers } from 'ethers'
export function sendTransaction (account, address, amount) {
  window.$loadingBar?.start()
  const tx = {
    from: account,
    to: address,
    value: ethers.utils.parseEther(String(amount))._hex,
    data: ''
  }
  window.ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [tx]
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => {
      window.$message?.warning(error.message)
      console.error(error)
    })
    .finally(() => {
      window.$loadingBar?.finish()
    })
}
