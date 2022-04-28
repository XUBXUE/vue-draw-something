import { createApp } from "vue";
import App from "./App.vue";
import "./styles/index.scss";
import router from "./router";
import store from "./store";
import socket from "./plugin/io";
import "vfonts/Lato.css";
import request from "~/request";

const app = createApp(App);
app.config.globalProperties.$fetch = request;
app.use(router).use(store).provide("socket", socket).mount("#app");
