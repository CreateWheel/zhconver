// To avoid having a single text or character longer than 1
// e.g.: emoji symbols are generally 2 in length
// A: What will happen if we handle it this way?
// B: If it is not handled, when the text is obtained after the for loop based on the index (arr[i]), then the text will become a garbled symbol
export const ArrayFrom = Array.from

class TrieNode {
  constructor() {
    this.map = new Map()
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
      if (!node.map.has(char)) node.map.set(char, new TrieNode())
      node = node.map.get(char)
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
    for (let i = startIndex; i < textLen; i++) {
      const char = text[i]
      const _node = node.map.get(char)
      if (!_node) continue
      node = _node
      if (node.end) return [i, node.k, node.v]
    }
    return [startIndex]
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
 * Convert
 * @param { Trie } trieInstance Simplified Chinese and Traditional Chinese mapping table for words or phrases
 * @param { Map<string,string> } map Simplified Chinese and Traditional Chinese mapping table for Chinese characters
 * @param { string } chars The string to be converted
 * @param { boolean } isTrie Whether to use dictionary tree query replacement
 */
export const convert = (trieInstance, map, chars, isTrie) =>
  isTrie ? stringCanvert(map, trieCanvert(trieInstance, chars)) : stringCanvert(map, chars)

/**
 * Using dictionary tree conversion
 * @param { Trie } instance Dictionary tree instance
 * @param { string } chars The string to be converted
 * @returns The converted string
 */
export function trieCanvert(instance, chars) {
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
 * String conversion
 * @param { Map<string,string> } map String Mapping Table
 * @param { string } chars The string to be converted
 * @returns The converted string
 */
export function stringCanvert(map, chars) {
  const set = new Set(chars)
  set.forEach((item) => {
    const char = map.get(item)
    if (char) chars = replaceAll(chars, item, char)
  })
  return chars
}
