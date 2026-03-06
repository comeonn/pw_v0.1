<template>
  <div class="admin-page">
    <div class="page-header">
      <h2 class="page-title">用户管理</h2>
      <div class="header-tabs">
        <button
          type="button"
          class="tab"
          :class="{ active: role === 'boss' }"
          @click="role = 'boss'"
        >
          老板
        </button>
        <button
          type="button"
          class="tab"
          :class="{ active: role === 'worker' }"
          @click="role = 'worker'"
        >
          打手
        </button>
      </div>
    </div>
    <div class="toolbar">
      <input
        v-model="keyword"
        type="text"
        class="search-input"
        placeholder="搜索用户 ID / 昵称"
      />
      <button type="button" class="btn-primary">查询</button>
      <button type="button" class="btn-secondary" @click="showProtectionModal = true">
        设置保护期时间
      </button>
    </div>
    <!-- 保护期时间弹窗：按银牌/金牌/王牌分别设置 -->
    <div v-if="showProtectionModal" class="modal-mask" @click.self="showProtectionModal = false">
      <div class="modal modal-wide">
        <h3 class="modal-title">设置保护期时间</h3>
        <p class="modal-desc">
          老板下单后，级别更高的打手可更早看到新单。可为<strong>银牌、金牌、王牌</strong>分别设置保护期，过了对应保护期后该级别打手才能在接单大厅看到该单。
        </p>
        <div v-for="lev in workerLevels" :key="lev.id" class="protection-row">
          <span class="protection-label">{{ lev.label }}打手</span>
          <div class="form-row inline">
            <div class="form-group flex">
              <input
                v-model.number="protectionByLevel[lev.id].value"
                type="number"
                min="0"
                class="form-input"
                placeholder="数值"
              />
            </div>
            <div class="form-group">
              <select v-model="protectionByLevel[lev.id].unit" class="form-select">
                <option value="second">秒</option>
                <option value="minute">分钟</option>
                <option value="hour">小时</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="showProtectionModal = false">取消</button>
          <button type="button" class="btn-primary" @click="saveProtection">确定</button>
        </div>
      </div>
    </div>
    <!-- 设置打手级别弹窗 -->
    <div v-if="showLevelModal" class="modal-mask" @click.self="closeLevelModal">
      <div class="modal">
        <h3 class="modal-title">设置打手级别</h3>
        <p class="modal-desc">当前打手：{{ editingWorker?.nickname }}</p>
        <div class="level-options">
          <button
            v-for="lev in workerLevels"
            :key="lev.id"
            type="button"
            class="level-btn"
            :class="{ active: pendingLevel === lev.id }"
            @click="setWorkerLevel(lev.id)"
          >
            {{ lev.label }}打手
          </button>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="closeLevelModal">取消</button>
          <button type="button" class="btn-primary" @click="confirmLevel">确定</button>
        </div>
      </div>
    </div>
    <section class="panel">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>用户 ID</th>
              <th>昵称</th>
              <th>角色</th>
              <th v-if="role === 'worker'">打手级别</th>
              <th>注册时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in mockUsers" :key="u.id">
              <td>{{ u.id }}</td>
              <td>{{ u.nickname }}</td>
              <td>{{ u.role === 'boss' ? '老板' : '打手' }}</td>
              <td v-if="role === 'worker'">
                <span v-if="u.role === 'worker'" :class="['level-tag', (u as WorkerUser).level]">
                  {{ levelLabel((u as WorkerUser).level) }}
                </span>
              </td>
              <td>{{ u.createdAt }}</td>
              <td>
                <span :class="['status-tag', u.status]">{{ u.status === 'normal' ? '正常' : '已封禁' }}</span>
              </td>
              <td>
                <button v-if="role === 'worker' && u.role === 'worker'" type="button" class="btn-link" @click="openLevelModal(u as WorkerUser)">设置级别</button>
                <button type="button" class="btn-link">{{ u.status === 'normal' ? '封禁' : '解封' }}</button>
                <button type="button" class="btn-link">详情</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

type WorkerLevelId = 'silver' | 'gold' | 'ace'
type ProtectionUnit = 'second' | 'minute' | 'hour'

interface BossUser {
  id: string
  nickname: string
  role: 'boss'
  createdAt: string
  status: 'normal' | 'banned'
}

interface WorkerUser {
  id: string
  nickname: string
  role: 'worker'
  level: WorkerLevelId
  createdAt: string
  status: 'normal' | 'banned'
}

const workerLevels = [
  { id: 'silver' as const, label: '银牌' },
  { id: 'gold' as const, label: '金牌' },
  { id: 'ace' as const, label: '王牌' }
]

