import http from "@/plugins/axios";

const state = {
  users: [],
  roles: [],
  pacientes: [],
  misPacientes: [],
};

const getters = {
  getUsuarios: (state) =>
    state.users?.map((user, idx) => {
      return { ...user, orden: idx + 1 };
    }),
  getRoles: (state) => state.roles,
  getMisPacientesList: state => state.misPacientes,
  getPacientesList: (state) =>
    state.pacientes.map((user, idx) => {
      return { ...user, orden: idx + 1 };
    }),
  };
  
  const mutations = {
    setUsers: (state, users) => (state.users = users),
    setRoles: (state, roles) => (state.roles = roles),
    setPacientesList: (state, pacientes) => (state.pacientes = pacientes),
    setMisPacientes: (state, pacientes) => state.misPacientes = pacientes
};

const actions = {
  obtenerUsuario: async ({}, pacienteId) => {
    const { data, status } = await http.get(`/usuarios/${pacienteId}`);
    if (status != 200) return null; 
    return data.body
  },
  listarMisPacientes: async ({ commit, getters }) => {
    const nutricionistaId = getters.getIdUsuario
    const { data, status } = await http.get(`/usuarios/pacientes/${nutricionistaId}`);
    if (status != 200) return;
    console.log(data.body);
    commit(
      "setMisPacientes",
      data.body.map((paciente, idx) => { return { ...paciente, orden: idx +1 }})
    );
  },
  listarPacientes: async ({ commit }) => {
    const { data, status } = await http.get("/usuarios");
    if (status != 200) return;
    commit(
      "setPacientesList",
      data.body.filter((user) => user?.rol?.nombre == "Cliente")
    );
  },
  listarUsuarios: async ({ commit }) => {
    const { data, status } = await http.get("/usuarios");
    if (status != 200) return;
    commit(
      "setUsers",
      data.body.filter((user) => user?.rol?.nombre != "Cliente")
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
  crearPersona: async ({}, persona) => {
    const { data, status } = await http.post("/personas", persona);
    if (status != 200 && status != 201) return false;
    return data.body;
  },
  editarPersona: async ({}, persona) => {
    const { data, status } = await http.put(
      `/personas/${persona._id}`,
      persona
    );
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
