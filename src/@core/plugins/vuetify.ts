import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import type { VuetifyOptions } from 'vuetify'
import * as labsComponents from 'vuetify/labs/components'

const vBtn = {
    variant: 'flat',
    rounded: 'lg',
    class: 'text-none font-500 pr-3 pl-3',
}

const vSelect = {
    clearable: true,
    variant: 'outlined',
    density: 'compact',
    color: 'primary',
    hideDetails: 'auto',
    dirty: true,
    itemTitle: 'text',
    itemValue: 'id',
}

export default createVuetify({
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
    defaults: {
        VContainer: {
            fluid: true,
        },
        VBtn: vBtn,
        VCard: {
            variant: 'flat',
            rounded: 'lg',
            class: 'mb-3 pa-1',
            VBtn: vBtn,
            VCardTitle: {
                class: 'mr-4 ml-4 mt-1 mb-1',
                VChip: {
                    density: 'compact',
                    size: 'large',
                    class: '',
                },
            },
            VCardText: {
                class: 'mr-4 ml-4',
                VSelect: vSelect,
            },
            VCardActions: {
                class: 'mr-4 ml-4 mb-2',
                VBtn: vBtn,
            },
        },
        VTextField: {
            clearable: true,
            hideDetails: 'auto',
            density: 'compact',
            color: 'primary',
            dirty: true,
            variant: 'outlined',
            rounded: 'lg',
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
                variant: 'underlined',
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
} as VuetifyOptions)
