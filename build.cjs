const { readFileSync, writeFileSync } = require('fs')

const data = JSON.parse(readFileSync('font.json', { encoding: 'utf8' }))

let CN = 'export const CN = "'
let TW = 'export const TW = "'

for (const [key, value] of Object.entries(data)) {
  if (key === value) continue
  CN += key
  TW += value
}
CN += '"'
TW += '"'

const code = CN + '\n' + TW

writeFileSync('data.js', code)
