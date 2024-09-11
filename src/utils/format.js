import _ from 'lodash'

/**
 * @description: 纯数量格式化
 * @param {number} num 数字
 * @param {number} decimal 小数
 * @param {boolean} unit 是否带单位
 * @return {number}
 */
export function formatNum (num, decimal = 2, unit = false) {
  if (!num) return num
  const units = ['', 'K', 'M', 'B', 'T']
  let unitIndex
  let result = num
  if (num < 1000 * 10) {
    // nothing
    unitIndex = 0
  } else if (num < Math.pow(1000, 2) * 10) {
    // K
    unitIndex = 1
  } else if (num < Math.pow(1000, 3) * 10) {
    // M
    unitIndex = 2
  } else if (num < Math.pow(1000, 4) * 10) {
    // B
    unitIndex = 3
  } else {
    // T
    unitIndex = 4
  }
  if (unit) {
    result = _.divide(result, Math.pow(1000, unitIndex))
    result = retain(result, decimal)
    result = toCurrency(result)
    result = result + units[unitIndex]
  } else {
    result = retain(result, decimal)
    result = toCurrency(result)
  }
  return result

  function toCurrency (num) {
    const parts = num.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  }
  function retain (num, decimal) {
    const magnification = Math.pow(10, decimal)
    return Math.floor(num * magnification) / magnification
  }
}

/**
 * @description: 按照精度截取数据(小数,科学记数法,非四舍五入)
 * @param {*}
 * @return {*} string
 */
export function dealDecimals (value, decimals) {
  let amount = String(value)
  let isDealPosint = amount.split('.')
  if (!isDealPosint && value * 1 < 0 && isDealPosint.length < 2) {
    amount = _toNonExponential(value * 1)
    isDealPosint = amount.split('.')
  }
  if (isDealPosint && isDealPosint.length === 2) {
    const integer = isDealPosint[0]
    const point = isDealPosint[1]
    const maxLength = decimals * 1 + integer.length + 1
    if (point && point.length) return amount.substring(0, maxLength)
  }
  return amount
}

/**
 * @description: 将科学记数法转化正常计数
 * @param {*} num
 * @return {*}
 */
function _toNonExponential (num) {
  const m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
  return num.toFixed(Math.max(0, (m[1] || '').length - m[2]))
}

/**
 * @description: 长文本省略中间部分
 * @param {string} str 文本内容
 * @param {number} start 保留文本头部长度
 * @param {number} end 保留文本尾部长度
 * @return {string}
 */
export function ellipsisStr (str, start = 6, end = 4) {
  if (typeof str === 'string') {
    return str.slice(0, start) + '...' + str.slice(-end)
  }
  return str
}
