// To avoid having a single text or character longer than 1
// e.g.: emoji symbols are generally 2 in length
// A: What will happen if we handle it this way?
// B: If it is not handled, when the text is obtained after the for loop based on the index (arr[i]), then the text will become a garbled symbol
export const ArrayFrom = Array.from

export class TrieNode {
  constructor() {
    this.map = new Map()
    this.k = ''
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
    const phrases = []
    for (let i = startIndex; i < textLen; i++) {
      const char = text[i]
      const _node = node.map.get(char)
      if (!_node) return phrases.pop() || [startIndex]
      node = _node
      if (node.end) phrases.push([i, node.k, node.v])
    }
    return phrases.pop() || [startIndex]
  }
}
