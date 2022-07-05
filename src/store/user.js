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
      roles: ["Administrador", "Empleado", "Cliente"],
      name: "Inicio",
      to: "/Login",
      icon: '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium sidebar-link-button css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DashboardIcon"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></svg>',
    },
    {
      roles: ["Administrador"],
      name: "Tabla-Empleados",
      to: "/VistaEmpleados",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 10.645v-2.29c-1.17-.417-1.907-.533-2.28-1.431-.373-.9.07-1.512.6-2.625l-1.618-1.619c-1.105.525-1.723.974-2.626.6-.9-.373-1.017-1.116-1.431-2.28h-2.29c-.412 1.158-.53 1.907-1.431 2.28h-.001c-.9.374-1.51-.07-2.625-.6l-1.617 1.619c.527 1.11.973 1.724.6 2.625-.375.901-1.123 1.019-2.281 1.431v2.289c1.155.412 1.907.531 2.28 1.431.376.908-.081 1.534-.6 2.625l1.618 1.619c1.107-.525 1.724-.974 2.625-.6h.001c.9.373 1.018 1.118 1.431 2.28h2.289c.412-1.158.53-1.905 1.437-2.282h.001c.894-.372 1.501.071 2.619.602l1.618-1.619c-.525-1.107-.974-1.723-.601-2.625.374-.899 1.126-1.019 2.282-1.43zm-8.5 1.689c-1.564 0-2.833-1.269-2.833-2.834s1.269-2.834 2.833-2.834 2.833 1.269 2.833 2.834-1.269 2.834-2.833 2.834zm15.5 4.205v-1.077c-.55-.196-.897-.251-1.073-.673-.176-.424.033-.711.282-1.236l-.762-.762c-.52.248-.811.458-1.235.283-.424-.175-.479-.525-.674-1.073h-1.076c-.194.545-.25.897-.674 1.073-.424.176-.711-.033-1.235-.283l-.762.762c.248.523.458.812.282 1.236-.176.424-.528.479-1.073.673v1.077c.544.193.897.25 1.073.673.177.427-.038.722-.282 1.236l.762.762c.521-.248.812-.458 1.235-.283.424.175.479.526.674 1.073h1.076c.194-.545.25-.897.676-1.074h.001c.421-.175.706.034 1.232.284l.762-.762c-.247-.521-.458-.812-.282-1.235s.529-.481 1.073-.674zm-4 .794c-.736 0-1.333-.597-1.333-1.333s.597-1.333 1.333-1.333 1.333.597 1.333 1.333-.597 1.333-1.333 1.333zm-4 3.071v-.808c-.412-.147-.673-.188-.805-.505s.024-.533.212-.927l-.572-.571c-.389.186-.607.344-.926.212s-.359-.394-.506-.805h-.807c-.146.409-.188.673-.506.805-.317.132-.533-.024-.926-.212l-.572.571c.187.393.344.609.212.927-.132.318-.396.359-.805.505v.808c.408.145.673.188.805.505.133.32-.028.542-.212.927l.572.571c.39-.186.608-.344.926-.212.318.132.359.395.506.805h.807c.146-.409.188-.673.507-.805h.001c.315-.131.529.025.924.213l.572-.571c-.186-.391-.344-.609-.212-.927s.397-.361.805-.506zm-3 .596c-.552 0-1-.447-1-1s.448-1 1-1 1 .447 1 1-.448 1-1 1z"/></svg>',
    }
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
    return state.user?._id;
  },
  getIdUsuario(state) {
    return state.user?.persona?._id ?? state.user?._id;
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
    dispatch("listarCremas");
    dispatch("listarMenus");
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
