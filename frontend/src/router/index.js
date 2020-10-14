import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Chat from "../views/Chat.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/chat",
    name: "Chat",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Chat
  }
];

const router = new VueRouter({
  routes
});

export default router;
