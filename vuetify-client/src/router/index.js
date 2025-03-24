import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: () => import("@/views/Dashboard.vue"),
    },
    {
      path: "/actuator",
      name: "Actuator",
      component: () => import("@/views/Actuator.vue"),
    },
    {
      path: "/sensor",
      name: "Sensor",
      component: () => import("@/views/Sensor.vue"),
    },
    {
      path: "/controller",
      name: "Controller",
      component: () => import("@/views/Controller.vue"),
    },
  ],
});

export default router;
