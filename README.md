# zhconver

Convert between Simplified Chinese and Traditional Chinese

- **No dependencies.**
- **Support for running in browsers and node.**
- Support for modifying conversion characters.
- Support Type Tips.
- Small volume ( 15~20kB ).

## Install

```bash
npm install zhconver --save
```

browsers

```html
<!-- 15~20kB: This js file contains simplified and traditional Chinese mapping table -->
<script src="https://cdn.jsdelivr.net/npm/zhconver/dist/zhconver.js"></script>
<script>
  console.log(zhconver)
  // => { Trie, conver, s2t, t2s }
</script>
<!-- Or ES Module -->
<script type="module">
  import * as zhconver from 'https://cdn.jsdelivr.net/npm/zhconver/dist/esm/zhconver.mjs'
  console.log(zhconver)
  // => { Trie, conver, s2t, t2s }
</script>

<!-- 1kB: If you want to customize the simplified and traditional mapping tables, you can introduce js files that contain only processing functions -->
<script src="https://cdn.jsdelivr.net/npm/zhconver/dist/conver.js"></script>
<script>
  console.log(conver)
  // => { Trie, conver }
</script>
<!-- Or ES Module -->
<script type="module">
  import * as conver from 'https://cdn.jsdelivr.net/npm/zhconver/dist/esm/conver.mjs'
  console.log(conver)
  // => { Trie, conver }
</script>
```

CommonJS

```js
// No Simplified and Traditional Chinese mapping table
const { Trie, conver } = require('zhconver')

// With Simplified and Traditional Chinese Mapping Table
const { Trie, conver, s2t, t2s } = require('zhconver/zhconver')
```

ES Modules

```js
// No Simplified and Traditional Chinese mapping table
import { Trie, conver } from 'zhconver'

// With Simplified and Traditional Chinese Mapping Table
import { Trie, conver, s2t, t2s } from 'zhconver/zhconver'
```

## Usage

### s2t

```js
console.log(s2t('这是一段简体字'))
// => '是壹段簡體字'
```

### t2s

```js
console.log(t2s('這是壹段簡體字'))
// => '这是一段简体字'
```

### conver + Trie

```js
const trie = new Trie();
trie.insert("香蕉", "🍌");
trie.insert("草莓", "🍓");
trie.insert("芒果", "🥭");
console.log(conver("我最喜欢吃的水果是香蕉和草莓", trie));
// => '我最喜欢吃的水果是🍌和🍓'
```
