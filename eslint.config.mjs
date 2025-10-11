// eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default [
  // Base recommended ESLint rules
  pluginJs.configs.recommended,

  // Disable ESLint rules that conflict with Prettier
  configPrettier,

  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser, // for React projects
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      // ✅ Code-quality rules (ESLint)
      'no-unused-vars': 'warn',
      'no-console': 'off',
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'warn',

      // ✅ Run Prettier as part of ESLint (so eslint --fix also formats)
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 100,
          tabWidth: 2,
          bracketSpacing: true,
          arrowParens: 'always',
          endOfLine: 'lf',
        },
      ],
    },
  },
];
