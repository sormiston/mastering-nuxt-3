module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript',
  ],
  rules: {
    'comma-dangle': ['error', {
      functions: 'never',
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
    }],
    semi: ['error', 'always'],
  },
};
