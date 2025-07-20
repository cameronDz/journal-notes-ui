import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import babelParser from '@babel/eslint-parser';

export default [
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
                requireConfigFile: false,
                babelOptions: {
                    presets: ['@babel/preset-react'],
                },
            },
            globals: {
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                global: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly',
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            import: importPlugin,
            prettier,
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.json'],
                },
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            'import/no-unresolved': 'error',
            'import/named': 'error',
            'import/default': 'error',
            'import/namespace': 'error',
            'import/no-absolute-path': 'error',
            'import/no-dynamic-require': 'error',
            'import/no-self-import': 'error',
            'import/no-cycle': 'error',
            'import/no-useless-path-segments': 'error',
            'prettier/prettier': 'error',
            'no-self-compare': 'off',
            'semi': ['error', 'always'],
            'semi-spacing': [
                'error',
                {
                    before: false,
                    after: true,
                },
            ],
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'no-console': 'warn',
            'prefer-const': 'error',
            'no-var': 'error',
            'object-shorthand': 'error',
            'prefer-template': 'error',
            'template-curly-spacing': 'error',
            'arrow-spacing': 'error',
            'comma-dangle': ['error', 'always-multiline'],
            'eol-last': 'error',
            'indent': ['error', 2],
            'quotes': ['error', 'double', { avoidEscape: true }],
            'jsx-quotes': ['error', 'prefer-double'],
            'react/prop-types': 'error',
            'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],
            'react/jsx-pascal-case': 'error',
            'react/jsx-closing-bracket-location': 'error',
            'react/jsx-closing-tag-location': 'error',
            'react/jsx-curly-spacing': ['error', 'never'],
            'react/jsx-equals-spacing': ['error', 'never'],
            'react/jsx-first-prop-new-line': ['error', 'multiline'],
            'react/jsx-indent': ['error', 2],
            'react/jsx-indent-props': ['error', 2],
            'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
            'react/jsx-no-duplicate-props': 'error',
            'react/jsx-no-undef': 'error',
            'react/jsx-uses-vars': 'error',
            'react/jsx-wrap-multilines': [
                'error',
                {
                    declaration: 'parens-new-line',
                    assignment: 'parens-new-line',
                    return: 'parens-new-line',
                    arrow: 'parens-new-line',
                },
            ],
        },
    },
    {
        files: ['**/*.test.{js,jsx}', '**/__tests__/**/*.{js,jsx}'],
        languageOptions: {
            globals: {
                jest: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                test: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly',
            },
        },
        rules: {
            'no-console': 'off',
        },
    },
    {
        files: ['webpack/**/*.js', '*.config.js'],
        languageOptions: {
            globals: {
                __dirname: 'readonly',
                __filename: 'readonly',
                process: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly',
            },
        },
        rules: {
            'no-console': 'off',
        },
    },
];
