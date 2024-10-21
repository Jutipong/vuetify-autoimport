import type { IconProps, IconSet, VuetifyOptions } from 'vuetify'

import { Icon } from '@iconify/vue'
import { h } from 'vue'
import { createVuetify } from 'vuetify'
import { aliases } from 'vuetify/iconsets/mdi'
import * as labsComponents from 'vuetify/labs/components'
import defaultComponents from './default-components'
import { lightTheme } from './theme-light'
import { variables } from './variables'
import 'vuetify/styles'

const iconifyMdi: IconSet = {
    component: (props: IconProps) => {
        // console.log('IconProps received:', props)
        return h(
            'i',
            {},
            [
                h(Icon, {
                    icon: typeof props.icon === 'string'
                        ? props.icon.replace('mdi-', 'mdi:')
                        : (props.icon as { name: string })?.name?.replace('mdi-', 'mdi:') || '',
                    disabled: props.disabled,
                }),
            ],
        )
    },
}

export default createVuetify({
    ssr: false,
    locale: { locale: 'en' },
    date: { locale: { en: 'en-GB' } },
    components: { ...labsComponents },
    defaults: defaultComponents,
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: lightTheme,
                variables,
            },
        },
    },
    icons: {
        defaultSet: 'iconifyMdi',
        aliases,
        sets: {
            iconifyMdi,
        },
    },

} as VuetifyOptions)
