import { readFileSync } from 'fs'
import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'
const pkg = JSON.parse(readFileSync('package.json', { encoding: 'utf8' }))

const plugins = [del({ targets: 'dist/*' })]

export default {
  input: 'src/index.js',
  plugins,
  output: [
    {
      sourcemap: true,
      format: 'iife',
      file: pkg.jsdelivr,
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
  ],
  watch: {
    clearScreen: false
  }
}
