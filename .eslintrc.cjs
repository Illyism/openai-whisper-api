/* eslint-env node */
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    "parserOptions": {
        "ecmaVersion": 2021
    },
    env: {
        "es2021": true,
        "node": true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        "max-lines": ["error", { "max": 250, "skipComments": true, "skipBlankLines": true }],
    },
    overrides: [
        {
            files: ['*.test.ts'],
            env: {
                jest: true,
            },
        },
    ],

};