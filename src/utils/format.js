/**
 * 格式化时间戳为本地时间字符串
 * @param {number|string} timestamp - 时间戳
 * @returns {string} 格式化后的时间字符串
 */
export const formatDate = (timestamp) => {
  const date = new Date(Number(timestamp) * 1000)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}

/**
 * 缩短哈希字符串显示
 * @param {string} hash - 原始哈希字符串
 * @param {number} [startLen=6] - 开头保留长度
 * @param {number} [endLen=4] - 结尾保留长度
 * @returns {string} 缩短后的哈希字符串
 */
export const shortenHash = (hash, startLen = 6, endLen = 4) => {
  if (!hash || typeof hash !== 'string') return ''
  if (hash.length <= startLen + endLen) return hash
  return `${hash.slice(0, startLen)}...${hash.slice(-endLen)}`
}
