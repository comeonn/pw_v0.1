<template>
  <div class="page">
    <header class="header">
      <button class="back-btn" type="button" @click="router.back()">←</button>
      <div class="header-title">我的订单</div>
      <div class="header-spacer"></div>
    </header>

    <main class="content">
      <section class="tabs">
        <button
          v-for="t in tabs"
          :key="t.id"
          class="tab-item"
          :class="{ active: activeTab === t.id }"
          type="button"
          @click="changeTab(t.id)"
        >
          {{ t.label }}
        </button>
      </section>

      <section class="card">
        <div class="card-head">
          <span class="card-title">
            {{ activeTab === 'toDispatch' ? '待派单列表' : tabsMap[activeTab].label + '（示意）' }}
          </span>
        </div>
        <div v-if="activeTab === 'toDispatch' && unassignedOrders.length" class="order-list">
          <article
            v-for="order in unassignedOrders"
            :key="order.id"
            class="order-item"
          >
            <div class="order-main">
              <div class="order-title">{{ order.title }}</div>
              <div class="order-meta">
                <span class="order-price">￥{{ order.amount }}</span>
                <span class="order-time">{{ order.createdAt }}</span>
              </div>
            </div>
            <button type="button" class="order-btn" @click="openDispatch(order)">
              派单
            </button>
          </article>
        </div>
        <div v-else class="empty">
          <div class="empty-title">
            {{ activeTab === 'toDispatch' ? '暂无待派单订单' : '暂无相关订单' }}
          </div>
          <div class="empty-sub">
            {{ activeTab === 'toDispatch' ? '下单完成后，可在此选择派单时间' : '该状态下的订单后续接入后端后展示' }}
          </div>
        </div>
      </section>
    </main>

    <Teleport to="body">
      <div
        v-if="showDispatchModal"
        class="dispatch-mask"
        @click.self="closeDispatch"
      >
        <div class="dispatch-modal">
          <div class="dispatch-title">填写派单信息</div>
          <div class="dispatch-sub" v-if="currentOrder">
            订单：{{ currentOrder.title }}（￥{{ currentOrder.amount }}）
          </div>
          <div class="dispatch-form">
            <label class="dispatch-label">
              手机号
              <input
                v-model="formPhone"
                type="tel"
                class="dispatch-input"
                placeholder="请输入联系手机号"
              />
            </label>
            <label class="dispatch-label">
              游戏 ID
              <input
                v-model="formGameId"
                type="text"
                class="dispatch-input"
                placeholder="请输入游戏内 ID / 昵称"
              />
            </label>
            <label class="dispatch-label">
              姓名
              <input
                v-model="formName"
                type="text"
                class="dispatch-input"
                placeholder="请输入称呼，方便打手沟通"
              />
            </label>
            <label class="dispatch-label">
              备注
              <textarea
                v-model="formRemark"
                class="dispatch-input textarea"
                rows="3"
                placeholder="可填写上号时间、特殊要求等"
              />
            </label>
          </div>
          <div class="dispatch-actions">
            <button type="button" class="dispatch-btn secondary" @click="closeDispatch">
              取消
            </button>
            <button type="button" class="dispatch-btn primary" @click="submitDispatch">
              确认派单
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

type UnassignedOrder = {
  id: string
  title: string
  amount: number
  createdAt: string
}

type TabId = 'waitingPay' | 'toDispatch' | 'waitingClose' | 'finished'

const tabs = [
  { id: 'waitingPay', label: '待付款' },
  { id: 'toDispatch', label: '待派单' },
  { id: 'waitingClose', label: '待结单' },
  { id: 'finished', label: '已完成' }
] as const

const tabsMap: Record<TabId, { id: TabId; label: string }> = {
  waitingPay: tabs[0],
  toDispatch: tabs[1],
  waitingClose: tabs[2],
  finished: tabs[3]
}

const route = useRoute()
const router = useRouter()

const activeTab = ref<TabId>(
  (route.query.tab as TabId) && tabsMap[route.query.tab as TabId]
    ? (route.query.tab as TabId)
    : 'toDispatch'
)

const unassignedOrders = ref<UnassignedOrder[]>([
  {
    id: 'BOSS-UN001',
    title: '春服护航 3 小时 · 勇敢者行动',
    amount: 89.9,
    createdAt: '2026-03-05 20:30'
  },
  {
    id: 'BOSS-UN002',
    title: '春服护航 3 小时 · 保底 500w',
    amount: 129.0,
    createdAt: '2026-03-05 19:50'
  }
])

const showDispatchModal = ref(false)
const currentOrder = ref<UnassignedOrder | null>(null)

const formPhone = ref('')
const formGameId = ref('')
const formName = ref('')
const formRemark = ref('')

const unassignedCount = computed(() => unassignedOrders.value.length)

function changeTab(id: TabId) {
  activeTab.value = id
  router.replace({ name: 'BossUnassignedOrders', query: { tab: id } })
}

function openDispatch(order: UnassignedOrder) {
  currentOrder.value = order
  formPhone.value = ''
  formGameId.value = ''
  formName.value = ''
  formRemark.value = ''
  showDispatchModal.value = true
}

function closeDispatch() {
  showDispatchModal.value = false
}

function submitDispatch() {
  if (!formPhone.value || !formGameId.value || !formName.value) {
    alert('请填写手机号、游戏 ID 和姓名')
    return
  }
  // TODO: 调用后端接口创建派单请求
  alert('已提交派单信息（示例），后续对接后端接口生效')
  showDispatchModal.value = false
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f2f3f7;
  padding-bottom: 40px;
  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: #ffffff;
  border-bottom: 1px solid #eef2f7;
}

.back-btn {
  border: none;
  background: #f3f4f6;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 14px;
  cursor: pointer;
}

.header-title {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

.header-spacer {
  width: 44px;
}

.content {
  padding: 12px 12px 18px;
}

.tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-bottom: 10px;
}

.tab-item {
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  padding: 6px 0;
  font-size: 12px;
  background: #ffffff;
  color: #6b7280;
}

.tab-item.active {
  background: linear-gradient(135deg, #ff4d4f, #ff7a45);
  color: #ffffff;
  border-color: transparent;
  font-weight: 600;
}

.card {
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #eef2f7;
  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.08),
    0 2px 10px rgba(15, 23, 42, 0.05);
  padding: 14px 14px 10px;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.card-title {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.order-main {
  flex: 1;
  min-width: 0;
}

.order-title {
  font-size: 14px;
  color: #0f172a;
  font-weight: 500;
  margin-bottom: 2px;
}

.order-meta {
  display: flex;
  gap: 6px;
  font-size: 12px;
  color: #94a3b8;
}

.order-price {
  font-weight: 600;
  color: #ef4444;
}

.order-time {
  margin-left: auto;
}

.order-btn {
  flex-shrink: 0;
  border-radius: 999px;
  border: none;
  padding: 6px 10px;
  font-size: 12px;
  background: linear-gradient(135deg, #ff4d4f, #ff7a45);
  color: #ffffff;
  cursor: pointer;
}

.empty {
  padding: 24px 10px 18px;
  text-align: center;
  font-size: 13px;
  color: #9ca3af;
}

.empty-title {
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 4px;
}

.empty-sub {
  font-size: 12px;
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

