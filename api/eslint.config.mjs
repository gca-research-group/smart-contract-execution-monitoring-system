import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      eqeqeq: 'error',
      'no-unused-vars': [
        'error',
        { varsIgnorePattern: '_', args: 'all', argsIgnorePattern: '_' },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
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
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: false,
        },
      ],
    },
  },
];
