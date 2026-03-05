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
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>申请单号</th>
              <th>打手 ID</th>
              <th>昵称</th>
              <th>提现金额</th>
              <th>状态</th>
              <th>申请时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="w in mockWithdraws" :key="w.id">
              <td>{{ w.id }}</td>
              <td>{{ w.workerId }}</td>
              <td>{{ w.nickname }}</td>
              <td>¥{{ w.amount }}</td>
              <td>
                <span :class="['status-tag', w.status]">{{ withdrawStatusText[w.status] }}</span>
              </td>
              <td>{{ w.createdAt }}</td>
              <td>
                <button v-if="w.status === 'pending'" type="button" class="btn-link">标记已转账</button>
                <button type="button" class="btn-link">备注</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const status = ref('')

const withdrawStatusText: Record<string, string> = {
  pending: '待处理',
  paid: '已线下转账',
  rejected: '已驳回'
}

const mockWithdraws = ref([
  { id: 'WD202503050001', workerId: '10002', nickname: '打手阿强', amount: '120.00', status: 'pending', createdAt: '2025-03-05 08:30' },
  { id: 'WD202503040002', workerId: '10004', nickname: '接单达人', amount: '80.00', status: 'paid', createdAt: '2025-03-04 16:20' },
  { id: 'WD202503040003', workerId: '10002', nickname: '打手阿强', amount: '200.00', status: 'paid', createdAt: '2025-03-04 10:15' },
  { id: 'WD202503030004', workerId: '10006', nickname: '兼职打手', amount: '50.00', status: 'rejected', createdAt: '2025-03-03 20:00' }
])
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

.status-tag.pending { background: #fef3c7; color: #92400e; }
.status-tag.paid { background: #dcfce7; color: #166534; }
.status-tag.rejected { background: #fee2e2; color: #991b1b; }

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
