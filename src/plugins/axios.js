import axios from "axios";
import router from "@/router/index";
import store from "@/store";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000
})

http.interceptors.request.use(
  function (config) {
    try {
      return config
    } catch (error) {
      return config
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
  return response;
},
(error) => {
  const { data, status } = error.response ?? error;
  let path = "";
  switch (status) {
    case 401:
      router.currentRoute.value.name !== "AuthLogin"
        ? store.dispatch("logout")
        : null;
      break;
    /* case 500:
      path = "/500";
      break; */
    case 504:
      path = "/504";
      break;
  }
  if (path) {
    router.push(path);
  }
  
  const message = data?.message ?? 'Error de servidor en el proceso ejecutado.'


  store.commit("setServerError", {
    errorCode: status ?? 500,
    message
  })
  console.log("Error", {
    errorCode: status ?? 500,
    message
  });
  return Promise.reject(error);
}
);

export default http;
