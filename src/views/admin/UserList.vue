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
    </div>
    <section class="panel">
      <div class="panel-empty">对接后端后展示用户列表（支持搜索、封禁/解封、查看详情）</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const role = ref<'boss' | 'worker'>('boss')
const keyword = ref('')
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

.panel {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
}

.panel-empty {
  padding: 40px;
  text-align: center;
  font-size: 13px;
  color: #94a3b8;
}
</style>
