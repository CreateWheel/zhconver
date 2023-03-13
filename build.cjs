const { writeFileSync } = require('fs')
const { join } = require('path')
const mapper = require('./mapper.json')

let simplified = 'export const simplified = "'
let traditional = 'export const traditional = "'

for (const [key, value] of Object.entries(mapper)) {
  if (key === value) continue
  simplified += key
  traditional += value
}
simplified += '"'
traditional += '"'

const code = simplified + '\n' + traditional

writeFileSync(join(__dirname, 'src/data.js'), code)
