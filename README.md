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
<script src="https://cdn.jsdelivr.net/npm/zhconver/dist/zhconver.js"></script>
```

CommonJS

```js
const { s2t, t2s, set } = require('zhconver')
```

ES Modules

```js
import { s2t, t2s, set } from 'zhconver'
```

## Usage

### s2t

```js
s2t('这是一段简体字')
// => '這是壹段簡體字'

// Use dictionary tree query replacement
const mapper = [
  ['电视', '電視'],
  ['电梯', '電梯'],
  ['公交车', '公車'],
  ['公文包', '公事包']
]
set(mapper)
s2t('我在坐公交车', true)
// => '我在坐公車'
```

### t2s

```js
t2s('這是壹段簡體字')
// => '这是一段简体字'

// Use dictionary tree query replacement

const mapper = [
  ['电视', '電視'],
  ['电梯', '電梯'],
  ['公交车', '公車'],
  ['公文包', '公事包']
]
set(mapper)
t2s('我在坐公車', true)
// => '我在坐公交车'
```

### set

```js
const mapper = [
  ['水', '💧'],
  ['火', '🔥'],
  ['龙', '🐉']
]
set(mapper)
console.log(s2t('我最喜欢吃的水果是火龙果'))
// => '我最喜歡吃的💧果是🔥🐉果'
```
