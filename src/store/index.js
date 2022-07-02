import { createStore } from 'vuex';
import http from '@/plugins/axios';

import user from "./user"
import users from "./usuarios"
//import otros from "./otros"
//import alimentos from "./alimentos"
//import consultas from "./consultas"
//import plantillas from "./plantillas"
//import planes from "./planes"

export default createStore({
  state: {
    activeSidebar: false,
    snackbar: {
      active: false,
      timeout: 4000,
      type: 'success',
      color: "var(--color-danger-400)",
      position: "top-right",
      message: "",
    },
    loader: false,
    serverError: {
      errorCode: "",
      message: ""
    },
    base: {}
  },
  getters: {
    getBaseURL: (state) => process.env.VUE_APP_API_URL,
    activeSidebar: (state) => state.activeSidebar,
    loader: (state) => state.loader,
    snackbar: (state) => state.snackbar,
    dataBase: (state) => state.base,
    getServerError: (state) => state.serverError,
    rolAdministrador: () => "Administrador",
    rolNutricionista: () => "Nutricionista",
    rolPaciente: () => "Cliente",
  },
  mutations: {
    setActiveSidebar(state, sidebarStatus) {
      state.activeSidebar = sidebarStatus
    },
    setLoader(state, loaderStatus) {
      state.loader = loaderStatus
    },
    setServerError(state, error) {
      state.serverError.errorCode = error.errorCode
      state.serverError.message = error.message
    },
    changeSnackbar(state, opts) {
      state.snackbar.color =
        opts.type && opts.type === 'error' ? 'red' : 'success';
      state.snackbar.type = opts.type
      state.snackbar.message = opts.message
      state.snackbar.position = opts.position ?? "top-right";
      state.snackbar.active = opts.active
    },
    setDataBase(state, opts) {
      state.base = opts
    },
  },
  actions: {
    activeLoader({ commit }) {
      commit("setLoader", true)
    },
    inactiveLoader({ commit }) {
      commit("setLoader", false)
    },
    activeSnackbar({ commit }, opts) {
      commit("changeSnackbar", opts)
    },
    async uploadFile({}, file) {

      if(!file) return null 
      const formData = new FormData()
      formData.append("file", file)

      const { data, status } = await http.post("/archivos", formData) 
      if(status != 200 && status != 201) return null 
      console.log(data.body);
      return data.body
    }
  },
  modules: {
    user,
    users
    //otros,
    //alimentos,
    //consultas,
    //plantillas,
   // planes
  }
})
