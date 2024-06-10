import antfu from '@antfu/eslint-config'

export default antfu(
    {
        stylistic: {
            indent: 4,
            overrides: {
                'no-console': 'off',
                'vue/no-console': 'off',
                'eslint-comments/no-unlimited-disable': 'off',
            },
        },
        typescript: true,
        vue: true,
        rules: {
            'vue/valid-v-slot': ['error', {
                allowModifiers: true,
            }],
            'vue/no-mutating-props': ['error', {
                shallowOnly: true,
            }],
        },
        // Disable jsonc and yaml support
        jsonc: false,
        // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
        ignores: [
            '**/fixtures',
            'vite-env.d.ts',
            '**/*.d.ts',
            '**/.d.ts',
        ],
    },
)
