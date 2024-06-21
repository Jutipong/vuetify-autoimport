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
                variables: {
                    'border-color': '#6b7280',
                    // 'border-opacity': 0.12,
                    // 'high-emphasis-opacity': 0.87,
                    // 'medium-emphasis-opacity': 0.60,
                    // 'disabled-opacity': 0.38,
                    // 'idle-opacity': 0.04,
                    // 'hover-opacity': 0.04,
                    // 'focus-opacity': 0.12,
                    // 'selected-opacity': 0.08,
                    // 'activated-opacity': 0.12,
                    // 'pressed-opacity': 0.12,
                    // 'dragged-opacity': 0.08,
                    // 'theme-kbd': '#212529',
                    // 'theme-on-kbd': '#FFFFFF',
                    // 'theme-code': '#F5F5F5',
                    // 'theme-on-code': '#000000',
                },
            },
        },
    },
    ssr: false,
    defaults: defaultComponents,

} as VuetifyOptions)
