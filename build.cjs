const { readFileSync, writeFileSync } = require('fs')

const data = JSON.parse(readFileSync('mapper.json', { encoding: 'utf8' }))

let simplified = 'export const simplified = "'
let traditional = 'export const traditional = "'

for (const [key, value] of Object.entries(data)) {
  if (key === value) continue
  simplified += key
  traditional += value
}
simplified += '"'
traditional += '"'

const code = simplified + '\n' + traditional

writeFileSync('data.js', code)
