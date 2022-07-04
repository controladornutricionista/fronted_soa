import http from "@/plugins/axios";

const state = {
  users: [],
  roles: [],
};

const getters = {
  getUsuarios: (state) =>
    state.users?.map((user, idx) => {
      return { ...user, orden: idx + 1 };
    }),
  getRoles: (state) => state.roles,
  };
  
  const mutations = {
    setUsers: (state, users) => (state.users = users),
    setRoles: (state, roles) => (state.roles = roles),
};

const actions = {
  listarUsuarios: async ({ commit }) => {
    const { data, status } = await http.get("/usuarios");
    if (status != 200) return;
    commit(
      "setUsers",
      data.body.filter((user) => user?.rol?.nombre != "Empleado")
    );
  },
  crearUsuario: async ({}, usuario) => {
    const { data, status } = await http.post("/usuarios", usuario);
    if (status != 200 && status != 201) return false;
    return true;
  },
  editarUsuario: async ({}, datos) => {
    const { data, status } = await http.put(`/usuarios/${datos._id}`, datos);
    if (status != 200 && status != 201) return false;
    return true;
  },
  eliminarUsuario: async ({}, userId) => {
    const { data, status } = await http.delete(`/usuarios/${userId}`);
    if (status != 200 && status != 201) return false;
    return true;
  },
  listarRoles: async ({ commit }) => {
    const { data, status } = await http.get("/roles");
    if (status != 200) return;
    console.log(data.body);
    commit("setRoles", data.body);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
