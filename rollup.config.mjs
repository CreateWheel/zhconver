import { readdirSync, statSync } from 'node:fs'
import { join, parse } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

const readDirFilePathSync = (dirPath) => readdirSync(dirPath).map((filePath) => join(dirPath, filePath))

const __dirname = fileURLToPath(new URL('./', import.meta.url))
const srcPath = join(__dirname, 'src')
const dirs = readDirFilePathSync(join(__dirname, 'src'))
const libs = dirs.filter((filePath) => statSync(filePath).isFile())
const files = [...libs, ...readDirFilePathSync(join(__dirname, 'src', 'lib'))]

const iifes = libs.map((lib, index) => {
  const { base, name } = parse(lib)
  console.log(name)
  const obj = {
    input: lib,
    output: {
      sourcemap: true,
      file: join('dist', base),
      format: 'iife',
      name: `${pkg.name}.${name.split('.').pop()}`,
      plugins: [terser()]
    }
  }
  if (!index) obj.plugins = [del({ targets: 'dist/*' })]
  return obj
})

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
  ...iifes,
  {
    input: files,
    output: [
      {
        dir: 'dist/esm',
        format: 'esm',
        entryFileNames: '[name].mjs'
      },
      {
        dir: 'dist/cjs',
        format: 'cjs',
        entryFileNames: '[name].cjs'
      }
    ]
  }
]
