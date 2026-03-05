<template>
  <div class="admin-page">
    <div class="page-header">
      <h2 class="page-title">订单管理</h2>
    </div>
    <div class="toolbar">
      <input
        v-model="keyword"
        type="text"
        class="search-input"
        placeholder="订单号 / 用户 ID"
      />
      <select v-model="status" class="select">
        <option value="">全部状态</option>
        <option value="pending_pay">待支付</option>
        <option value="pending_accept">待接单</option>
        <option value="ongoing">进行中</option>
        <option value="pending_confirm">待确认</option>
        <option value="finished">已完成</option>
        <option value="cancelled">已取消</option>
      </select>
      <button type="button" class="btn-primary">查询</button>
    </div>
    <section class="panel">
      <div class="panel-empty">对接后端后展示订单列表（支持筛选、状态修改、备注）</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('')
const status = ref('')
</script>

<style scoped>
.admin-page {
  max-width: 1200px;
}

.page-header {
  margin-bottom: 20px;
}

.page-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
}

.toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.search-input {
  width: 200px;
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.select {
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
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
