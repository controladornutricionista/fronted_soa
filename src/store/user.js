import http from "@/plugins/axios";
import router from "@/router/index";
import { encBtoa, decAtob } from "@/libs/base64";
import { iatKey, sessionKey, storage } from "./keys";
import { loadImage } from "@/libs/loadImage";

const state = {
  user: null,
  token: decAtob(storage.getItem(sessionKey)) || null,
  expires: decAtob(storage.getItem(iatKey)) || null,
  routes: [
    {
      roles: ["Administrador", "Nutricionista", "Cliente"],
      name: "Inicio",
      to: "/",
      icon: '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium sidebar-link-button css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DashboardIcon"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></svg>',
    },
    {
      roles: ["Nutricionista"],
      name: "Reporte de medidas",
      to: "/reporte-de-medidas",
      icon: '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium sidebar-link-button css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="KitchenIcon"><path d="M18 2.01 6 2c-1.1 0-2 .89-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.11-.9-1.99-2-1.99zM18 20H6v-9.02h12V20zm0-11H6V4h12v5zM8 5h2v3H8zm0 7h2v5H8z"></path></svg>',
    },
    {
      roles: ["Administrador", "Nutricionista"],
      name: "Alimentos",
      to: "/alimentos",
      icon: '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium sidebar-link-button css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FreeBreakfastIcon"><path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"></path></svg>',
    },
    {
      roles: ["Administrador", "Nutricionista"],
      name: "Objetivos",
      to: "/objetivos",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3.875l-6 1.221 1.716 1.708-5.351 5.358-3.001-3.002-7.336 7.242 1.41 1.418 5.922-5.834 2.991 2.993 6.781-6.762 1.667 1.66 1.201-6.002zm0 17.125v2h-24v-22h2v20h22z"/></svg>',
    },
    {
      roles: ["Nutricionista"],
      name: "Plantillas Alimenticias",
      to: "/mis-plantillas-alimenticias",
      icon: '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium sidebar-link-button css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AssignmentIcon"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></svg>',
    },
    {
      roles: ["Administrador", "Nutricionista"],
      name: "Consultas",
      to: "/consultas",
      icon: '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium sidebar-link-button css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AssignmentIcon"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></svg>',
    },
    {
      roles: ["Nutricionista"],
      name: "Mis Pacientes",
      to: "/mis-pacientes",
      icon: '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium sidebar-link-button css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PersonIcon"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>',
    },
    {
      roles: ["Nutricionista"],
      name: "Pacientes",
      to: "/pacientes",
      icon: '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium sidebar-link-button css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PersonIcon"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>',
    },
    {
      roles: ["Administrador"],
      name: "Usuarios",
      to: "/usuarios",
      icon: '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium sidebar-link-button css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PersonIcon"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>',
    },
    {
      roles: ["Administrador"],
      name: "Datos base",
      to: "/configuraciones",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 10.645v-2.29c-1.17-.417-1.907-.533-2.28-1.431-.373-.9.07-1.512.6-2.625l-1.618-1.619c-1.105.525-1.723.974-2.626.6-.9-.373-1.017-1.116-1.431-2.28h-2.29c-.412 1.158-.53 1.907-1.431 2.28h-.001c-.9.374-1.51-.07-2.625-.6l-1.617 1.619c.527 1.11.973 1.724.6 2.625-.375.901-1.123 1.019-2.281 1.431v2.289c1.155.412 1.907.531 2.28 1.431.376.908-.081 1.534-.6 2.625l1.618 1.619c1.107-.525 1.724-.974 2.625-.6h.001c.9.373 1.018 1.118 1.431 2.28h2.289c.412-1.158.53-1.905 1.437-2.282h.001c.894-.372 1.501.071 2.619.602l1.618-1.619c-.525-1.107-.974-1.723-.601-2.625.374-.899 1.126-1.019 2.282-1.43zm-8.5 1.689c-1.564 0-2.833-1.269-2.833-2.834s1.269-2.834 2.833-2.834 2.833 1.269 2.833 2.834-1.269 2.834-2.833 2.834zm15.5 4.205v-1.077c-.55-.196-.897-.251-1.073-.673-.176-.424.033-.711.282-1.236l-.762-.762c-.52.248-.811.458-1.235.283-.424-.175-.479-.525-.674-1.073h-1.076c-.194.545-.25.897-.674 1.073-.424.176-.711-.033-1.235-.283l-.762.762c.248.523.458.812.282 1.236-.176.424-.528.479-1.073.673v1.077c.544.193.897.25 1.073.673.177.427-.038.722-.282 1.236l.762.762c.521-.248.812-.458 1.235-.283.424.175.479.526.674 1.073h1.076c.194-.545.25-.897.676-1.074h.001c.421-.175.706.034 1.232.284l.762-.762c-.247-.521-.458-.812-.282-1.235s.529-.481 1.073-.674zm-4 .794c-.736 0-1.333-.597-1.333-1.333s.597-1.333 1.333-1.333 1.333.597 1.333 1.333-.597 1.333-1.333 1.333zm-4 3.071v-.808c-.412-.147-.673-.188-.805-.505s.024-.533.212-.927l-.572-.571c-.389.186-.607.344-.926.212s-.359-.394-.506-.805h-.807c-.146.409-.188.673-.506.805-.317.132-.533-.024-.926-.212l-.572.571c.187.393.344.609.212.927-.132.318-.396.359-.805.505v.808c.408.145.673.188.805.505.133.32-.028.542-.212.927l.572.571c.39-.186.608-.344.926-.212.318.132.359.395.506.805h.807c.146-.409.188-.673.507-.805h.001c.315-.131.529.025.924.213l.572-.571c-.186-.391-.344-.609-.212-.927s.397-.361.805-.506zm-3 .596c-.552 0-1-.447-1-1s.448-1 1-1 1 .447 1 1-.448 1-1 1z"/></svg>',
    },
    {
      roles: ["Cliente"],
      name: "Mis consultas",
      to: "/mis-consultas",
      icon: '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium sidebar-link-button css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AssignmentIcon"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></svg>',
    },
    {
      roles: ["Cliente"],
      name: "Mi Plan Nutricional",
      to: "/mi-informacion",
      icon: '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium sidebar-link-button css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AssignmentIcon"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></svg>',
    },
    /* {
      roles: ["Cliente"],
      name: "Mis Rutinas",
      to: "/mis-rutinas",
      icon: '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium sidebar-link-button css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FitnessCenterIcon"><path d="M20.57 14.86 22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"></path></svg>',
    }, */
  ],
};

