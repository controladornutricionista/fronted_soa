import http from "@/plugins/axios";

const state = {
  pedidos: [],
  menus: []
};

const getters = {
  getPedidos: (state) => state.pedidos,
  getMenus: state => state.menus
};

const mutations = {
  setPedidos: (state, pedidos) => (state.pedidos = pedidos),
  addPedido: (state, pedido) => state.pedidos.push(pedido),
  setMenus: (state, menus) => state.menus = menus
};

const actions = {
  listarMenus: async({ commit }) => {
    const { data, status } = await http.get("/menus");
    if (status != 200 && status != 201) return false;
    commit("setMenus", data.body);
    return true;
  },
  listarPedidos: async ({ commit,state }) => {
    const { data, status } = await http.get("/pedidos");
    if (status != 200 && status != 201) return false;
    commit("setPedidos", data.body.map((doc, idx) => { return { ...doc, orden: idx+1 } }));
    return true;
  },
  crearPedidos: async ({ commit }, pedido) => {
    const { data, status } = await http.post("/pedidos", pedido);
    if (status != 200 && status != 201) return false;
    commit("addPedido", data.body);
    return true;
  },
  eliminarPedidos: async ({ commit }, pedidoId) => {
    const { data, status } = await http.delete(`/pedidos/${pedidoId}`);
    if (status != 200 && status != 201) return false;
    return true;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
