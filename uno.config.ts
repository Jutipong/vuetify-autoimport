// uno.config.ts
import {
    defineConfig,
    presetAttributify,
    // presetIcons,
    presetTypography,
    presetUno,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

export default defineConfig({
    shortcuts: {
        // 'grid': 'flex flex-wrap mr-0 ml-0 mt--0.5rem',
        // 'btn-footer': 'flex flex-wrap mt-0rem mb-0rem mr-1rem ml-1rem justify-end gap-1',
        // 'row': 'flex flex-wrap',
    },
    rules: [
        // [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) / 4}rem` })],
        // [/^p-(\d+)$/, match => ({ padding: `${Number(match[1]) / 4}rem` })],

        // [/^col$/, () => ({ flexGrow: 1, flexBasis: 0 })],
        // [/^col-auto$/, () => ({ flex: '0 0 auto' })],

        // [/^col-(\d+)$/, ([, d]) => ({ flex: '0 0 auto', padding: '0.5rem', width: `${(Number(d) / 12) * 100}%` })],
    ],
    presets: [
        presetUno(),
        presetAttributify(),
        // presetIcons({
        //     customizations: {
        //         iconCustomizer(collection, icon, props) {
        //             props.width = '1.50em'
        //             props.height = '1.50em'
        //         },
        //     },

        // }),
        presetTypography(),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
})
