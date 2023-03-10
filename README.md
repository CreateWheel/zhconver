# zhconver

Convert between Simplified Chinese and Traditional Chinese

- **No dependencies.**
- **Support for running in browsers and node.**
- Support for modifying conversion characters.
- Support Type Tips.
- Small volume ([zhconver](https://packagephobia.com/result?p=zhconver) 15~20kB).

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
const { cn2tw, tw2cn, set } = require('zhconver')
```

ES Modules

```js
import { cn2tw, tw2cn, set } from 'zhconver'
```

## Usage

### cn2tw

```js
cn2tw('这是一段简体字')
// => '這是壹段簡體字'
```

### tw2cn

```js
tw2cn('這是壹段簡體字')
// => '这是一段简体字'
```

### set

```js
const mapper = [
  ['水', '💧'],
  ['火', '🔥'],
  ['龙', '🐉']
]
set(mapper)
console.log(cn2tw('我最喜欢吃的水果是火龙果'))
// => '我最喜歡吃的💧果是🔥🐉果'
```
