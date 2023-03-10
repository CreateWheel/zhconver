import { CN, TW } from './data'
const cn2twMap = new Map()
const tw2cnMap = new Map()
const cnLen = CN.length
for (let i = 0; i < cnLen; i++) {
  const cn = CN[i]
  const tw = TW[i]
  cn2twMap.set(cn, tw)
  tw2cnMap.set(tw, cn)
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
export const cn2tw = (chars) => convert(cn2twMap, chars)

/**
 * Traditional Chinese to Simplified Chinese
 * @param {string} chars The string to be converted
 */
export const tw2cn = (chars) => convert(tw2cnMap, chars)

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
 * console.log(cn2tw('我最喜欢吃的水果是火龙果'))
 * // => '我最喜歡吃的💧果是🔥🐉果'
 * ```
 */
export const set = (mapper) => {
  for (const [cn, tw] of mapper) {
    cn2twMap.set(cn, tw)
    tw2cnMap.set(tw, cn)
  }
}
