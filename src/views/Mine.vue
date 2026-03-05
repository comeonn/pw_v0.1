<template>
  <div class="page">
    <main class="content">
      <section class="user-card">
        <div class="user-avatar">
          <img class="avatar-image" :src="user.avatar" :alt="user.name" />
        </div>
        <div class="user-info">
          <div class="user-name">
            {{ user.name }}
            <span class="user-id">ID: {{ user.id }}</span>
          </div>
          <div class="user-tip">{{ user.slogan }}</div>
          <div class="level-row">
            <div class="level-label">Lv.{{ user.level }}</div>
            <div class="level-bar">
              <div class="level-bar-inner" :style="{ width: levelPercent + '%' }"></div>
            </div>
            <div class="level-exp">{{ user.exp }}/{{ user.nextExp }}</div>
          </div>
        </div>
        <span class="role-badge">老板</span>
      </section>

      <!-- 我的订单模块 -->
      <section class="order-card">
        <div class="order-head">
          <span class="order-title">我的订单</span>
          <span class="order-more">查看全部 ›</span>
        </div>
        <div class="order-status-row">
          <button class="status-item" type="button">
            <span class="status-icon wait">
              <svg viewBox="0 0 24 24" class="status-svg" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="1.6" />
                <rect x="4.5" y="9" width="15" height="1.4" fill="currentColor" opacity="0.6" />
                <rect x="6" y="13" width="4" height="1.6" rx="0.8" fill="currentColor" />
              </svg>
            </span>
            <span class="status-text">待付款</span>
          </button>
          <button class="status-item" type="button">
            <span class="status-icon doing">
              <svg viewBox="0 0 24 24" class="status-svg" aria-hidden="true">
                <rect x="5" y="3" width="14" height="18" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="1.6" />
                <rect x="8" y="8" width="8" height="1.4" rx="0.7" fill="currentColor" />
                <rect x="8" y="12" width="6" height="1.4" rx="0.7" fill="currentColor" opacity="0.8" />
                <circle cx="9" cy="6" r="0.9" fill="currentColor" />
              </svg>
            </span>
            <span class="status-text">待结单</span>
          </button>
          <button class="status-item" type="button">
            <span class="status-icon done">
              <svg viewBox="0 0 24 24" class="status-svg" aria-hidden="true">
                <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.6" />
                <path d="M8.5 12.5 11 15l4.5-5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <span class="status-text">已完成</span>
          </button>
          <button class="status-item" type="button" @click="goUnassigned">
            <span class="status-icon unassigned">
              <svg viewBox="0 0 24 24" class="status-svg" aria-hidden="true">
                <rect x="4" y="5" width="16" height="14" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="1.6" />
                <path d="M8 9h8M8 13h4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
              </svg>
            </span>
            <span class="status-text">未派单</span>
          </button>
        </div>
      </section>

      <!-- 菜单：把“我的权益”和“联系客服”放一起，去掉投诉入口和设置 -->
      <section class="menu-list">
        <div class="menu-group">
          <a class="menu-item" href="javascript:;">
            <span class="menu-icon-wrap purple"><span class="menu-icon">🎫</span></span>
            <span class="menu-text">
              <span class="menu-main">我的权益</span>
              <span class="menu-sub">抽奖获得的次数/权益</span>
            </span>
            <span class="menu-arrow">›</span>
          </a>
          <a class="menu-item" href="javascript:;">
            <span class="menu-icon-wrap green"><span class="menu-icon">💬</span></span>
            <span class="menu-text">
              <span class="menu-main">联系客服</span>
              <span class="menu-sub">问题反馈 / 售后处理</span>
            </span>
            <span class="menu-arrow">›</span>
          </a>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const waitingPay = ref(0)
const waitingClose = ref(0)
const finished = ref(0)

const user = ref({
  id: 'BOSS-1024',
  name: '怪兽老板',
  slogan: '今天也要稳定上分',
  level: 12,
  exp: 340,
  nextExp: 500,
  avatar:
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ff4d4f"/><stop offset="1" stop-color="#6366f1"/></linearGradient></defs><rect width="128" height="128" rx="64" fill="url(#g)"/><circle cx="64" cy="54" r="22" fill="rgba(255,255,255,0.9)"/><rect x="28" y="80" width="72" height="30" rx="15" fill="rgba(255,255,255,0.9)"/></svg>`
    )
})

const levelPercent = computed(() => {
  const exp = user.value.exp
  const next = user.value.nextExp
  if (next <= 0) return 0
  return Math.max(0, Math.min(100, Math.round((exp / next) * 100)))
})

const router = useRouter()

function goUnassigned() {
  router.push('/mine/unassigned')
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f2f3f7;
  padding-bottom: 60px;
  box-sizing: border-box;
}

.content {
  padding: 12px 12px 24px;
  margin-top: -8px;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #fff;
  border-radius: 14px;
  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.08),
    0 2px 10px rgba(15, 23, 42, 0.05);
  margin-bottom: 12px;
  border: 1px solid #eef2f7;
  position: relative;
}

