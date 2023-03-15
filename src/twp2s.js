import {
  HKVariants,
  HKVariantsRev,
  HKVariantsRevPhrases,
  JPShinjitaiCharacters,
  JPShinjitaiPhrases,
  JPVariants,
  JPVariantsRev,
  STCharacters,
  STPhrases,
  TSCharacters,
  TSPhrases,
  TWPhrasesIT,
  TWPhrasesName,
  TWPhrasesOther,
  TWVariants,
  TWVariantsRev,
  TWVariantsRevPhrases
} from './lib/data'
import { Trie, trieCanvert, loadDict } from './lib/utils'
export { Trie } from './lib/utils'

const types = ['twp2s']
const dicts = {
  twp2s: [TSPhrases, TSCharacters, TWVariants]
}
for (const type of types) {
  const trie = new Trie()
  loadDict(trie, dicts[type])
  dicts[type] = trie
}

/**
 * Convert between Simplified Chinese and Traditional Chinese
 * @param { string } chars The string to be converted
 * @param { { trie: Trie, type: 'twp2s' } } options
 */
export const convert = (chars, { trie, type = 'twp2s' } = {}) => {
  if (!types.includes(type)) throw new Error('options.type must be: ' + types.join(', '))
  return trieCanvert(chars, trie ? trie : dicts[type])
}
