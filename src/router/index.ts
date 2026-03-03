import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Lottery from '../views/Lottery.vue'
import Category from '../views/Category.vue'
import Mine from '../views/Mine.vue'
import GoodsDetail from '../views/GoodsDetail.vue'
import WorkerHome from '../views/WorkerHome.vue'
import WorkerOrders from '../views/WorkerOrders.vue'
import WorkerWallet from '../views/WorkerWallet.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home, meta: { showTabbar: true } },
    { path: '/lottery', name: 'Lottery', component: Lottery, meta: { showTabbar: false } },
    { path: '/category', name: 'Category', component: Category, meta: { showTabbar: true } },
    { path: '/mine', name: 'Mine', component: Mine, meta: { showTabbar: true } },
    { path: '/goods/:id', name: 'GoodsDetail', component: GoodsDetail, meta: { showTabbar: false } },
    // 打手端路由（独立入口，服务号菜单可直接跳 /worker/home）
    { path: '/worker', redirect: '/worker/home' },
    { path: '/worker/home', name: 'WorkerHome', component: WorkerHome, meta: { showTabbar: false } },
    { path: '/worker/orders', name: 'WorkerOrders', component: WorkerOrders, meta: { showTabbar: false } },
    { path: '/worker/wallet', name: 'WorkerWallet', component: WorkerWallet, meta: { showTabbar: false } }
  ]
})

export default router
