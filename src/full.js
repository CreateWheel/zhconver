import {
  HKVariants,
  HKVariantsRevPhrases,
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

const types = [
  's2t',
  's2hk',
  's2tw',
  's2twp',
  's2jp',
  // hk
  'hk2s',
  // tw
  'tw2s',
  'twp2s',
  // jp
  'jp2s'
]
const dicts = {
  s2t: [STCharacters, STPhrases],
  s2hk: [STCharacters, STPhrases, HKVariants],
  s2tw: [STCharacters, STPhrases],
  s2twp: [STCharacters, STPhrases, TWVariantsRev, TWPhrasesIT, TWPhrasesName, TWPhrasesOther],
  s2jp: [STCharacters, STPhrases, JPVariantsRev],
  // hk
  hk2s: [TSPhrases, TSCharacters, HKVariants, HKVariantsRevPhrases],
  // tw
  tw2s: [TSPhrases, TSCharacters, TWVariantsRev, TWVariantsRevPhrases],
  twp2s: [TSPhrases, TSCharacters, TWVariants],
  // jp
  jp2s: [TSPhrases, TSCharacters, JPVariants]
}
for (const type of types) {
  const trie = new Trie()
  loadDict(trie, dicts[type])
  dicts[type] = trie
}

/**
 * Convert between Simplified Chinese and Traditional Chinese
 * @param { string } chars The string to be converted
 * @param { { trie: Trie, type: 's2t' | 's2hk' | 's2tw' | 's2twp' | 's2jp' | 'hk2s' | 'tw2s' | 'twp2s' | 'jp2s' } } options
 */
export const convert = (chars, { trie, type = 's2t' } = {}) => {
  if (!types.includes(type)) throw new Error('options.type must be: ' + types.join(', '))
  return trieCanvert(chars, trie ? trie : dicts[type])
}
