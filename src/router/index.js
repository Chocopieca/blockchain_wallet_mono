import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Shell',
      beforeEnter(to) {
        return "/eth"
      }
    },
    {
      path: '/eth',
      name: 'EtherPage',
      component: () => import("../views/EtherPage.vue"),
      meta: {
        layout: "DefaultLayout",
      },
    },
    {
      path: '/erc20',
      name: 'ERC20Page',
      component: () => import("../views/ERC20Page.vue"),
      meta: {
        layout: "DefaultLayout",
      },
    },
    {
      path: '/btc',
      name: 'BtcPage',
      component: () => import("../views/BtcPage.vue"),
      meta: {
        layout: "DefaultLayout",
      },
    },
  ]
})

export default router
