// To avoid having a single text or character longer than 1
// e.g.: emoji symbols are generally 2 in length
// A: What will happen if we handle it this way?
// B: If it is not handled, when the text is obtained after the for loop based on the index (arr[i]), then the text will become a garbled symbol
export const ArrayFrom = Array.from

class TrieNode {
  constructor() {
    this.tree = new Map()
    this.v = ''
    this.end = false
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode()
  }

  /**
   * Insert a word into the dictionary tree
   * @param { string } key Key to be inserted
   * @param { string } value Value to be inserted
   */
  insert(key, value) {
    const array = ArrayFrom(key)
    let node = this.root
    for (let i = 0; i < array.length; i++) {
      const char = array[i]
      if (!node.tree.has(char)) node.tree.set(char, new TrieNode())
      node = node.tree.get(char)
    }
    node.end = true
    node.k = key
    node.v = value
  }

  /**
   * Find words in an array of strings that match in a dictionary tree
   * @param { string[] } text An array of strings
   * @param { number } startIndex Index to start the search
   * @returns { [number,string,string] } Back to words
   */
  search(text, startIndex = 0) {
    let node = this.root
    const textLen = text.length
    const phrases = []
    for (let i = startIndex; i < textLen; i++) {
      const char = text[i]
      const _node = node.tree.get(char)
      if (!_node) return phrases.pop() || [startIndex]
      node = _node
      if (node.end) phrases.push([i, node.k, node.v])
    }
    return phrases.pop() || [startIndex]
  }
}

/**
 * replaceAll polyfill
 * @param { string } chars String to replace
 * @param { string } searchValue An object that supports searching for and replacing matches within a string
 * @param { string } replaceValue The replacement text
 * @returns
 */
export const replaceAll = (chars, searchValue, replaceValue) =>
  chars.replace(new RegExp(searchValue, 'g'), replaceValue)

/**
 * Using dictionary tree conversion
 * @param { string } chars The string to be converted
 * @param { Trie } instance Dictionary tree instance
 * @returns The converted string
 */
export function trieCanvert(chars, instance) {
  const array = ArrayFrom(chars)
  const wordLen = array.length
  for (let i = 0; i < wordLen; i++) {
    const [index, key, value] = instance.search(array, i)
    // Re-indexing, in order to avoid duplication of text that has already been judged, thus improving performance
    i = index
    if (key) chars = replaceAll(chars, key, value)
  }
  return chars
}

/**
 *
 * @param { Trie } trie
 * @param { { [key: string]: [string, string] } } dicts 
 */
export function loadDict(trie, dicts) {
  for (const item in dicts) {
    let [dictKey, dictValue] = dicts[item]

    dictKey = dictKey.split(1)
    dictValue = dictValue.split(1)
    if (dictKey.length < 2 || dictValue.length < 2) {
      dictKey = dictKey[0]
      dictValue = dictValue[0]
    }
    const dictKeyLen = ArrayFrom(dictKey).length

    for (let i = 0; i < dictKeyLen; i++) {
      const _key_ = Array.isArray(dictKey) ? dictKey[i] : ArrayFrom(dictKey)[i]
      const _value_ = Array.isArray(dictValue) ? dictValue[i] : ArrayFrom(dictValue)[i]
      trie.insert(_key_, _value_)
    }
  }
}
