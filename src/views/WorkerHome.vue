<template>
  <div class="page worker-page">
    <header class="header">
      <div class="header-top">
        <div class="worker-tag" :class="profile.level">
          {{ profile.level === 'gold' ? '金牌打手' : '普通打手' }}
        </div>
        <button class="to-wallet" type="button" @click="go('/worker/wallet')">
          钱包明细 ›
        </button>
      </div>
      <div class="profile-row">
        <div class="avatar">
          <span class="avatar-text">打</span>
        </div>
        <div class="profile-info">
          <div class="name-row">
            <span class="name">{{ profile.name }}</span>
            <span class="id">ID: {{ profile.id }}</span>
          </div>
          <div class="stats-row">
            <span>今日收入 ￥{{ profile.todayIncome.toFixed(1) }}</span>
            <span>本月收入 ￥{{ profile.monthIncome.toFixed(1) }}</span>
            <span>完单 {{ profile.totalOrders }}</span>
            <span>评分 {{ profile.rating.toFixed(1) }}</span>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="section-head">
        <div class="section-title">接单大厅</div>
        <div class="section-sub">仅展示当前可接的老板订单</div>
      </section>

      <section class="order-list">
        <article
          v-for="order in availableOrders"
          :key="order.id"
          class="order-card"
        >
          <div class="order-main">
            <div class="order-title-row">
              <span class="order-title">{{ order.title }}</span>
              <span
                class="order-level"
                :class="{ gold: order.levelTag === '金牌订单' }"
              >
                {{ order.levelTag }}
              </span>
            </div>
            <div class="order-mode">{{ order.mode }}</div>
            <div class="order-meta">
              <span class="price-worker">打手价 ￥{{ order.workerPrice }}</span>
              <span class="price-boss">老板价 ￥{{ order.bossPrice }}</span>
            </div>
            <div class="order-footer">
              <span class="time-light">{{ order.createdAt }}</span>
              <span v-if="order.bossNote" class="note">
                备注：{{ order.bossNote }}
              </span>
            </div>
          </div>
          <div class="order-actions">
            <button class="btn-primary" type="button">接单</button>
          </div>
        </article>
      </section>
    </main>

    <nav class="worker-nav">
      <button
        class="worker-nav-item active"
        type="button"
        @click="go('/worker/home')"
      >
        <span class="nav-icon">📋</span>
        <span class="nav-text">大厅</span>
      </button>
      <button
        class="worker-nav-item"
        type="button"
        @click="go('/worker/orders')"
      >
        <span class="nav-icon">📦</span>
        <span class="nav-text">我的单</span>
      </button>
      <button
        class="worker-nav-item"
        type="button"
        @click="go('/worker/wallet')"
      >
        <span class="nav-icon">💰</span>
        <span class="nav-text">钱包</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { MOCK_AVAILABLE_ORDERS, MOCK_WORKER_PROFILE } from '../mock/worker'
import { useRouter } from 'vue-router'

const router = useRouter()

const profile = MOCK_WORKER_PROFILE
const availableOrders = MOCK_AVAILABLE_ORDERS

function go(path: string) {
  router.push(path)
}
</script>

<style scoped>
.worker-page {
  min-height: 100vh;
  padding-bottom: 56px;
  box-sizing: border-box;
  background:
    /* 远处光源 */
    radial-gradient(circle at 0 0, rgba(34, 197, 94, 0.22), transparent 55%),
    radial-gradient(circle at 100% 0, rgba(248, 113, 22, 0.18), transparent 60%),
    /* 战术网格：纵横线 */
    repeating-linear-gradient(
      0deg,
      rgba(15, 23, 42, 0.9) 0,
      rgba(15, 23, 42, 0.9) 1px,
      transparent 1px,
      transparent 22px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(15, 23, 42, 0.9) 0,
      rgba(15, 23, 42, 0.9) 1px,
      transparent 1px,
      transparent 22px
    ),
    /* 底色 */
    linear-gradient(145deg, #020617 0%, #020617 40%, #020617 100%);
}

.header {
  padding: 14px 14px 10px;
  background: radial-gradient(circle at 0 0, #22c55e, transparent 55%),
    radial-gradient(circle at 100% 0, #f97316, transparent 60%),
    linear-gradient(135deg, #020617, #111827);
  color: #fff;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.worker-tag {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  border: 1px solid rgba(248, 250, 252, 0.4);
}

.worker-tag.gold {
  background: linear-gradient(135deg, #facc15, #f97316);
  color: #1f2933;
  border: none;
}

.to-wallet {
  border: none;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.6);
  color: #e5e7eb;
  font-size: 11px;
  cursor: pointer;
}

.profile-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 999px;
  background: radial-gradient(circle at 20% 0, #fde68a, #f97316);
  display: grid;
  place-items: center;
  font-size: 20px;
  font-weight: 800;
  color: #111827;
}

.profile-info {
  flex: 1;
}

.name-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 4px;
}

.name {
  font-size: 15px;
  font-weight: 700;
}

.id {
  font-size: 11px;
  color: #cbd5f5;
}

.stats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 11px;
  color: #e5e7eb;
  opacity: 0.9;
}

.content {
  padding: 10px 10px 12px;
}

.section-head {
  margin-bottom: 8px;
}

.section-title {
  font-size: 14px;
  font-weight: 700;
  color: #f9fafb;
}

.section-sub {
  font-size: 11px;
  color: #9ca3af;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.order-card {
  background:
    radial-gradient(circle at 0 0, rgba(34, 197, 94, 0.18), transparent 55%),
    radial-gradient(circle at 100% 100%, rgba(56, 189, 248, 0.18), transparent 60%),
    linear-gradient(135deg, #020617, #020617 60%, #020617);
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.45);
  padding: 10px 10px 8px;
  display: flex;
  gap: 10px;
  box-shadow:
    0 16px 40px rgba(15, 23, 42, 0.8),
    0 0 0 1px rgba(15, 23, 42, 0.9);
}

.order-main {
  flex: 1;
  min-width: 0;
}

.order-title-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.order-title {
  font-size: 13px;
  font-weight: 700;
  color: #f9fafb;
}

.order-level {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.2);
  color: #e5e7eb;
}

.order-level.gold {
  background: rgba(250, 204, 21, 0.2);
  color: #facc15;
}

.order-mode {
  font-size: 11px;
  color: #9ca3af;
  margin-bottom: 6px;
}

.order-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: baseline;
  margin-bottom: 6px;
}

.price-worker {
  font-size: 13px;
  font-weight: 800;
  color: #4ade80;
}

.price-boss {
  font-size: 11px;
  color: #9ca3af;
  text-decoration: line-through;
}

.order-footer {
  display: flex;
  gap: 6px;
  font-size: 11px;
  color: #6b7280;
}

.time-light {
  white-space: nowrap;
}

.note {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.order-actions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  min-width: 72px;
}

.btn-primary {
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 11px;
  cursor: pointer;
}

.btn-primary {
  border-color: transparent;
  background: linear-gradient(135deg, #22c55e, #4ade80);
  color: #022c22;
  font-weight: 700;
  width: 100%;
}

.worker-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 56px;
  background: #020617;
  border-top: 1px solid #111827;
  display: flex;
}

.worker-nav-item {
  flex: 1;
  border: none;
  background: transparent;
  color: #6b7280;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 11px;
}

.worker-nav-item .nav-icon {
  font-size: 16px;
  margin-bottom: 2px;
}

.worker-nav-item.active {
  color: #f97316;
}
</style>

