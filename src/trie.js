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
   * Set a word into the dictionary tree
   * @param { string } key Key to be seted
   * @param { string } value Value to be seted
   */
  set(key, value) {
    return this.add(key, value)
  }
  /**
   * Add a word into the dictionary tree
   * @param { string } key Key to be added
   * @param { string } value Value to be added
   * @returns { Trie } The Trie instance for chaining
   */
  add(key, value) {
    const array = ArrayFrom(key)
    let node = this.root
    for (let i = 0; i < array.length; i++) {
      const char = array[i]
      // If the character does not exist in the node's map, add a new node with the character as the key
      if (!node.map.has(char)) node.map.set(char, new TrieNode())
      node = node.map.get(char)
    }
    node.end = true
    node.k = key
    node.v = value
    // Return the Trie instance for method chaining
    return this
  }

  /**
   * Delete a word from the dictionary tree
   * @param { string } key Key to be deleteed
   */
  delete(key) {
    const array = ArrayFrom(key)
    let node = this.root
    const stack = [] // To keep track of nodes in the path from root to the node to be deleted

    // Traverse the Trie to find the node containing the key to be deleted
    for (let i = 0; i < array.length; i++) {
      const char = array[i]
      if (!node.map.has(char)) return false // Key does not exist in the Trie
      stack.push([node, char])
      node = node.map.get(char)
    }

    // If the node does not have end flag set, the key does not exist in the Trie
    if (!node.end) {
      return false
    }

    // Mark the node as non-end node to indicate that the key has been deleted
    node.end = false

    // Traverse up the Trie and delete nodes if they are not end nodes and have no children
    let i = stack.length - 1
    while (i >= 0) {
      const [parent, char] = stack[i]
      const currentNode = parent.map.get(char)
      if (!currentNode.end && currentNode.map.size === 0) {
        parent.map.delete(char)
      } else {
        break // Stop traversing if the node is an end node or has children
      }
      i--
    }

    return true // Key has been successfully deleted from the Trie
  }

  /**
   * Find words in an array of strings that match in a dictionary tree
   * @param { string[] } text An array of strings
   * @param { number } startIndex Index to start the find
   * @returns { [number,string,string] } An array containing the index, key, and value of the matched word
   */
  find(text, startIndex = 0) {
    let node = this.root
    const textLen = text.length
    const phrases = []

    for (let i = startIndex; i < textLen; i++) {
      const char = text[i]
      const _node = node.map.get(char)
      // If the child node does not exist, return the last matched word or the start index if no match found
      if (!_node) return phrases.pop() || [startIndex]
      node = _node
      if (node.end) phrases.push([i, node.k, node.v])
    }
    // Return the last matched word or the start index if no match found
    return phrases.pop() || [startIndex]
  }
}
