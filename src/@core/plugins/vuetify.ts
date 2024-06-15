/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import * as labsComponents from 'vuetify/labs/components'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    components: {
        ...labsComponents,
    },
    theme: {
        defaultTheme: 'light',
        themes:
    {
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
    defaults: {
        VContainer: {
            fluid: true,
        },
        VBtn: {
            variant: 'flat',
            class: 'text-none',
        },
        VCard: {
            variant: 'flat',
            class: 'mb-3 pa-1',
            VBtn: {
                variant: 'flat',
                class: 'text-none',
            },
        },
        VCardTitle: {
            class: 'mr-4 ml-4',
        },
        VCardText: {
            class: 'mr-4 ml-4',
            VSelect: {
                clearable: true,
                variant: 'outlined',
                density: 'compact',
                color: 'primary',
                hideDetails: 'auto',
                dirty: true,
                itemTitle: 'text',
                itemValue: 'id',
            },
        },
        VCardActions: {
            class: 'mr-4 ml-4',
            VBtn: {
                variant: 'flat',
                class: 'pl-4 pr-4 text-none',
            },
        },
        VTextField: {
            clearable: true,
            hideDetails: 'auto',
            density: 'compact',
            color: 'primary',
            dirty: true,
            variant: 'outlined',
        },
        VAutocomplete: {
            variant: 'outlined',
            density: 'compact',
            color: 'primary',
            hideDetails: 'auto',
        },
        VCombobox: {
            variant: 'outlined',
            density: 'compact',
            color: 'primary',
            hideDetails: 'auto',
        },
        VFileInput: {
            variant: 'outlined',
            density: 'compact',
            color: 'primary',
            hideDetails: 'auto',
        },
        VTextarea: {
            variant: 'outlined',
            density: 'compact',
            color: 'primary',
            hideDetails: 'auto',
        },
        VSwitch: {
            color: 'primary',
            hideDetails: 'auto',
        },
        VDataTableServer: {
            color: 'primary',
            density: 'compact',
            hover: true,
            VSelect: {
                clearable: false,
                variant: 'outlined',
                density: 'compact',
                itemTitle: 'title',
                itemValue: 'value',
            },
        },
        // VPagination: {
        //   activeColor: 'error',
        //   density: 'compact',
        // },
        VCheckbox: {
            color: 'primary',
            density: 'compact',
            hideDetails: 'auto',
        },
        VRadioGroup: {
            color: 'primary',
            density: 'compact',
            hideDetails: 'auto',
        },
        VRadio: {
            density: 'compact',
            hideDetails: 'auto',
        },
        VTabs: {
            color: 'primary',
        },
        VChip: {
            size: 'small',
            elevation: 0,
            label: true,
        },
    },
})
