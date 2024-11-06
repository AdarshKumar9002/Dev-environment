import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser, 
        ...globals.node, 
      },
    },
    rules: {
      semi: ['error', 'always'],
      camelcase: 'off',
      'import/extensions': 'off',
      'no-param-reassign': 'off',
      'no-console': ['warn', { allow: ['error'] }],
    },
    ignores: ['node_modules', 'dist', 'eslint.config.mjs'],
  },
  pluginJs.configs.recommended,
];
