import { lite } from './lib/data'
import { Trie, trieCanvert, loadDict } from './lib/utils'
export { Trie } from './lib/utils'

const types = ['s2t', 't2s']
const liteRev = [...lite]
;[liteRev[0], liteRev[1]] = [liteRev[1], liteRev[0]]

const dicts = {
  s2t: [lite],
  t2s: [liteRev]
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
