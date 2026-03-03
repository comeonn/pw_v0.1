import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Lottery from '../views/Lottery.vue'
import Category from '../views/Category.vue'
import Mine from '../views/Mine.vue'
import GoodsDetail from '../views/GoodsDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home, meta: { showTabbar: true } },
    { path: '/lottery', name: 'Lottery', component: Lottery, meta: { showTabbar: false } },
    { path: '/category', name: 'Category', component: Category, meta: { showTabbar: true } },
    { path: '/mine', name: 'Mine', component: Mine, meta: { showTabbar: true } },
    { path: '/goods/:id', name: 'GoodsDetail', component: GoodsDetail, meta: { showTabbar: false } }
  ]
})

export default router
