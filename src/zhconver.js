import { conver } from './conver'
import { simplified, traditional } from './dict'
import { Trie, ArrayFrom } from './trie'
export { conver } from './conver'
export { Trie } from './trie'

const Strie = new Trie()
const Ttrie = new Trie()
const simplifiedArray = ArrayFrom(simplified)
const traditionalArray = ArrayFrom(traditional)
const sLen = simplifiedArray.length
// init mapping table
for (let i = 0; i < sLen; i++) {
  const s = simplifiedArray[i]
  const t = traditionalArray[i]
  Strie.add(s, t)
  Ttrie.add(t, s)
}

/**
 * Simplified Chinese to Traditional Chinese ({@link conver})
 * @param { string } chars The string to be converted
 * @param { Trie } trie use custom trie
 * @returns The converted string
 */
export const s2t = (chars, trie = Strie) => conver(chars, trie)

/**
 * Traditional Chinese to Simplified Chinese ({@link conver})
 * @param { string } chars The string to be converted
 * @param { Trie } trie use custom trie
 * @returns The converted string
 */
export const t2s = (chars, trie = Ttrie) => conver(chars, trie)
