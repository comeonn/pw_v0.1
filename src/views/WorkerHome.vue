<template>
  <div class="page worker-page">
    <header class="header">
      <div class="header-top">
        <div class="worker-tag" :class="profile.level">
          {{ profile.level === 'gold' ? '金牌打手' : '普通打手' }}
        </div>
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
        </div>
      </div>
    </header>

    <main class="content">
      <section class="section-head">
        <div class="section-title">接单大厅</div>
      </section>

      <section class="order-list">
        <article
          v-for="order in availableOrders"
          :key="order.id"
          class="order-card"
          @click="openDetail(order)"
        >
          <div class="order-thumb">
            <img :src="goodsCoverMap[order.goodsId]" :alt="order.title" />
          </div>
          <div class="order-main">
            <div class="order-title-row">
              <span class="order-title">{{ order.title }}</span>
            </div>
            <div class="order-mode">{{ order.mode }}</div>
            <div class="order-meta">
              <span class="price-worker">价格 ￥{{ order.workerPrice }}</span>
            </div>
            <div class="order-footer">
              <span class="time-light">{{ order.createdAt }}</span>
              <span v-if="order.bossNote" class="note">
                备注：{{ order.bossNote }}
              </span>
            </div>
          </div>
          <div class="order-actions">
            <button
              class="btn-primary"
              type="button"
              @click.stop="openAccept(order)"
            >
              接单
            </button>
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
            <div class="detail-row">
              <span class="label">模式类型</span>
              <span class="value">{{ detailOrder.mode }}</span>
            </div>
            <div class="detail-row">
              <span class="label">价格</span>
              <span class="value highlight">￥{{ detailOrder.workerPrice }}</span>
            </div>
            <div class="detail-row">
              <span class="label">发布时间</span>
              <span class="value">{{ detailOrder.createdAt }}</span>
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
            <button type="button" class="detail-btn" @click="closeDetail">关闭</button>
          </div>
        </div>
      </div>

      <div
        v-if="acceptOrder"
        class="detail-mask"
        @click.self="closeAccept"
      >
        <div class="detail-modal">
          <div class="detail-title">确认接单并填写信息</div>
          <div class="detail-body">
            <div class="detail-row">
              <span class="label">标题</span>
              <span class="value">{{ acceptOrder.title }}</span>
            </div>
            <div class="detail-row">
              <span class="label">价格</span>
              <span class="value highlight">￥{{ acceptOrder.workerPrice }}</span>
            </div>
            <div class="detail-row">
              <span class="label">我的游戏 ID</span>
              <input
                v-model="formWorkerGameId"
                class="detail-input"
                placeholder="请输入你在游戏里的 ID / 昵称"
              />
            </div>
            <div class="detail-row">
              <span class="label">预计上号</span>
              <input
                v-model="formStartTime"
                class="detail-input"
                placeholder="例：10 分钟内 / 晚上 8 点"
              />
            </div>
            <div class="detail-row">
              <span class="label">接单备注</span>
              <textarea
                v-model="formWorkerRemark"
                class="detail-input textarea"
                rows="3"
                placeholder="可填写你的玩法特点、语音情况、注意事项等"
              />
            </div>
          </div>
          <div class="detail-actions">
            <button type="button" class="detail-btn" @click="closeAccept">取消</button>
            <button type="button" class="detail-btn primary" @click="submitAccept">
              确认接单
            </button>
          </div>
        </div>
      </div>
    </Teleport>

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
import { ref } from 'vue'
import { MOCK_AVAILABLE_ORDERS, MOCK_WORKER_PROFILE, type WorkerOrder } from '../mock/worker'
import { GOODS } from '../mock/goods'
import { useRouter } from 'vue-router'

const router = useRouter()

const profile = MOCK_WORKER_PROFILE
const availableOrders = MOCK_AVAILABLE_ORDERS

const detailOrder = ref<WorkerOrder | null>(null)
const acceptOrder = ref<WorkerOrder | null>(null)
const formStartTime = ref('')
const formWorkerGameId = ref('')
const formWorkerRemark = ref('')

const goodsCoverMap: Record<number, string> = GOODS.reduce(
  (map, g) => {
    map[g.id] = g.cover
    return map
  },
  {} as Record<number, string>
)

function go(path: string) {
  router.push(path)
}

function openDetail(order: WorkerOrder) {
  detailOrder.value = order
}

function closeDetail() {
  detailOrder.value = null
}

function openAccept(order: WorkerOrder) {
  acceptOrder.value = order
  formStartTime.value = ''
  formWorkerGameId.value = ''
  formWorkerRemark.value = ''
}

function closeAccept() {
  acceptOrder.value = null
}

function submitAccept() {
  if (!formWorkerGameId.value) {
    alert('请填写你的游戏 ID')
    return
  }
  if (!formStartTime.value) {
    alert('请填写预计上号时间')
    return
  }
  // TODO: 调用后端接口完成接单，并保存打手备注信息
  alert('已提交接单信息（示例），后续对接后端接口生效')
  acceptOrder.value = null
  router.push('/worker/orders')
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

.order-thumb {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background: #0f172a;
  border: 1px solid rgba(148, 163, 184, 0.6);
}

.order-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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
  gap: 8px;
}

.detail-btn {
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid #1f2937;
  background: #020617;
  color: #e5e7eb;
  font-size: 13px;
  cursor: pointer;
}

.detail-btn.primary {
  border-color: transparent;
  background: linear-gradient(135deg, #22c55e, #4ade80);
  color: #022c22;
  font-weight: 600;
}

.detail-input {
  flex: 1;
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid #1f2937;
  background: #020617;
  color: #e5e7eb;
  font-size: 12px;
}

.detail-input.textarea {
  resize: vertical;
  min-height: 60px;
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

