<template>
  <div class="page worker-page">
    <header class="header-simple">
      <button class="back-btn" type="button" @click="go('/worker/home')">←</button>
      <div class="title">我的订单</div>
      <div class="spacer"></div>
    </header>

    <main class="content">
      <div class="tabs">
        <button
          v-for="t in tabs"
          :key="t.id"
          class="tab-item"
          :class="{ active: activeTab === t.id }"
          type="button"
          @click="activeTab = t.id"
        >
          {{ t.label }}
        </button>
      </div>

      <section class="order-list">
        <article
          v-for="order in filteredOrders"
          :key="order.id"
          class="order-card"
          @click="openDetail(order)"
        >
          <div class="row-top">
            <span class="order-id">{{ order.id }}</span>
            <span class="status-tag" :class="order.status">
              {{ statusText(order.status) }}
            </span>
          </div>
          <div class="row-main">
            <div class="title">{{ order.title }}</div>
            <div class="mode">{{ order.mode }}</div>
          </div>
          <div class="row-bottom">
            <span class="price">价格 ￥{{ order.workerPrice }}</span>
            <span class="time">{{ order.createdAt }}</span>
          </div>
        </article>
      </section>
    </main>

    <Teleport to="body">
      <div
        v-if="detailOrder"
        class="detail-mask"
        @click.self="closeDetail"
      >
        <div class="detail-modal">
          <div class="detail-title">订单详情</div>
          <div class="detail-body">
            <div class="detail-row">
              <span class="label">商品标题</span>
              <span class="value">{{ detailOrder.title }}</span>
            </div>
            <div class="detail-row" v-if="goodsDetailMap[detailOrder.goodsId]">
              <span class="label">商品详情</span>
              <span class="value remark">{{ goodsDetailMap[detailOrder.goodsId] }}</span>
            </div>
            <div class="detail-row">
              <span class="label">模式类型</span>
              <span class="value">{{ detailOrder.mode }}</span>
            </div>
            <div class="detail-row">
              <span class="label">价格</span>
              <span class="value highlight">￥{{ detailOrder.workerPrice }}</span>
            </div>
            <div class="detail-row" v-if="detailOrder.phone">
              <span class="label">手机号</span>
              <span class="value">{{ detailOrder.phone }}</span>
            </div>
            <div class="detail-row" v-if="detailOrder.gameId">
              <span class="label">游戏 ID</span>
              <span class="value">{{ detailOrder.gameId }}</span>
            </div>
            <div class="detail-row" v-if="detailOrder.numericId">
              <span class="label">数字 ID</span>
              <span class="value">{{ detailOrder.numericId }}</span>
            </div>
            <div class="detail-row" v-if="detailOrder.bossNote">
              <span class="label">老板备注</span>
              <span class="value remark">{{ detailOrder.bossNote }}</span>
            </div>
          </div>
          <div class="detail-actions">
            <button type="button" class="detail-btn" @click="closeDetail">我知道了</button>
          </div>
        </div>
      </div>
    </Teleport>

    <nav class="worker-nav">
      <button class="worker-nav-item" type="button" @click="go('/worker/home')">
        <span class="nav-icon">📋</span>
        <span class="nav-text">大厅</span>
      </button>
      <button class="worker-nav-item active" type="button">
        <span class="nav-icon">📦</span>
        <span class="nav-text">我的单</span>
      </button>
      <button class="worker-nav-item" type="button" @click="go('/worker/wallet')">
        <span class="nav-icon">💰</span>
        <span class="nav-text">钱包</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MOCK_MY_ORDERS, type WorkerOrder } from '../mock/worker'
import { GOODS } from '../mock/goods'

const router = useRouter()
const route = useRoute()

const tabs = [
  { id: 'all', label: '全部' },
  { id: 'pending_close', label: '待结单' },
  { id: 'closed', label: '已结单' },
  { id: 'finished', label: '已结束' }
] as const

type TabId = (typeof tabs)[number]['id']

const activeTab = ref<TabId>('all')

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') return MOCK_MY_ORDERS
  return MOCK_MY_ORDERS.filter((o) => o.status === activeTab.value)
})

const detailOrder = ref<WorkerOrder | null>(null)

const goodsDetailMap: Record<number, string> = GOODS.reduce(
  (map, g) => {
    if (g.detail) map[g.id] = g.detail
    else if (g.intro) map[g.id] = g.intro
    return map
  },
  {} as Record<number, string>
)

