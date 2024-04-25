// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ["api", "webapp", "packages/**"],
  extends: ["@goodcollect/eslint-config/base.js"],
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    project: "packages/typescript-config/base.json",
  },
};
