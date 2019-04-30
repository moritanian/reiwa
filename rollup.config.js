import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    name: 'reiwa'
  },
  plugins: [
    resolve(),
    commonjs(),
  ]
};
/*
// rollup.config.js
//import nodeResolve  from 'rollup-plugin-node-resolve'
//import commonjs     from 'rollup-plugin-commonjs'
import babel        from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: 'dist/index.js',
  plugins: [
    //nodeResolve({ jsnext: true }), // npmモジュールを`node_modules`から読み込む
    // commonjs(), // CommonJSモジュールをES6に変換
    babel() // ES5に変換
  ]
}
*/
