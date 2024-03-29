// eslint-disable-next-line no-unused-vars
import { ArrayFrom, Trie } from './trie'
export { Trie } from './trie'

/**
 * replaceAll polyfill
 * @param { string } chars String to replace
 * @param { string } searchValue An object that supports searching for and replacing matches within a string
 * @param { string } replaceValue The replacement text
 * @returns
 */
const replaceAll = (chars, searchValue, replaceValue) => chars.replace(new RegExp(searchValue, 'g'), replaceValue)

/* eslint-disable max-len */
/**
 * Using dictionary tree conversion
 * @param { string } chars The string to be converted
 * @param { Trie } instance Dictionary tree instance, Simplified Chinese and Traditional Chinese mapping table for words or phrases
 * @returns The converted string
 * @example
 * ```js
 * const trie = new Trie();
 * trie.add("香蕉", "🍌");
 * trie.add("草莓", "🍓");
 * trie.add("芒果", "🥭");
 * console.log(conver("我最喜欢吃的水果是香蕉和草莓", trie));
 * // => '我最喜欢吃的水果是🍌和🍓'
 * ```
 */
/* eslint-enable max-len */
export function conver(chars, instance) {
  const array = ArrayFrom(chars)
  const arrayLen = array.length
  const replaceChars = []
  for (let i = 0; i < arrayLen; i++) {
    const [index, key, value] = instance.find(array, i)
    // Re-indexing, in order to avoid duplication of text that has already been judged, thus improving performance
    i = index
    if (key) replaceChars.push([key, value])
  }

  const desc = replaceChars.sort(([a], [b]) => b.length - a.length)
  for (const [key, value] of desc) chars = replaceAll(chars, key, value)

  return chars
}
