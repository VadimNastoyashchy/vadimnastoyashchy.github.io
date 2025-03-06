import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    'plugin:playwright/playwright-test',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
), {
    plugins: {
        '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
    },

    rules: {
        quotes: ['error', 'single', {
            allowTemplateLiterals: true,
        }],

        'no-trailing-spaces': 'error',

        '@typescript-eslint/typedef': ['error', {
            parameter: true,
        }],

        semi: ['error'],
        '@typescript-eslint/explicit-function-return-type': ['error'],
    },
}];