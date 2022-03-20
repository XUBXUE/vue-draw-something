import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Room from "../views/Room.vue";
import GameHall from "../views/GameHall.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/GameHall",
      component: GameHall
    },
    {
      path: "/room",
      component: Room,
    },
  ],
});

export default router;
