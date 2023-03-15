import { HKVariants, HKVariantsRevPhrases, TSCharacters, TSPhrases } from './lib/data'
import { Trie, trieCanvert, loadDict } from './lib/utils'
export { Trie } from './lib/utils'

const types = ['hk2s']
const dicts = {
  hk2s: [TSPhrases, TSCharacters, HKVariants, HKVariantsRevPhrases]
}
for (const type of types) {
  const trie = new Trie()
  loadDict(trie, dicts[type])
  dicts[type] = trie
}

/**
 * Convert between Simplified Chinese and Traditional Chinese
 * @param { string } chars The string to be converted
 * @param { { trie: Trie, type: 'hk2s' } } options
 */
export const convert = (chars, { trie, type = 'hk2s' } = {}) => {
  if (!types.includes(type)) throw new Error('options.type must be: ' + types.join(', '))
  return trieCanvert(chars, trie ? trie : dicts[type])
}
