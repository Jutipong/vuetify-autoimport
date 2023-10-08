/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';
import * as labsComponents from 'vuetify/labs/components';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    ...labsComponents,
  },
  theme: {
    themes: {
      light: {
        colors: {
          background: '#dcdbdb',
          surface: '#fbfbfb',
          primary: '#5D87FF',
          secondary: '#424242',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
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
      rounded: '0',
    },
    VCard: {
      variant: 'flat',
      class: 'mb-3 pa-1',
      VBtn: {
        variant: 'flat',
      },
    },
    VCardTitle: {
      class: 'mx-1',
    },
    VCardText: {
      class: 'mx-1',
    },
    VCardActions: {
      class: 'mx-1',
      VBtn: {
        variant: 'flat',
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
      density: 'comfortable',
      hover: true,
    },
    // VPagination: {
    //   activeColor: 'error',
    //   density: 'comfortable',
    // },
    VCheckbox: {
      color: 'primary',
      density: 'comfortable',
      hideDetails: 'auto',
    },
    VRadioGroup: {
      color: 'primary',
      density: 'comfortable',
      hideDetails: 'auto',
    },
    VRadio: {
      density: 'comfortable',
      hideDetails: 'auto',
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
      hideDetails: 'auto',
    },
    VTabs: {
      color: 'primary',
    },
    VChip: {
      elevation: 0,
    },
  },
});
