import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import LayOut from "@/layout/index.vue";

let children = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/metamask",
    name: "Metamask",
    component: () => import("@/views/metamask/index.vue"),
  },
  {
    path: "/wallectconnect",
    name: "Wallectconnect",
    component: () => import("@/views/wallectconnect/index.vue"),
  },
  {
    path: "/monitor",
    name: "Monitor",
    component: () => import("@/views/monitor/index.vue"),
  },
];

const routes = [
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    name: "404"
  },
  {
    path: "/",
    redirect: "home",
    component: LayOut,
    children: children,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.onError((error) => {
  if (error.message.includes("Failed to fetch dynamically imported module:")) {
    window.location.reload();
  }
});

export default router;
