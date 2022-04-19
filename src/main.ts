import { createApp } from "vue";
import App from "./App.vue";
import "./styles/index.scss";
import router from "./router";
import store from "./store";
import socket from "./plugin/io";

createApp(App)
  .use(router)
  .use(store)
  .provide('socket', socket)
  .mount("#app");
