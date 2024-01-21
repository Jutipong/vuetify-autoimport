const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {
    // Enable stylistic formatting rules
    // Or customize the stylistic rules
    stylistic: {

      indent: 2,
      overrides: {
        // 'no-console': 'off'
        // 'no-debugger': false,
        'valid-v-slot': 1,
      },
    },

    // TypeScript and Vue are auto-detected, you can also explicitly enable them:
    typescript: true,
    vue: true,

    // Disable jsonc and yaml support
    jsonc: true,
    yaml: true,

    // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
    ignores: [
      '**/fixtures',
      '**/vite-env.d.ts',
      // ...globs
    ],
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },
  },
)
