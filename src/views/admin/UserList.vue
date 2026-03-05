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
    <div v-if="showProtectionModal" class="modal-mask" @click.self="showProtectionModal = false">
      <div class="modal">
        <h3 class="modal-title">设置保护期时间</h3>
        <p class="modal-desc">
          老板下单后，<strong>金牌打手</strong>可立即在接单大厅看到该单；<strong>普通打手</strong>需过了保护期时间后才能看到。
        </p>
        <div class="form-row">
          <div class="form-group flex">
            <label class="form-label">保护期数值</label>
            <input
              v-model.number="protectionValue"
              type="number"
              min="0"
              class="form-input"
              placeholder="例如 30"
            />
          </div>
          <div class="form-group">
            <label class="form-label">单位</label>
            <select v-model="protectionUnit" class="form-select">
              <option value="second">秒</option>
              <option value="minute">分钟</option>
              <option value="hour">小时</option>
            </select>
          </div>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="showProtectionModal = false">取消</button>
          <button type="button" class="btn-primary" @click="saveProtection">确定</button>
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
              <td>{{ u.createdAt }}</td>
              <td>
                <span :class="['status-tag', u.status]">{{ u.status === 'normal' ? '正常' : '已封禁' }}</span>
              </td>
              <td>
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
import { ref, computed } from 'vue'

const role = ref<'boss' | 'worker'>('boss')
const keyword = ref('')
const showProtectionModal = ref(false)
const protectionValue = ref<number>(0)
const protectionUnit = ref<'second' | 'minute' | 'hour'>('second')

const mockUsersAll = ref([
  { id: '10001', nickname: '老板小明', role: 'boss' as const, createdAt: '2025-02-20 14:32', status: 'normal' as const },
  { id: '10002', nickname: '打手阿强', role: 'worker' as const, createdAt: '2025-02-21 09:15', status: 'normal' as const },
  { id: '10003', nickname: '氪金玩家', role: 'boss' as const, createdAt: '2025-02-22 18:00', status: 'normal' as const },
  { id: '10004', nickname: '接单达人', role: 'worker' as const, createdAt: '2025-02-23 11:20', status: 'banned' as const },
  { id: '10005', nickname: '新手老板', role: 'boss' as const, createdAt: '2025-03-01 08:45', status: 'normal' as const }
])

const mockUsers = computed(() =>
  mockUsersAll.value.filter((u) => u.role === role.value)
)

function saveProtection() {
  // TODO: 调用后端接口保存保护期（数值 + 单位：秒/分钟/小时），接单大厅按此延迟对普通打手展示新单
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
