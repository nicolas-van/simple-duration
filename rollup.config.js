
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default [{
  input: 'src/simple-duration.mjs',
  external: ['lodash'],
  output: {
    file: 'dist/simple-duration.cjs',
    format: 'cjs'
  },
  plugins: []
}, {
  input: 'src/simple-duration.mjs',
  output: {
    file: 'dist/simple-duration.umd.js',
    format: 'umd',
    name: 'simpleDuration'
  },
  plugins: [
    nodeResolve(),
    commonjs()
  ]
}]
