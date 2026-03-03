<template>
  <div class="page worker-page">
    <header class="header-simple">
      <button class="back-btn" type="button" @click="go('/worker/home')">←</button>
      <div class="title">钱包</div>
      <div class="spacer"></div>
    </header>

    <main class="content">
      <section class="wallet-card">
        <div class="wallet-top">
          <div class="wallet-label">可提现余额（元）</div>
          <div class="wallet-balance">￥{{ wallet.balance.toFixed(2) }}</div>
        </div>
        <div class="wallet-bottom">
          <div class="wallet-item">
            <div class="wallet-item-label">累计收入</div>
            <div class="wallet-item-value">￥{{ wallet.totalIncome.toFixed(2) }}</div>
          </div>
          <div class="wallet-item">
            <div class="wallet-item-label">累计提现</div>
            <div class="wallet-item-value">￥{{ wallet.totalWithdrawn.toFixed(2) }}</div>
          </div>
        </div>
        <button class="withdraw-btn" type="button" @click="showWithdraw = true">
          提现
        </button>
      </section>

      <section class="txn-section">
        <div class="txn-head">
          <div class="txn-title">账单明细</div>
        </div>
        <div class="txn-list">
          <article v-for="t in txns" :key="t.id" class="txn-item">
            <div class="txn-main">
              <div class="txn-title">{{ t.title }}</div>
              <div class="txn-remark" v-if="t.remark">{{ t.remark }}</div>
            </div>
            <div class="txn-side">
              <div class="txn-amount" :class="t.amount >= 0 ? 'income' : 'out'">
                {{ t.amount >= 0 ? '+' : '' }}{{ t.amount.toFixed(2) }}
              </div>
              <div class="txn-time">{{ t.createdAt }}</div>
            </div>
          </article>
        </div>
      </section>
    </main>

    <nav class="worker-nav">
      <button class="worker-nav-item" type="button" @click="go('/worker/home')">
        <span class="nav-icon">📋</span>
        <span class="nav-text">大厅</span>
      </button>
      <button class="worker-nav-item" type="button" @click="go('/worker/orders')">
        <span class="nav-icon">📦</span>
        <span class="nav-text">我的单</span>
      </button>
      <button class="worker-nav-item active" type="button">
        <span class="nav-icon">💰</span>
        <span class="nav-text">钱包</span>
      </button>
    </nav>

    <Teleport to="body">
      <div v-if="showWithdraw" class="modal-mask" @click.self="showWithdraw = false">
        <div class="modal">
          <div class="modal-title">微信手动提现</div>
          <p class="modal-text">
            当前版本提现需添加客服微信，由客服联系你完成转账结算。请截图保存微信二维码，添加备注「提现 + 打手ID」。
          </p>
          <div class="wechat-box">
            <div class="wechat-id-row">
              <span class="wechat-label">客服微信</span>
              <span class="wechat-id">game-helper-001</span>
            </div>
            <div class="wechat-code-placeholder">
              此处放客服微信二维码图片（开发时替换）
            </div>
          </div>
          <button class="modal-btn" type="button" @click="showWithdraw = false">
            我知道了
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { MOCK_WALLET, MOCK_WALLET_TXN } from '../mock/worker'

const router = useRouter()
const wallet = MOCK_WALLET
const txns = MOCK_WALLET_TXN

const showWithdraw = ref(false)

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

.wallet-card {
  background: radial-gradient(circle at 0 0, #22c55e, transparent 55%),
    radial-gradient(circle at 100% 0, #f97316, transparent 60%),
    linear-gradient(135deg, #111827, #020617);
  border-radius: 20px;
  padding: 16px 16px 12px;
  color: #f9fafb;
  margin-bottom: 14px;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.6);
}

.wallet-top {
  margin-bottom: 10px;
}

.wallet-label {
  font-size: 12px;
  opacity: 0.9;
}

.wallet-balance {
  margin-top: 4px;
  font-size: 24px;
  font-weight: 900;
}

.wallet-bottom {
  display: flex;
  gap: 16px;
  margin-bottom: 10px;
}

.wallet-item-label {
  font-size: 11px;
  opacity: 0.8;
}

.wallet-item-value {
  font-size: 13px;
  font-weight: 600;
}

.withdraw-btn {
  margin-top: 4px;
  width: 100%;
  padding: 10px 0;
  border-radius: 999px;
  border: none;
  background: #f9fafb;
  color: #020617;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
}

.txn-section {
  background:
    radial-gradient(circle at 0 0, rgba(34, 197, 94, 0.18), transparent 55%),
    radial-gradient(circle at 100% 100%, rgba(56, 189, 248, 0.18), transparent 60%),
    linear-gradient(135deg, #020617, #020617 60%, #020617);
  border-radius: 14px;
  border: 1px solid rgba(17, 24, 39, 0.95);
  padding: 10px 10px 8px;
  color: #e5e7eb;
  box-shadow:
    0 16px 40px rgba(15, 23, 42, 0.9),
    0 0 0 1px rgba(15, 23, 42, 0.9);
}

.txn-head {
  margin-bottom: 6px;
}

.txn-title {
  font-size: 13px;
  font-weight: 600;
}

.txn-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.txn-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px solid #111827;
}

.txn-item:last-child {
  border-bottom: none;
}

.txn-main {
  flex: 1;
  min-width: 0;
}

.txn-title {
  font-size: 12px;
  margin-bottom: 2px;
}

.txn-remark {
  font-size: 11px;
  color: #9ca3af;
}

.txn-side {
  text-align: right;
  font-size: 11px;
}

.txn-amount.income {
  color: #4ade80;
  font-weight: 700;
}

.txn-amount.out {
  color: #f97316;
  font-weight: 700;
}

.txn-time {
  margin-top: 2px;
  color: #6b7280;
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

.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1000;
}

.modal {
  background: #020617;
  border-radius: 16px;
  padding: 18px 16px 14px;
  width: 100%;
  max-width: 320px;
  color: #e5e7eb;
  border: 1px solid #1f2937;
}

.modal-title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 6px;
}

.modal-text {
  font-size: 12px;
  color: #9ca3af;
  line-height: 1.6;
  margin-bottom: 10px;
}

.wechat-box {
  background: #020617;
  border-radius: 12px;
  border: 1px dashed #374151;
  padding: 10px;
  margin-bottom: 12px;
}

.wechat-id-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 8px;
}

.wechat-label {
  color: #9ca3af;
}

.wechat-id {
  font-weight: 600;
}

.wechat-code-placeholder {
  height: 120px;
  border-radius: 8px;
  border: 1px dashed #4b5563;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  padding: 0 8px;
}

.modal-btn {
  width: 100%;
  padding: 10px 0;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #f97316, #facc15);
  color: #111827;
  font-weight: 800;
  cursor: pointer;
}
</style>

