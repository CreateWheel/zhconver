import { simplified, traditional } from './data'
const sMap = new Map()
const tMap = new Map()
const sLen = simplified.length
for (let i = 0; i < sLen; i++) {
  const s = simplified[i]
  const t = traditional[i]
  sMap.set(s, t)
  tMap.set(t, s)
}

/**
 * Convert
 * @param {Map} map Simplified Chinese and Traditional Chinese mapping table
 * @param {string} chars The string to be converted
 */
function convert(map, chars) {
  const set = new Set(chars)
  set.forEach((item) => {
    if (map.has(item)) {
      // chars = chars.replaceAll(item, map.get(item))
      chars = chars.replace(new RegExp(item, 'g'), map.get(item))
    }
  })
  return chars
}

/**
 * Simplified Chinese to Traditional Chinese
 * @param {string} chars The string to be converted
 */
export const s2t = (chars) => convert(sMap, chars)

/**
 * Traditional Chinese to Simplified Chinese
 * @param {string} chars The string to be converted
 */
export const t2s = (chars) => convert(tMap, chars)

/**
 * Add or modify existing simplified or traditional Chinese characters
 * @param {[[string,string]]} mapper Conversion Mapping Table
 * @example
 * ```js
 * const mapper = [
 *    ['水', '💧'],
 *    ['火', '🔥'],
 *    ['龙', '🐉']
 *  ]
 *
 * set(mapper)
 * console.log(s2t('我最喜欢吃的水果是火龙果'))
 * // => '我最喜歡吃的💧果是🔥🐉果'
 * ```
 */
export const set = (mapper) => {
  for (const [cn, tw] of mapper) {
    sMap.set(cn, tw)
    tMap.set(tw, cn)
  }
}
