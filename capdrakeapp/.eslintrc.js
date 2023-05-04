module.exports = {
    root: true,
    // extends: "@react-native-community",
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['react', '@typescript-eslint'],
    ignorePatterns: ['.*rc.js', '**/*.config.js'],
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    globals: {
        NodeJS: true,
    },
    rules: {
        semi: [1, 'never'],
        quotes: [2, 'single', { avoidEscape: true }],
        'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
        'no-unused-vars': 'off',
        'no-prototype-builtins': 'off',
        'no-redeclare': 'off',
        indent: 'off',
    },
};