const role = ref<'boss' | 'worker'>('boss')
const keyword = ref('')
const showProtectionModal = ref(false)
const protectionByLevel = reactive<Record<WorkerLevelId, { value: number; unit: ProtectionUnit }>>({
  silver: { value: 30, unit: 'minute' },
  gold: { value: 10, unit: 'minute' },
  ace: { value: 0, unit: 'second' }
})

const showLevelModal = ref(false)
const editingWorker = ref<WorkerUser | null>(null)
const pendingLevel = ref<WorkerLevelId | null>(null)

const mockUsersAll = ref<(BossUser | WorkerUser)[]>([
  { id: '10001', nickname: '老板小明', role: 'boss', createdAt: '2025-02-20 14:32', status: 'normal' },
  { id: '10002', nickname: '打手阿强', role: 'worker', level: 'gold', createdAt: '2025-02-21 09:15', status: 'normal' },
  { id: '10003', nickname: '氪金玩家', role: 'boss', createdAt: '2025-02-22 18:00', status: 'normal' },
  { id: '10004', nickname: '接单达人', role: 'worker', level: 'silver', createdAt: '2025-02-23 11:20', status: 'banned' },
  { id: '10005', nickname: '新手老板', role: 'boss', createdAt: '2025-03-01 08:45', status: 'normal' },
  { id: '10006', nickname: '王牌打手', role: 'worker', level: 'ace', createdAt: '2025-03-02 10:00', status: 'normal' }
])

const mockUsers = computed(() =>
  mockUsersAll.value.filter((u) => u.role === role.value)
)

function levelLabel(level: WorkerLevelId) {
  return workerLevels.find((l) => l.id === level)?.label ?? level
}

function openLevelModal(u: WorkerUser) {
  editingWorker.value = u
  pendingLevel.value = u.level
  showLevelModal.value = true
}

function closeLevelModal() {
  showLevelModal.value = false
  editingWorker.value = null
  pendingLevel.value = null
}

function setWorkerLevel(lev: WorkerLevelId) {
  pendingLevel.value = lev
}

function confirmLevel() {
  if (editingWorker.value && pendingLevel.value !== null) {
    const user = mockUsersAll.value.find((u) => u.role === 'worker' && u.id === editingWorker.value!.id) as WorkerUser
    if (user) user.level = pendingLevel.value
  }
  closeLevelModal()
}

function saveProtection() {
  // TODO: 调用后端接口保存各级别保护期（protectionByLevel），接单大厅按打手级别与对应保护期延迟展示新单
  showProtectionModal.value = false
}
</script>

<style scoped>
.admin-page {
  max-width: 1200px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.page-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
}

.header-tabs {
  display: flex;
  gap: 4px;
}

.tab {
  padding: 6px 14px;
  font-size: 13px;
  color: #64748b;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
}

.tab.active {
  color: #fff;
  background: #1e293b;
  border-color: #1e293b;
}

.toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.search-input {
  width: 240px;
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.btn-primary {
  padding: 8px 16px;
  font-size: 13px;
  color: #fff;
  background: #1e293b;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-secondary {
  padding: 8px 16px;
  font-size: 13px;
  color: #374151;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
}

.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.modal-wide {
  max-width: 480px;
}

.protection-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.protection-label {
  flex: 0 0 72px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.form-row.inline {
  flex: 1;
  margin-bottom: 0;
  min-width: 0;
}

.level-options {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.level-btn {
  flex: 1;
  padding: 10px 14px;
  font-size: 13px;
  color: #64748b;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
}

.level-btn.active {
  color: #fff;
  background: #1e293b;
  border-color: #1e293b;
}

.level-tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.level-tag.silver {
  background: #e2e8f0;
  color: #475569;
}

.level-tag.gold {
  background: #fef3c7;
  color: #b45309;
}

.level-tag.ace {
  background: #fce7f3;
  color: #9d174d;
}

.modal-title {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
}

.modal-desc {
  margin: 0 0 16px;
  font-size: 13px;
  color: #64748b;
}

.form-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.form-row .form-group {
  margin-bottom: 0;
}

.form-group.flex {
  flex: 1;
  min-width: 0;
}

.form-group {
  margin-bottom: 16px;
}

.form-group .form-label {
  margin-bottom: 6px;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.form-input {
  width: 100%;
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.form-select {
  min-width: 100px;
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.panel {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
}

.table-wrap {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.data-table th,
.data-table td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.data-table th {
  font-weight: 600;
  color: #374151;
  background: #f8fafc;
}

.data-table tbody tr:hover {
  background: #f8fafc;
}

.status-tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-tag.normal {
  background: #dcfce7;
  color: #166534;
}

.status-tag.banned {
  background: #fee2e2;
  color: #991b1b;
}

.btn-link {
  padding: 0 4px;
  font-size: 13px;
  color: #3b82f6;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 8px;
}

.btn-link:hover {
  text-decoration: underline;
}
</style>
