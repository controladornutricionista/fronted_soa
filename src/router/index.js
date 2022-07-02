import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/app/Index";
import verifyAuth from "@/middlewares/verifyAuth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/ErrorPage")
    },
    {
      path: "/",
      name: "VistaPrincipalPage",
      component: () => import("@/views/app/VistaPrincipal")
    },
    {
      path: "/VistaNosotros.vue",
      name: "VistaNosotros",
      component: () => import("@/views/app/VistaNosotros")
    },
    {
      path: "/VistaTerminos.vue",
      name: "VistaTerminos",
      component: () => import("@/views/app/VistaTerminos")
    },
    {
      path: "/VistaPoliticasPrivacidad.vue",
      name: "VistaPoliticasPrivacidad",
      component: () => import("@/views/app/VistaPoliticasPrivacidad")
    },
    {
      path: "/VistaPoliticasDelivery.vue",
      name: "VistaPoliticasDelivery",
      component: () => import("@/views/app/VistaPoliticasDelivery")
    },
    {
      path: "/VistaLogin.vue",
      name: "VistaLogin",
      component: () => import("@/views/app/VistaLogin")
    },
  ],
});

export default router;
