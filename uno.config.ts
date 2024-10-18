// uno.config.ts
import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

export default defineConfig({
    shortcuts: {},
    rules: [],
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            customizations: {
                iconCustomizer(collection, icon, props) {
                    props.width = '1.50em'
                    props.height = '1.50em'
                },
            },
            prefix: '',
        }),
        presetTypography({}),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
})
