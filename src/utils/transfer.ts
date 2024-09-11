import { ethers } from "ethers";
import { dealDecimals} from "./format";


export function receiveAmount(amount:string | number, tokenDecimals = 18) {
  let inNumber = transBigNumber(amount);
  if (inNumber * 1  === 0 ) return "0"
  let outAmount = ethers.utils.formatUnits(inNumber, tokenDecimals); //处理原数据
  if (tokenDecimals * 1 > 10) return dealDecimals(outAmount, 10); // 截取有效数据
  return outAmount * 1;
}

/**
 * @description: 大数据处理使用ethers
 * @param {*} amount
 * @param {*} tokenDecimals
 * @return {*}
 */
export function toAmount(amount:string | number, tokenDecimals = 18) {
  if (!amount * 1) return 0
  amount = String(amount)
  return ethers.utils.parseUnits(amount, tokenDecimals)
}

/**
 * @description: Bignumber => 10进制字符串
 * @param {*} object
 * @return {*}
 */
export function transBigNumber(object) {
  let isBig = ethers.BigNumber.isBigNumber(object);
  if (isBig) return object.toString();
  return object;
}
