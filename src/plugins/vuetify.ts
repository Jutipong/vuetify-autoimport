/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import * as labsComponents from "vuetify/labs/components";
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    ...labsComponents,
  },
  theme: {
    themes: {
      light: {
        colors: {
          background: "#ebebeb",
          surface: "#ffffff",
          primary: "#5D87FF",
          secondary: "#26A69A",
          error: "#C10015",
          info: "#31CCEC",
          success: "#21BA45",
          warning: "#ffbe4e",
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
      variant: "flat",
      rounded: "0",
    },
    VCard: {
      VBtn: {
        variant: "flat",
        rounded: "0",
      },
    },
    VCardActions: {
      VBtn: {
        variant: "flat",
        rounded: "0",
      },
    },
    VTextField: {
      hideDetails: "auto",
      density: "compact",
      dirty: true,
      variant: "outlined",
    },
    VDataTableServer: {
      density: "comfortable",
      hover: true,
    },
  },
});