.user-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 14px;
  overflow: hidden;
  box-shadow: 0 10px 18px rgba(15, 23, 42, 0.12);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

.user-id {
  font-size: 11px;
  color: #94a3b8;
  font-weight: 600;
}

.user-tip {
  font-size: 12px;
  color: #999;
}

.level-row {
  margin-top: 8px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 8px;
}

.level-label {
  font-size: 11px;
  font-weight: 800;
  color: #0f172a;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.06);
}

.level-bar {
  height: 8px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.25);
  overflow: hidden;
}

.level-bar-inner {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(135deg, #ff4d4f, #ff7a45);
  box-shadow: 0 8px 16px rgba(255, 77, 79, 0.25);
}

.level-exp {
  font-size: 11px;
  color: #94a3b8;
  font-weight: 600;
}
.role-badge {
  position: absolute;
  right: 14px;
  top: 14px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #ff4d4f;
  background: rgba(255, 77, 79, 0.1);
  border: 1px solid rgba(255, 77, 79, 0.25);
}

.order-card {
  background: #fff;
  border-radius: 14px;
  padding: 14px 14px 10px;
  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.08),
    0 2px 10px rgba(15, 23, 42, 0.05);
  margin-bottom: 12px;
  border: 1px solid #eef2f7;
}

.order-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.order-title {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

.order-more {
  font-size: 12px;
  color: #94a3b8;
}

.order-status-row {
  display: flex;
}

.status-item {
  flex: 1;
  border: none;
  background: transparent;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  position: relative;
}

.status-icon {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: rgba(15, 23, 42, 0.06);
}

.status-svg {
  width: 22px;
  height: 22px;
}

.status-icon.wait {
  background: rgba(59, 130, 246, 0.12);
}

.status-icon.doing {
  background: rgba(250, 204, 21, 0.14);
}

.status-icon.done {
  background: rgba(34, 197, 94, 0.12);
}

.status-icon.unassigned {
  background: rgba(148, 163, 184, 0.14);
}

.status-badge {
  position: absolute;
  top: 8px;
  right: 26px;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  background: #ff4d4f;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: grid;
  place-items: center;
}

.status-text {
  font-size: 12px;
  color: #64748b;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-group {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.08),
    0 2px 10px rgba(15, 23, 42, 0.05);
  border: 1px solid #eef2f7;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  text-decoration: none;
  color: #1a1a1a;
  font-size: 15px;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.2s;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:active {
  background: #f8f9fa;
}

.menu-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  margin-right: 12px;
}

.menu-icon-wrap.purple {
  background: rgba(99, 102, 241, 0.12);
}

.menu-icon-wrap.green {
  background: rgba(34, 197, 94, 0.12);
}

.menu-icon {
  font-size: 18px;
}

.menu-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.menu-main {
  font-weight: 600;
  color: #0f172a;
}

.menu-sub {
  font-size: 12px;
  color: #94a3b8;
}

.menu-arrow {
  font-size: 18px;
  color: #c0c0c0;
  font-weight: 300;
}

.unassigned-list {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.unassigned-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.unassigned-main {
  flex: 1;
  min-width: 0;
}

.unassigned-title {
  font-size: 13px;
  color: #0f172a;
  font-weight: 500;
  margin-bottom: 2px;
}

.unassigned-meta {
  display: flex;
  gap: 6px;
  font-size: 11px;
  color: #94a3b8;
}

.unassigned-price {
  font-weight: 600;
  color: #ef4444;
}

.unassigned-time {
  margin-left: auto;
}

.unassigned-btn {
  flex-shrink: 0;
  border-radius: 999px;
  border: none;
  padding: 6px 10px;
  font-size: 12px;
  background: linear-gradient(135deg, #ff4d4f, #ff7a45);
  color: #fff;
  cursor: pointer;
}

.dispatch-mask {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.dispatch-modal {
  width: 100%;
  max-width: 360px;
  background: #ffffff;
  border-radius: 16px;
  padding: 18px 16px 14px;
  box-shadow:
    0 18px 40px rgba(15, 23, 42, 0.15),
    0 0 0 1px rgba(15, 23, 42, 0.04);
}

.dispatch-title {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
}

.dispatch-sub {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 10px;
}

.dispatch-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 12px;
}

.dispatch-label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #4b5563;
}

.dispatch-input {
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 13px;
  box-sizing: border-box;
}

.dispatch-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1);
}

.dispatch-input.textarea {
  resize: vertical;
}

.dispatch-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.dispatch-btn {
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 13px;
  cursor: pointer;
}

.dispatch-btn.secondary {
  background: #ffffff;
  border-color: #e5e7eb;
  color: #4b5563;
}

.dispatch-btn.primary {
  background: linear-gradient(135deg, #ff4d4f, #ff7a45);
  color: #ffffff;
}
</style>

