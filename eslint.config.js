const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
    {
        // Enable stylistic formatting rules
        // Or customize the stylistic rules
        stylistic: {
            indent: 4,
            overrides: {
                'vue/no-console': 'off',
                'no-console': 'off',
                'no-debugger': 'off',
            },
        },

        // TypeScript and Vue are auto-detected, you can also explicitly enable them:
        typescript: true,
        vue: true,

        rules: {
            'vue/valid-v-slot': ['error', { allowModifiers: true }],
            'vue/no-mutating-props': ['error', {
                shallowOnly: true,
            }],
        },

        // Disable jsonc and yaml support
        jsonc: true,
        yaml: true,

        // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
        ignores: [
            '**/fixtures',
            // 'vite-env.d.ts',
            // ...globs
        ],
        formatters: {
            css: true,
            html: true,
            markdown: 'prettier',
        },
    },
)
