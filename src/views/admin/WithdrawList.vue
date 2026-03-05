<template>
  <div class="admin-page">
    <div class="page-header">
      <h2 class="page-title">提现管理</h2>
    </div>
    <p class="page-desc">打手提现在线下通过运营微信转账完成，此处用于记录「待处理 / 已线下转账」状态。</p>
    <div class="toolbar">
      <select v-model="status" class="select">
        <option value="">全部状态</option>
        <option value="pending">待处理</option>
        <option value="paid">已线下转账</option>
        <option value="rejected">已驳回</option>
      </select>
      <button type="button" class="btn-primary">查询</button>
    </div>
    <section class="panel">
      <div class="panel-empty">对接后端后展示提现申请列表（标记已线下转账、填写流水/备注）</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const status = ref('')
</script>

<style scoped>
.admin-page {
  max-width: 1200px;
}

.page-header {
  margin-bottom: 8px;
}

.page-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
}

.page-desc {
  margin: 0 0 16px;
  font-size: 13px;
  color: #64748b;
}

.toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
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
