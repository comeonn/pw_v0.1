<template>
  <div class="page">
    <header class="header">
      <button class="back-btn" type="button" @click="router.back()">←</button>
      <div class="header-title">钱包</div>
      <div class="header-spacer"></div>
    </header>

    <main class="content">
      <section class="wallet-card">
        <div class="wallet-balance-row">
          <div class="wallet-label">账户余额（元）</div>
          <div class="wallet-balance">￥{{ balance.toFixed(2) }}</div>
        </div>
        <button type="button" class="btn-recharge" @click="showRecharge = true">
          充值
        </button>
      </section>

      <section class="panel">
        <div class="txn-header">
          <h3 class="txn-title">充值记录</h3>
        </div>
        <div class="txn-list">
          <div v-if="txns.length === 0" class="txn-empty">暂无充值记录</div>
          <div v-for="t in txns" :key="t.id" class="txn-item">
            <div class="txn-main">
              <div class="txn-desc">{{ t.title }}</div>
              <div class="txn-time">{{ t.createdAt }}</div>
            </div>
            <div class="txn-amount income">+{{ t.amount.toFixed(2) }}</div>
          </div>
        </div>
      </section>
    </main>

    <Teleport to="body">
      <div v-if="showRecharge" class="modal-mask" @click.self="showRecharge = false">
        <div class="recharge-modal">
          <div class="modal-title">充值</div>
          <div class="amount-options">
            <button
              v-for="amt in quickAmounts"
              :key="amt"
              type="button"
              class="amount-btn"
              :class="{ active: selectedAmount === amt }"
              @click="selectedAmount = amt; customAmount = ''"
            >
              ￥{{ amt }}
            </button>
          </div>
          <div class="custom-amount">
            <label class="custom-label">自定义金额</label>
            <input
              v-model.number="customAmount"
              type="number"
              class="custom-input"
              placeholder="输入金额"
              min="1"
              step="1"
              @input="selectedAmount = null"
            />
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="showRecharge = false">
              取消
            </button>
            <button
              type="button"
              class="btn-primary"
              :disabled="rechargeAmount <= 0"
              @click="doRecharge"
            >
              确认充值 ￥{{ rechargeAmount.toFixed(2) }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

type Txn = {
  id: string
  title: string
  amount: number
  createdAt: string
}

const BALANCE_KEY = 'boss_wallet_balance'
const TXN_KEY = 'boss_wallet_txns'

function loadBalance(): number {
  const v = localStorage.getItem(BALANCE_KEY)
  return v ? Number(v) || 0 : 0
}

function loadTxns(): Txn[] {
  try {
    const v = localStorage.getItem(TXN_KEY)
    return v ? JSON.parse(v) : []
  } catch {
    return []
  }
}

function saveBalance(val: number) {
  localStorage.setItem(BALANCE_KEY, String(val))
}

function saveTxns(list: Txn[]) {
  localStorage.setItem(TXN_KEY, JSON.stringify(list))
}

const balance = ref(loadBalance())
const txns = ref<Txn[]>(loadTxns())

const quickAmounts = [100, 200, 500, 1000, 2000, 5000]
const selectedAmount = ref<number | null>(100)
const customAmount = ref<number | ''>('')
const showRecharge = ref(false)

const rechargeAmount = computed(() => {
  if (selectedAmount.value != null) return selectedAmount.value
  const n = Number(customAmount.value)
  return Number.isFinite(n) && n > 0 ? n : 0
})

function doRecharge() {
  const amt = rechargeAmount.value
  if (amt <= 0) return

  balance.value += amt
  saveBalance(balance.value)

  const now = new Date()
  const txn: Txn = {
    id: `boss_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    title: '余额充值',
    amount: amt,
    createdAt: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`
  }
  txns.value = [txn, ...txns.value]
  saveTxns(txns.value)

  showRecharge.value = false
  selectedAmount.value = 100
  customAmount.value = ''
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
  width: 40px;
}

.content {
  padding: 10px 12px 20px;
}

.panel {
  background: #ffffff;
  border-radius: 14px;
  padding: 16px 16px 12px;
  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.08),
    0 2px 10px rgba(15, 23, 42, 0.05);
  border: 1px solid #eef2f7;
}

.wallet-card {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #334155 100%);
  border-radius: 16px;
  padding: 18px 16px 14px;
  color: #f9fafb;
  margin-bottom: 12px;
  box-shadow:
    0 18px 40px rgba(15, 23, 42, 0.6),
    0 0 0 1px rgba(15, 23, 42, 0.4);
}

.wallet-balance-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}

.wallet-label {
  font-size: 12px;
  opacity: 0.9;
}

.wallet-balance {
  font-size: 26px;
  font-weight: 800;
}

.btn-recharge {
  margin-top: 4px;
  width: 100%;
  padding: 10px 0;
  border-radius: 999px;
  border: none;
  background: #f9fafb;
  color: #0f172a;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.btn-recharge:active {
  background: #e5e7eb;
}

.txn-header {
  margin-bottom: 10px;
}

.txn-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
}

.txn-list {
  display: flex;
  flex-direction: column;
}

.txn-empty {
  padding: 24px 0;
  text-align: center;
  font-size: 13px;
  color: #94a3b8;
}

.txn-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f1f5f9;
}

.txn-item:last-child {
  border-bottom: none;
}

.txn-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.txn-desc {
  font-size: 13px;
  color: #0f172a;
}

.txn-time {
  font-size: 12px;
  color: #94a3b8;
}

.txn-amount {
  font-size: 14px;
  font-weight: 700;
}

.txn-amount.income {
  color: #16a34a;
}

.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1000;
}

.recharge-modal {
  background: #ffffff;
  border-radius: 14px;
  padding: 20px 18px 16px;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.18);
}

.modal-title {
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 14px;
}

.amount-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.amount-btn {
  padding: 10px 0;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  background: #f9fafb;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  cursor: pointer;
}

.amount-btn.active {
  background: linear-gradient(135deg, #ff4d4f, #ff7a45);
  color: #ffffff;
  border-color: transparent;
}

.custom-amount {
  margin-bottom: 14px;
}

.custom-label {
  display: block;
  font-size: 13px;
  color: #64748b;
  margin-bottom: 4px;
}

.custom-input {
  width: 100%;
  padding: 9px 10px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  box-sizing: border-box;
}

.custom-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.15);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn-primary {
  padding: 9px 16px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #ff4d4f, #ff7a45);
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  padding: 9px 16px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
}
</style>