function statusText(status: WorkerOrder['status']) {
  switch (status) {
    case 'waiting':
      return '待接单'
    case 'pending_close':
      return '待结单'
    case 'closed':
      return '已结单'
    case 'finished':
      return '已结束'
  }
}

function go(path: string) {
  router.push(path)
}

function openDetail(order: WorkerOrder) {
  detailOrder.value = order
}

function closeDetail() {
  detailOrder.value = null
}

onMounted(() => {
  if (route.query.from === 'accepted') {
    const list = filteredOrders.value
    if (list.length) {
      detailOrder.value = list[0]
    }
  }
})
</script>

<style scoped>
.worker-page {
  min-height: 100vh;
  padding-bottom: 56px;
  box-sizing: border-box;
  background:
    radial-gradient(circle at 0 0, rgba(34, 197, 94, 0.22), transparent 55%),
    radial-gradient(circle at 100% 0, rgba(248, 113, 22, 0.18), transparent 60%),
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
    linear-gradient(145deg, #020617 0%, #020617 40%, #020617 100%);
  box-sizing: border-box;
}

.header-simple {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: #020617;
  color: #e5e7eb;
  border-bottom: 1px solid #111827;
}

.back-btn {
  border: none;
  background: #111827;
  color: #e5e7eb;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 13px;
}

.title {
  font-size: 15px;
  font-weight: 700;
}

.spacer {
  width: 44px;
}

.content {
  padding: 10px 10px 12px;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.tab-item {
  flex: 1;
  border-radius: 999px;
  border: 1px solid #1e293b;
  background:
    radial-gradient(circle at 0 0, rgba(34, 197, 94, 0.22), transparent 55%),
    radial-gradient(circle at 100% 0, rgba(248, 113, 22, 0.18), transparent 60%),
    linear-gradient(135deg, #020617, #020617 60%, #020617);
  color: #9ca3af;
  font-size: 12px;
  padding: 6px 0;
}

.tab-item.active {
  background: linear-gradient(135deg, #f97316, #facc15);
  color: #111827;
  border-color: transparent;
  font-weight: 700;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.order-card {
  background:
    radial-gradient(circle at 0 0, rgba(34, 197, 94, 0.18), transparent 55%),
    radial-gradient(circle at 100% 100%, rgba(56, 189, 248, 0.18), transparent 60%),
    linear-gradient(135deg, #020617, #020617 60%, #020617);
  border-radius: 12px;
  border: 1px solid rgba(31, 41, 55, 0.9);
  padding: 8px 10px;
  color: #e5e7eb;
  font-size: 12px;
  box-shadow:
    0 14px 32px rgba(15, 23, 42, 0.9),
    0 0 0 1px rgba(15, 23, 42, 0.9);
}

.row-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.order-id {
  color: #6b7280;
  font-size: 11px;
}

.status-tag {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  background: #111827;
}

.status-tag.pending_close {
  background: rgba(59, 130, 246, 0.18);
  color: #bfdbfe;
}

.status-tag.closed {
  background: rgba(34, 197, 94, 0.2);
  color: #bbf7d0;
}

.status-tag.finished {
  background: rgba(148, 163, 184, 0.25);
  color: #94a3b8;
}

.row-main .title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 2px;
}

.row-main .mode {
  font-size: 11px;
  color: #9ca3af;
  margin-bottom: 4px;
}

.row-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
}

.price {
  color: #4ade80;
  font-weight: 700;
}

.time {
  color: #6b7280;
}

.detail-mask {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.detail-modal {
  width: 100%;
  max-width: 360px;
  background: #020617;
  border-radius: 16px;
  padding: 16px 16px 12px;
  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.85),
    0 0 0 1px rgba(31, 41, 55, 0.9);
  color: #e5e7eb;
}

.detail-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
}

.detail-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

.detail-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12px;
}

.detail-row .label {
  flex: 0 0 68px;
  color: #9ca3af;
}

.detail-row .value {
  flex: 1;
  color: #e5e7eb;
}

.detail-row .value.highlight {
  color: #4ade80;
  font-weight: 700;
}

.detail-row .value.remark {
  white-space: pre-wrap;
}

.detail-actions {
  display: flex;
  justify-content: flex-end;
}

.detail-btn {
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid #1f2937;
  background: #020617;
  color: #e5e7eb;
  font-size: 13px;
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

