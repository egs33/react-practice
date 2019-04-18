module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['html'],
  rules: {
    'no-console': ['warn'],
    'no-var': ['error'],
    'prettier/prettier': [
      'error',
      {
        'trailingComma': 'all',
        'tabWidth': 2,
        'singleQuote': true
      }
    ]
  },
};