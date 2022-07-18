module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: [
    'jest',
    'jsdoc'
  ],
  rules: {
    'no-var': 'error',
    'require-jsdoc': ['error', {
      require: {
        ClassDeclaration: true,
        FunctionDeclaration: true,
        MethodDefinition: true
      }
    }]
  }
}