const getters = {
  getIsAuthenticated(state) {
    return !!state.user;
  },
  getUserAvatar(state) {
    return state.user?.imagen?.src
      ? loadImage(state.user?.imagen?.src)
      : "https://cdn.vuetifyjs.com/images/john.jpg";
  },
  getCurrentUser(state) {
    return state.user;
  },
  getUserId(state) {
    return state.user?.usuario;
  },
  getIdUser(state) {
    return state.user?._id
  },
  getIdUsuario(state) {
    return state.user?.persona?._id ?? state.user?._id
  },
  getUserFullname(state) {
    return `${state.user?.persona?.nombres ?? ""} ${
      state.user?.persona?.apellidos ?? ""
    }`;
  },
  getUserRole(state) {
    return state.user?.rol?.nombre;
  },
  getUserRoutes(state) {
    return state.routes.filter((route) =>
      route.roles?.includes(state.user?.rol?.nombre)
    );
    return state.routes;
  },
  getCurrentRouteActive(state) {
    const currentRoute = router.currentRoute;
    return state.routes.find((route) => route.to === currentRoute?._value.path);
  },
};

const mutations = {
  setSession(state, session) {
    console.log("session", session);
    state.token = session.accessToken;
    state.expires = session.expiredIn;
    if (!session?.accessToken || session?.accessToken == "undefined") {
      console.log("No hay");
      storage.removeItem(sessionKey);
      storage.removeItem(iatKey);
      return;
    }
    storage.setItem(sessionKey, encBtoa(String(session.accessToken)));
    storage.setItem(iatKey, encBtoa(String(session.expiredIn)));
    http.defaults.headers = { Authorization: `Bearer ${session.accessToken}` };
  },
  setUser(state, user) {
    state.user = user;
  },
};

const actions = {
  login: async ({ commit, dispatch }, payload) => {
    try {
      const { data, status } = await http.post("/auth/login", payload);
      console.log(status);
      if (status != 200) return false;
      commit("setSession", data.body);
      await dispatch("me");
      return true;
    } catch (error) {
      return false;
    }
  },
  me: async ({ commit, dispatch }) => {
    const { data, status } = await http.get("/auth/me");
    if (status != 200) return false;
    commit("setUser", data.body);
    dispatch("listarEnfermedades");
    dispatch("listarMedidasCaseras");
    dispatch("listarCategoriaAlimentos");
    dispatch("listarNutrientes");
    dispatch("listarDias");
    return true;
  },
  logout({ commit }) {
    storage.removeItem(sessionKey);
    storage.removeItem(iatKey);
    commit("setUser", null);
    commit("setSession", {});
    location.reload();
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
