import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Maska from "maska";
import { loadFonts } from "./plugins/webfontloader";
import readJSONFile from "./libs/readJSONFile";
import PrimeVue, { primeConfig } from "./plugins/prime-vue";
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

const isCreated = false;

const loadColors = async () => {
  try {
    const data = await readJSONFile("/theme/custom-theme.json");
    const root = document.querySelector(":root");
    Object.keys(data).forEach((key) => {
      root.style.setProperty(`--${key}`, data[key]);
    });
  } catch (error) {
    throw new Error(
      "Los colores no se han podido cargar, por favor, verifique que se haya añadido el archivo custom-theme.json en el origen del proyecto"
    );
  }
};

const loadConfigField = async () => {
  try {
    const data = await readJSONFile("/theme/custom-config.json");
    store.commit("setDataBase", data);
    document.title = data.application.title;
    console.log(store.getters.dataBase);
  } catch (error) {
    throw new Error(
      "El archivo de configuración no se ha podido cargar, por favor verifique que se haya añadido el archivo custom-config.json en el origen del proyecto"
    );
  }
};

const createApplication = async () => {
  loadFonts();
  await loadConfigField();
  await loadColors();
  if (isCreated) return;
  createApp(App)
    .use(Maska)
    //CARGA LAS VISTAS
    .use(router)
    .use(store)
    .use(vuetify())
    .use(PrimeVue, primeConfig)
    .use(ToastService)
    .use(ConfirmationService)
    .mount("#app");
};

createApplication();
