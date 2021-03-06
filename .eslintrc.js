module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:mocha/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'mocha',
  ],
  rules: {
    'func-names': ['error', 'never'],
    'no-console': ['error', 'never'],
    'react/button-has-type': ['error', 'never'],
    'import/extensions': ['error', 'never'],
    'object-curly-newline': ['error', 'never'],
    'max-len': ['error', 'never']
  },
};
