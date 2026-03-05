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
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>订单号</th>
              <th>用户</th>
              <th>商品</th>
              <th>金额</th>
              <th>状态</th>
              <th>下单时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="o in mockOrders" :key="o.orderNo">
              <td>{{ o.orderNo }}</td>
              <td>{{ o.userName }} ({{ o.userId }})</td>
              <td>{{ o.goodsName }}</td>
              <td>¥{{ o.amount }}</td>
              <td>
                <span :class="['status-tag', o.status]">{{ orderStatusText[o.status] }}</span>
              </td>
              <td>{{ o.createdAt }}</td>
              <td>
                <button type="button" class="btn-link">备注</button>
                <button type="button" class="btn-link">改状态</button>
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

const keyword = ref('')
const status = ref('')

const orderStatusText: Record<string, string> = {
  pending_pay: '待支付',
  pending_accept: '待接单',
  ongoing: '进行中',
  pending_confirm: '待确认',
  finished: '已完成',
  cancelled: '已取消'
}

const mockOrders = ref([
  { orderNo: 'ORD202503050001', userId: '10001', userName: '老板小明', goodsName: '春服护航 1小时', amount: '38.00', status: 'finished', createdAt: '2025-03-04 10:20' },
  { orderNo: 'ORD202503050002', userId: '10003', userName: '氪金玩家', goodsName: '跑刀代打', amount: '25.00', status: 'ongoing', createdAt: '2025-03-05 09:15' },
  { orderNo: 'ORD202503040003', userId: '10005', userName: '新手老板', goodsName: '33 上分', amount: '88.00', status: 'pending_accept', createdAt: '2025-03-04 18:30' },
  { orderNo: 'ORD202503040004', userId: '10001', userName: '老板小明', goodsName: '代肝周常', amount: '50.00', status: 'pending_confirm', createdAt: '2025-03-04 14:00' },
  { orderNo: 'ORD202503030005', userId: '10003', userName: '氪金玩家', goodsName: '春服护航 3小时', amount: '98.00', status: 'cancelled', createdAt: '2025-03-03 16:22' }
])
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

.status-tag.pending_pay { background: #fef3c7; color: #92400e; }
.status-tag.pending_accept { background: #dbeafe; color: #1e40af; }
.status-tag.ongoing { background: #e0e7ff; color: #3730a3; }
.status-tag.pending_confirm { background: #fce7f3; color: #9d174d; }
.status-tag.finished { background: #dcfce7; color: #166534; }
.status-tag.cancelled { background: #f1f5f9; color: #64748b; }

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
