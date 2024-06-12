module.exports = {
  root: true,
  extends: [
    '@react-native',
    '@rocketseat/eslint-config/react',
    'plugin:prettier/recommended',
    'prettier/@react-native',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
