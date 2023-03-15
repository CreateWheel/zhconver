import { TSCharacters, TSPhrases, TWVariantsRev, TWVariantsRevPhrases } from './lib/data'
import { Trie, trieCanvert, loadDict } from './lib/utils'
export { Trie } from './lib/utils'

const types = ['tw2s']
const dicts = {
  tw2s: [TSPhrases, TSCharacters, TWVariantsRev, TWVariantsRevPhrases]
}
for (const type of types) {
  const trie = new Trie()
  loadDict(trie, dicts[type])
  dicts[type] = trie
}

/**
 * Convert between Simplified Chinese and Traditional Chinese
 * @param { string } chars The string to be converted
 * @param { { trie: Trie, type: 'tw2s' } } options
 */
export const convert = (chars, { trie, type = 'tw2s' } = {}) => {
  if (!types.includes(type)) throw new Error('options.type must be: ' + types.join(', '))
  return trieCanvert(chars, trie ? trie : dicts[type])
}
