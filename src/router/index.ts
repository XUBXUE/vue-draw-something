import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Room from "../views/Room.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/room",
      component: Room,
    },
  ],
});

export default router;
