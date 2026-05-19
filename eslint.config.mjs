import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      'no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/display-name': 'off',
      'react/prop-types': 'off',
      // 'newline-before-return': 'warn',
      // Remove or turn off the old one
      'newline-before-return': 'off',

      // Add this instead (this one CAN auto-fix)
      'padding-line-between-statements': [
        'warn',  // or 'error' if you prefer
        { blankLine: 'always', prev: '*', next: 'return' }
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'import/no-unresolved': 'off',
      'import/no-named-as-default': 'off',
      "@typescript-eslint/no-explicit-any": "warn",
    }
  },
]);

export default eslintConfig;
