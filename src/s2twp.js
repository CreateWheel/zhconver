import { STCharacters, STPhrases, TWPhrasesIT, TWPhrasesName, TWPhrasesOther, TWVariantsRev } from './lib/data'
import { Trie, trieCanvert, loadDict } from './lib/utils'
export { Trie } from './lib/utils'

const types = ['s2twp']
const dicts = {
  s2twp: [STCharacters, STPhrases, TWVariantsRev, TWPhrasesIT, TWPhrasesName, TWPhrasesOther]
}
for (const type of types) {
  const trie = new Trie()
  loadDict(trie, dicts[type])
  dicts[type] = trie
}

/**
 * Convert between Simplified Chinese and Traditional Chinese
 * @param { string } chars The string to be converted
 * @param { { trie: Trie, type: 's2twp' } } options
 */
export const convert = (chars, { trie, type = 's2twp' } = {}) => {
  if (!types.includes(type)) throw new Error('options.type must be: ' + types.join(', '))
  return trieCanvert(chars, trie ? trie : dicts[type])
}
