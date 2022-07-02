// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import es from "vuetify/lib/locale/es";

// Vuetify
import { createVuetify } from "vuetify";

export default () =>
  createVuetify({
    lang: {
      locales: { es },
      current: "es",
    },
  });
