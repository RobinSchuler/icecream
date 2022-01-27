module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['universe', 'universe/node', 'universe/web'],
  rules: {
    'import/order': 0,
    'prettier/prettier': 0, // takes to long. will be fixed anyway with commit-hooks ;)
    'import/namespace': 0, // takes to long
    'import/no-duplicates': 0,
  },
};
