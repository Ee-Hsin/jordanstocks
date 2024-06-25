/* eslint-env node */

module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint
  ],
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint", // Use TypeScript-specific linting rules
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json' // Ensure this points to your tsconfig file
  },
  env: {
    browser: true,
    es2021: true,
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": 0,
    // Add TypeScript-specific rules or override any rules here
    "@typescript-eslint/no-explicit-any": "off", // Disables warnings for using 'any' type
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["node_modules/", "*.eslintrc.cjs", "tsconfig.json"],
}
