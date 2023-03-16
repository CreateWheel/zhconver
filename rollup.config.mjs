import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'
const __dirname = fileURLToPath(new URL('./', import.meta.url))

const srcPath = join(__dirname, 'src')
const files = readdirSync(srcPath).map((filePath) => join(srcPath, filePath))

/**
 * @type { import('rollup').InputOptions[] }
 */
export default [
  {
    input: 'src/zhconver.js',
    plugins: [del({ targets: 'dist/*' })],
    output: {
      sourcemap: true,
      file: 'dist/zhconver.js',
      format: 'iife',
      name: 'zhconver',
      plugins: [terser()]
    }
  },
  {
    input: 'src/conver.js',
    output: {
      sourcemap: true,
      file: 'dist/conver.js',
      format: 'iife',
      name: 'conver',
      plugins: [terser()]
    }
  },
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
