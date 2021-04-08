import json from '@rollup/plugin-json';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: 'dist/esm/src/index.js',
  output: [
    {
      file: 'dist/plugin.js',
      format: 'iife',
      name: 'capacitorFirebaseGitHubAuth',
      globals: {
        '@capacitor/core': 'capacitorExports',
      },
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
      inlineDynamicImports: true,
    },
  ],
  external: ['@capacitor/core'],
  plugins: [json()],
};
