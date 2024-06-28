import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import type { VuetifyOptions } from 'vuetify'
import * as labsComponents from 'vuetify/labs/components'

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

} as VuetifyOptions)
