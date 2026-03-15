<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="sidebar-brand">运营后台</div>
      <nav class="sidebar-nav">
        <router-link to="/admin/users" class="nav-item" active-class="active">
          <span class="nav-icon">👥</span>
          <span class="nav-text">用户管理</span>
        </router-link>
        <router-link to="/admin/orders" class="nav-item" active-class="active">
          <span class="nav-icon">📋</span>
          <span class="nav-text">订单管理</span>
        </router-link>
        <router-link to="/admin/lottery" class="nav-item" active-class="active">
          <span class="nav-icon">🎰</span>
          <span class="nav-text">抽奖管理</span>
        </router-link>
        <router-link to="/admin/hot-recommend" class="nav-item" active-class="active">
          <span class="nav-icon">🔥</span>
          <span class="nav-text">热门推荐</span>
        </router-link>
        <router-link v-if="false" to="/admin/withdraws" class="nav-item" active-class="active">
          <span class="nav-icon">💰</span>
          <span class="nav-text">提现管理</span>
        </router-link>
        <div class="nav-group-label">基础配置</div>
        <router-link to="/admin/goods" class="nav-item" active-class="active">
          <span class="nav-icon">🛒</span>
          <span class="nav-text">商品管理</span>
        </router-link>
        <router-link to="/admin/copy" class="nav-item" active-class="active">
          <span class="nav-icon">📝</span>
          <span class="nav-text">文案管理</span>
        </router-link>
      </nav>
    </aside>
    <div class="admin-main">
      <header class="admin-header">
        <div class="header-breadcrumb">{{ currentTitle }}</div>
        <div class="header-actions">
          <span class="header-user">运营管理员</span>
          <button type="button" class="btn-logout" @click="logout">退出</button>
        </div>
      </header>
      <main class="admin-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const titleMap: Record<string, string> = {
  UserList: '用户管理',
  OrderList: '订单管理',
  WithdrawList: '提现管理',
  GoodsManage: '商品管理',
  CopyManage: '文案管理',
  LotteryManage: '抽奖管理',
  HotRecommendManage: '热门推荐'
}

const currentTitle = computed(() => {
  const name = route.name as string
  return titleMap[name] ?? '运营后台'
})

function logout() {
  // TODO: 调用登出接口、清除 token
  router.push('/admin/login')
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f6f8;
}

.admin-sidebar {
  width: 200px;
  flex-shrink: 0;
  background: #1e293b;
  color: #e2e8f0;
}

.sidebar-brand {
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  color: #f8fafc;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar-nav {
  padding: 12px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  color: #94a3b8;
  font-size: 13px;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #e2e8f0;
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-weight: 500;
}

.nav-icon {
  font-size: 16px;
  line-height: 1;
}

.nav-group-label {
  padding: 16px 16px 6px;
  font-size: 11px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-logout {
  margin-left: 12px;
  padding: 6px 12px;
  font-size: 12px;
  color: #64748b;
  background: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
}

.btn-logout:hover {
  color: #475569;
  border-color: #cbd5e1;
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.admin-header {
  height: 56px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.header-breadcrumb {
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
}

.header-actions {
  display: flex;
  align-items: center;
}

.header-user {
  font-size: 13px;
  color: #64748b;
}

.admin-content {
  flex: 1;
  padding: 24px;
  overflow: auto;
}
</style>
