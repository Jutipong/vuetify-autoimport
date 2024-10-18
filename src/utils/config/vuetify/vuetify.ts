import type { VuetifyOptions } from 'vuetify'
import { createVuetify } from 'vuetify'

import { aliases, fa } from 'vuetify/iconsets/fa4'
import * as labsComponents from 'vuetify/labs/components'
import defaultComponents from './default-components'
import { lightTheme } from './theme-light'
import { variables } from './variables'
import 'vuetify/styles'
import '@fortawesome/fontawesome-free/css/all.css'

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
        defaultSet: 'fa',
        aliases,
        sets: {
            fa,
        },
    },

} as VuetifyOptions)
