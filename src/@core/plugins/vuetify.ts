import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import type { VuetifyOptions } from 'vuetify'
import * as labsComponents from 'vuetify/labs/components'
import defaultComponents from './default-components'

export default createVuetify({
    locale: {
        locale: 'en',
    },
    date: {
        locale: {
            en: 'en-GB',
        },
    },
    components: {
        ...labsComponents,
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: true,
                colors: {
                    background: '#E0E0E0',
                    surface: '#fbfbfb',
                    primary: '#5D87FF',
                    secondary: '#8A8D93',
                    error: '#FF4C51',
                    info: '#16B1FF',
                    success: '#4CAF50',
                    warning: '#FB8C00',
                },
            },
        },
    },
    ssr: false,
    defaults: defaultComponents,

} as VuetifyOptions)
