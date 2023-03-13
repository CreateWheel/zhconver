import { simplified, traditional } from './data'
import { Trie, convert, ArrayFrom } from './utils'
export { Trie } from './utils'

const sTrie = new Trie()
const tTrie = new Trie()
const sMap = new Map()
const tMap = new Map()
const sLen = simplified.length
// init mapping table
for (let i = 0; i < sLen; i++) {
  const s = simplified[i]
  const t = traditional[i]
  sMap.set(s, t)
  tMap.set(t, s)
}

/**
 * Simplified Chinese to Traditional Chinese
 * @param { string } chars The string to be converted
 * @param { boolean } isTrie Whether to use dictionary tree query replacement
 * A: When should I use the dictionary tree?
 * B: Use the dictionary tree when you want to convert a word or phrase
 * @example
 * ```js
 * const mapper = [
 *    ['香蕉', '🍌'],
 *    ['草莓', '🍓'],
 *    ['芒果', '🥭']
 *  ]
 *
 * set(mapper)
 * console.log(s2t('我最喜欢吃的水果是香蕉和草莓', true))
 * // => '我最喜歡吃的水果是🍌和🍓'
 * ```
 */
export const s2t = (chars, isTrie) => convert(sTrie, sMap, chars, isTrie)

/**
 * Traditional Chinese to Simplified Chinese
 * @param { string } chars The string to be converted
 * @param { boolean } isTrie Whether to use dictionary tree query replacement
 * A: When should I use the dictionary tree?
 * B: Use the dictionary tree when you want to convert a word or phrase
 * @example
 * ```js
 * const mapper = [
 *    ['香蕉', '🍌'],
 *    ['草莓', '🍓'],
 *    ['芒果', '🥭']
 *  ]
 *
 * set(mapper)
 * console.log(s2t('我最歡欢吃的水果是香蕉和草莓', true))
 * // => '我最喜喜吃的水果是🍌和🍓'
 * ```
 */
export const t2s = (chars, isTrie) => convert(tTrie, tMap, chars, isTrie)

/**
 * Add or modify existing simplified or traditional Chinese characters
 * @param { [[string,string]] } mapper Conversion Mapping Table
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
  for (const [s, t] of mapper) {
    ArrayFrom(s).length > 1 ? sTrie.insert(s, t) : sMap.set(s, t)
    ArrayFrom(s).length > 1 ? tTrie.insert(t, s) : tMap.set(t, s)
  }
}
