import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import copy from 'rollup-plugin-copy';

const isDev = process.env.NODE_ENV === 'development';

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/bundle.js',
    sourcemap: true,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    scss({
      fileName: 'styles/main.css',
    }),
    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist' }
      ]
    }),
    serve({
      open: true,
      contentBase: 'dist',
      port: 3000
    }),
    livereload('dist')
  ]
};