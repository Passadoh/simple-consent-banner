import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import scss from 'rollup-plugin-scss'
import {terser} from 'rollup-plugin-terser'
import postcss from "postcss";
import env from 'postcss-preset-env'
import autoprefixer from "autoprefixer"
import pkg from './package.json';

const svgr = require('@svgr/rollup').default

const mode = process.env.NODE_ENV
const dev = mode === 'development'

export default [
  {
    input: 'src/index.js',
    output: {
      file: pkg.main,
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      svgr({ babel: false }),
      dev && serve({contentBase: ['dist', 'static']}),
      dev && livereload(),
      !dev &&
      babel({
        extensions: ['.js'],
        babelHelpers: 'runtime',
        exclude: ['node_modules/@babel/**'],
        presets: [
          [
            '@babel/preset-env',
            {
              targets: '> 0.25%, ie >= 11, not dead',
            },
          ],
        ],
        plugins: [
          '@babel/plugin-syntax-dynamic-import',
          [
            '@babel/plugin-transform-runtime',
            {
              useESModules: true,
            },
          ],
        ],
      }),
      scss({
        watch: 'src/styles',
        outputStyle: "compressed",
        processor: css => postcss(
          [
            autoprefixer({ overrideBrowserslist: "last 2 versions" }),
            env()
          ]),
      }),
      terser({
        module: true,
      })
    ]
  }
]