const { readdirSync, readFileSync, writeFileSync } = require('fs')
const { join, parse } = require('path')
const mapper = require('./mapper.json')

let code = ''

// lite
let liteS = ''
let liteT = ''

for (const [key, value] of Object.entries(mapper)) {
  if (key === value) continue
  liteS += key
  liteT += value
}

code += `export const lite = ['${liteS}','${liteT}']\n`

// opencc
const openccDataPath = join(__dirname, 'tmp')
const files = readdirSync(openccDataPath).map((file) => join(openccDataPath, file))

const removeSeparator = (param) => (param[param.length - 1] === '1' ? param.slice(0, param.length - 1) : param)
function dictRev(name) {
  const revs = ['TWVariants', 'JPVariants', 'HKVariants']
  const code = `export const ${name}Rev = [...${name}]
  ;[${name}Rev[0], ${name}Rev[1]] = [${name}Rev[1], ${name}Rev[0]]\n`

  return revs.includes(name) ? code : ''
}

files.forEach((filePath) => {
  const { name } = parse(filePath)

  const content = readFileSync(filePath, { encoding: 'utf8' }).trim()
  let key = ''
  let value = ''
  for (const line of content.split('\n')) {
    const [k, vs] = line.split('\t')
    const v = vs.split(' ')[0] // only select the first candidate, the subsequent candidates are ignored
    key += k
    value += v
    if (Array.from(k).length > 1 || Array.from(v).length > 1) {
      key += 1
      value += 1
    }
  }
  key = removeSeparator(key)
  value = removeSeparator(value)

  // code += `export const ${name} = ['','']\n`
  code += `export const ${name} = ['${key}','${value}']\n`
  code += dictRev(name)
})

writeFileSync(join(__dirname, 'src/lib/data.js'), code)
