import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Lottery from '../views/Lottery.vue'
import Category from '../views/Category.vue'
import Mine from '../views/Mine.vue'
import BossUnassignedOrders from '../views/BossUnassignedOrders.vue'
import GoodsDetail from '../views/GoodsDetail.vue'
import BossWallet from '../views/BossWallet.vue'
import WorkerHome from '../views/WorkerHome.vue'
import WorkerOrders from '../views/WorkerOrders.vue'
import WorkerWallet from '../views/WorkerWallet.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import AdminLogin from '../views/admin/AdminLogin.vue'
import UserList from '../views/admin/UserList.vue'
import OrderList from '../views/admin/OrderList.vue'
import WithdrawList from '../views/admin/WithdrawList.vue'
import GoodsManage from '../views/admin/GoodsManage.vue'
import CopyManage from '../views/admin/CopyManage.vue'
import LotteryManage from '../views/admin/LotteryManage.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home, meta: { showTabbar: true } },
    { path: '/lottery', name: 'Lottery', component: Lottery, meta: { showTabbar: false } },
    { path: '/category', name: 'Category', component: Category, meta: { showTabbar: true } },
    { path: '/mine', name: 'Mine', component: Mine, meta: { showTabbar: true } },
    { path: '/mine/wallet', name: 'BossWallet', component: BossWallet, meta: { showTabbar: false } },
    { path: '/mine/unassigned', name: 'BossUnassignedOrders', component: BossUnassignedOrders, meta: { showTabbar: false } },
    { path: '/goods/:id', name: 'GoodsDetail', component: GoodsDetail, meta: { showTabbar: false } },
    // 打手端路由（独立入口，服务号菜单可直接跳 /worker/home）
    { path: '/worker', redirect: '/worker/home' },
    { path: '/worker/home', name: 'WorkerHome', component: WorkerHome, meta: { showTabbar: false } },
    { path: '/worker/orders', name: 'WorkerOrders', component: WorkerOrders, meta: { showTabbar: false } },
    { path: '/worker/wallet', name: 'WorkerWallet', component: WorkerWallet, meta: { showTabbar: false } },
    // 运营后台（PC，左侧菜单 + 顶栏 + 内容区）
    { path: '/admin/login', name: 'AdminLogin', component: AdminLogin, meta: { showTabbar: false, admin: true } },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { showTabbar: false, admin: true },
      children: [
        { path: '', redirect: '/admin/users' },
        { path: 'users', name: 'UserList', component: UserList },
        { path: 'orders', name: 'OrderList', component: OrderList },
        { path: 'withdraws', name: 'WithdrawList', component: WithdrawList },
        { path: 'goods', name: 'GoodsManage', component: GoodsManage },
        { path: 'copy', name: 'CopyManage', component: CopyManage },
        { path: 'lottery', name: 'LotteryManage', component: LotteryManage }
      ]
    }
  ]
})

export default router
