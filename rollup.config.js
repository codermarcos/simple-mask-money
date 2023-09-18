import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
// import swc from '@rollup/plugin-swc';

const getConfiguration4File = (file) => [
  // browser-friendly UMD build
  {
    input: `src/${file}.ts`,
    output: {
      name: 'SimpleMaskMoney',
      file: `./lib/${file}.umd.js`,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      resolve(), //
      commonjs(),
      typescript({ tsconfig: './tsconfig.build.json' }),
      terser()
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: `src/${file}.ts`,
    output: [
      { file: `./lib/${file}.cjs.js`, format: 'cjs', sourcemap: true },
      { file: `./lib/${file}.esm.js`, format: 'es', sourcemap: true },
    ],
    plugins: [typescript({ tsconfig: './tsconfig.build.json' }), terser()],
  },
];

export default [
  ...getConfiguration4File('simple-mask-money'),
  ...getConfiguration4File('set-mask'),
  ...getConfiguration4File('create-instance-of'),
  ...getConfiguration4File('format-to-number'),
  ...getConfiguration4File('format-to-currency'),
];
