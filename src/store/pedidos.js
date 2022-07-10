import http from "@/plugins/axios";

const state = {
  pedidos: [],
};

const getters = {
  getPedidos: (state) => state.pedidos,
};

const mutations = {
  getPedidos: (state, pedidos) => (state.pedidos = pedidos),
  addPedido: (state, pedido) => state.pedidos.push(pedido),
};

const actions = {
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
