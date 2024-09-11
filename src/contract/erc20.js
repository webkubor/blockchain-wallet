/*
 * @Author: webkubor
 * @Date: 2021-05-27 15:35:19
 * @LastEditTime: 2022-08-09 10:12:02
 */
import { outContract, getContractAddress } from '@/contract'
import tokenJson from '@/abis/ERC20.json'
import * as Transfer from '@/utils/transfer'

export async function getContract (token) {
  const contract = await outContract(tokenJson, token)
  return contract
}

/**
 * @description:获取平台币余额
 * @param {*} tokenAddress
 * @param {*} account
 * @return {*}
 */
export async function getBalanceOf (tokenAddress, account) {
  const contract = await getContract(tokenAddress)
  const tokenDecimals = await decimals(tokenAddress)
  let result = await contract.balanceOf(account)
  result = Transfer.receiveAmount(result, tokenDecimals)
  return result
}

/**
 * @description: 获取改token的简称
 * @param {*} tokenAddress
 * @return {*}
 */
export async function symbol (tokenAddress) {
  const contract = await getContract(tokenAddress)
  const symbol = await contract.symbol()
  const name = await fullName(tokenAddress)
  return { symbol, name }
}

/**
 * @description: transfer
 * @param {*} tokenAddress
 * @param {*} receiveAddress
 * @param {*} amount
 * @return {*}
 */
export async function transfer (tokenAddress, receiveAddress, amount, owner) {
  try {
    const contract = await getContract(tokenAddress)
    const tx = await contract?.transfer(receiveAddress, amount, {
      from: owner
    })
    const result = await tx.wait()
    return result
  } catch (error) {
    console.error(error.message)
  }
}

/**
 * @description: 币种全名
 * @param {*} tokenAddress
 * @return {*}
 */
export async function fullName (tokenAddress) {
  try {
    const contract = await getContract(tokenAddress)
    const name = await contract.name()
    return name
  } catch (error) {
    console.log('token: ' + tokenAddress + 'fetch name error', error)
  }
}

/**
 * @description:获取decimals
 * @param {*}
 * @return {*}
 */
export async function decimals (tokenAddress) {
  const contract = await getContract(tokenAddress)
  const result = await contract.decimals()
  return result
}

/**
 * @description:查阅批准限额
 * @param {*} token
 * @param {*} owner
 * @return {*}
 */
export async function allowance (token, owner) {
  const contract = await getContract(token)
  const contractAddress = getContractAddress()
  if (!contractAddress.ShorterBone) return
  const allowance = await contract.allowance(
    owner,
    contractAddress.ShorterBone
  )
  return Transfer.receiveAmount(allowance, 18)
}

/**
 * @description:开始授权
 * @param {*} token
 * @param {*} owner
 * @return {*}
 */
export async function approve (token, owner) {
  const contract = await getContract(token)
  const contractAddress = getContractAddress()
  const amount =
    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
  if (!contractAddress.ShorterBone) return
  const tx = await contract.approve(contractAddress.ShorterBone, amount, {
    from: owner
  })
  const approve = await tx.wait()
  return approve
}
