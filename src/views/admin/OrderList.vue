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
              <td class="col-goods">
                <img :src="o.goodsCover" :alt="o.goodsName" class="goods-thumb" />
                <span>{{ o.goodsName }}</span>
              </td>
              <td>¥{{ o.amount }}</td>
              <td>
                <span :class="['status-tag', o.status]">{{ orderStatusText[o.status] }}</span>
              </td>
              <td>{{ o.createdAt }}</td>
              <td>
                <button type="button" class="btn-link" @click="openDetail(o)">详情</button>
                <button
                  v-if="o.status !== 'finished' && o.status !== 'cancelled'"
                  type="button"
                  class="btn-link"
                  @click="changeToFinished(o)"
                >
                  改为已结束
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div v-if="detailOrder" class="modal-mask" @click.self="detailOrder = null">
      <div class="detail-modal">
        <div class="detail-title">商品详情</div>
        <div class="detail-body">
          <img :src="detailOrder.goodsCover" :alt="detailOrder.goodsName" class="detail-cover" />
          <div class="detail-row"><span class="detail-label">商品名称</span>{{ detailOrder.goodsName }}</div>
          <div class="detail-row"><span class="detail-label">订单金额</span>¥{{ detailOrder.amount }}</div>
          <div class="detail-row"><span class="detail-label">订单号</span>{{ detailOrder.orderNo }}</div>
          <div class="detail-row"><span class="detail-label">下单时间</span>{{ detailOrder.createdAt }}</div>
        </div>
        <div class="detail-actions">
          <button type="button" class="btn-secondary" @click="detailOrder = null">关闭</button>
        </div>
      </div>
    </div>
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
  finished: '已结束',
  cancelled: '已取消',
  unassigned: '未派单'
}

type OrderRow = {
  orderNo: string
  userId: string
  userName: string
  goodsName: string
  goodsCover: string
  amount: string
  status: string
  createdAt: string
}

const mockOrders = ref<OrderRow[]>([
  { orderNo: 'ORD202503050001', userId: '10001', userName: '老板小明', goodsName: '春服护航 1小时', goodsCover: '/goods-1.png', amount: '38.00', status: 'finished', createdAt: '2025-03-04 10:20' },
  { orderNo: 'ORD202503050002', userId: '10003', userName: '氪金玩家', goodsName: '跑刀代打', goodsCover: '/goods-2.png', amount: '25.00', status: 'ongoing', createdAt: '2025-03-05 09:15' },
  { orderNo: 'ORD202503040003', userId: '10005', userName: '新手老板', goodsName: '33 上分', goodsCover: '/goods-1.png', amount: '88.00', status: 'pending_accept', createdAt: '2025-03-04 18:30' },
  { orderNo: 'ORD202503040004', userId: '10001', userName: '老板小明', goodsName: '代肝周常', goodsCover: '/goods-2.png', amount: '50.00', status: 'pending_confirm', createdAt: '2025-03-04 14:00' },
  { orderNo: 'ORD202503030005', userId: '10003', userName: '氪金玩家', goodsName: '春服护航 3小时', goodsCover: '/goods-1.png', amount: '98.00', status: 'unassigned', createdAt: '2025-03-03 16:22' }
])

const detailOrder = ref<OrderRow | null>(null)

function openDetail(o: OrderRow) {
  detailOrder.value = o
}

function changeToFinished(row: OrderRow) {
  const target = mockOrders.value.find((item) => item.orderNo === row.orderNo)
  if (target) {
    target.status = 'finished'
  }
}
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
.status-tag.unassigned { background: #fee2e2; color: #b91c1c; }

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

.col-goods {
  display: flex;
  align-items: center;
  gap: 10px;
}

.goods-thumb {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.detail-modal {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.15);
}

.detail-title {
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 16px;
}

.detail-cover {
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  margin-bottom: 12px;
}

.detail-body {
  margin-bottom: 16px;
}

.detail-row {
  font-size: 13px;
  color: #374151;
  margin-bottom: 8px;
}

.detail-label {
  display: inline-block;
  width: 72px;
  color: #64748b;
}

.detail-actions {
  display: flex;
  justify-content: flex-end;
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
</style>
