import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/app/Index";
import verifyAuth from "@/middlewares/verifyAuth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/ErrorPage"),
    },
    {
      path: "/",
      name: "VistaPrincipalPage",
      component: () => import("@/views/app/VistaPrincipal"),
      meta: { transition: "fade" },
    },
    {
      path: "/VistaNosotros",
      name: "Nosotros",
      component: () => import("@/views/app/VistaNosotros"),
      meta: { transition: "fade" },
    },
    {
      path: "/VistaTerminos",
      name: "Terminos",
      component: () => import("@/views/app/VistaTerminos"),
      meta: { transition: "fade" },
    },
    {
      path: "/VistaPoliticasPrivacidad",
      name: "PoliticasPrivacidad",
      component: () => import("@/views/app/VistaPoliticasPrivacidad"),
      meta: { transition: "fade" },
    },
    {
      path: "/VistaPoliticasDelivery",
      name: "PoliticasDelivery",
      component: () => import("@/views/app/VistaPoliticasDelivery"),
      meta: { transition: "fade" },
    },
    {
      path: "/auth/VistaLogin",
      name: "AuthLogin",
      beforeEnter: verifyAuth,
      component: () => import("@/views/auth/VistaLogin"),
      meta: { transition: "fade" },
    },
    {
      path: "/Login",
      component: Home,
      beforeEnter: verifyAuth,
      children: [
        {
          path: "/Login",
          name: "Home",
          component: () => import("@/views/app/Home"),
          meta: { transition: "fade" },
        },
        {
          path: "/VistaEmpleados",
          name: "VistaEmpleados",
          component: () => import("@/views/app/VistaEmpleados"),
          meta: { transition: "fade" },
        },
        {
          path: "/VistaNuevoPedido",
          name: "VistaNuevoPedido",
          component: () => import("@/views/app/VistaNuevoPedido"),
          meta: { transition: "fade" },
        },
        {
          path: "/VistaMisPedidos",
          name: "VistaMisPedidos",
          component: () => import("@/views/app/VistaMisPedidos"),
          meta: { transition: "fade" },
        },
        {
          path: "/VistaPedidosPendientes",
          name: "VistaPedidosPendientes",
          component: () => import("@/views/app/VistaPedidosPendientes"),
          meta: { transition: "fade" },
        },
       
      ],
    },
  ],
});

export default router;
