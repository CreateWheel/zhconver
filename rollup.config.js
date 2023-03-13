import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

const __dirname = fileURLToPath(new URL('./', import.meta.url))
const srcPath = join(__dirname, 'src')
const dirs = readdirSync(join(__dirname, 'src')).map((filePath) => join(srcPath, filePath))

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
  {
    input: 'src/index.js',
    plugins: [del({ targets: 'dist/*' })],
    output: [
      {
        sourcemap: true,
        file: pkg.jsdelivr,
        format: 'iife',
        name: pkg.name,
        plugins: [terser()]
      },
      {
        format: 'esm',
        file: pkg.module
      },
      {
        exports: 'auto',
        format: 'cjs',
        file: pkg.main
      }
    ]
  },
  {
    input: dirs,
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
