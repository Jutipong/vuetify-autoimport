import type { VuetifyOptions } from 'vuetify'
import { createVuetify } from 'vuetify'

import * as labsComponents from 'vuetify/labs/components'
import defaultComponents from './default-components'
import { lightTheme } from './theme-light'
import { variables } from './variables'
import 'vuetify/styles'

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
