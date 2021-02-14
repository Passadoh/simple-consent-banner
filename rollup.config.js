import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import scss from 'rollup-plugin-scss'
import {terser} from 'rollup-plugin-terser'
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import postcss from "postcss";
import env from 'postcss-preset-env'
import autoprefixer from "autoprefixer"
import dotenv from 'dotenv'
import pkg from './package.json';

const svgr = require('@svgr/rollup').default

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

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
      replace({
        'process.env.COOKIE_DOMAIN': JSON.stringify(process.env.COOKIE_DOMAIN),
        'process.env.PRIVACY_PATH': JSON.stringify(process.env.PRIVACY_PATH),
      }),
      resolve(),
      commonjs(),
      json (),
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