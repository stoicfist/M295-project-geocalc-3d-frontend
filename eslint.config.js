// eslint.config.js
// @ts-check
const eslint = require('@eslint/js');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const ngTpl = require('@angular-eslint/eslint-plugin-template');
const { FlatCompat } = require('@eslint/eslintrc');

// Wandelt ESLintRC-Configs (mit "extends") in Flat-Config um
const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  // Globale Ignores
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**'] },

  // --- Basis-Flat-Configs (ESLint + TypeScript, ohne "extends") ---
  eslint.configs.recommended,
  tsPlugin.configs.recommendedTypeChecked,
  tsPlugin.configs.stylisticTypeChecked,

  // --- Angular-ESLint (ESLintRC → Flat via compat) ---
  // Regeln für .ts (Angular)
  ...compat.extends('plugin:@angular-eslint/recommended'),

  // Regeln für .html (Templates)
  ...compat.extends('plugin:@angular-eslint/template/recommended'),
  ...compat.extends('plugin:@angular-eslint/template/accessibility'),

  // --- Deine projekt-spezifische Lage und Lockerungen ---
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json', './src/tsconfig.app.json'], // falls anders, anpassen
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },
    // Inline-Templates aus @Component extrahieren
    processor: ngTpl.processors['extract-inline-html'],
    rules: {
      '@angular-eslint/prefer-inject': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off',
    },
  },

  // Tests lockern
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    rules: { '@typescript-eslint/no-unused-vars': 'off' },
  },
];
