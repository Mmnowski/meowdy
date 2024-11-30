module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "destructuredArrayIgnorePattern": "^_",
        "argsIgnorePattern": "^_"
      }
    ],
    "import/extensions": "off",
    "import/no-cycle": "error",
    "import/order": [
      "error",
      {
        "groups": ["external", "internal", ["sibling", "parent"]],
        "newlines-between": "always"
      }
    ],
  },
};
