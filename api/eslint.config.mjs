// @ts-check
import eslint from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { fixupConfigRules } from '@eslint/compat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all,
});

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  ...fixupConfigRules(
    compat.extends(
      'plugin:import/typescript',
      'plugin:import/recommended',
      'plugin:import/typescript',
    ),
  ),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'prettier/prettier': 'error',
      eqeqeq: 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],

      'no-unused-vars': 'off',
      'import/no-named-as-default-member': 'off',
      'no-trailing-spaces': 'error',
      indent: 'off',
      'linebreak-style': 'off',
      'eol-last': ['error', 'always'],

      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
        },
      ],

      'prefer-const': 'error',
      'no-var': 'error',
      'import/no-unresolved': 'off',

      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['parent', 'sibling', 'index', 'unknown'],
            ['internal'],
          ],

          pathGroups: [
            {
              pattern: '@nestjs/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: 'src/**',
              group: 'internal',
            },
            {
              pattern: '@app/**',
              group: 'external',
              position: 'after',
            },
          ],

          pathGroupsExcludedImportTypes: ['internal'],
          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
);