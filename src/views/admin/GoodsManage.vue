<template>
  <div class="admin-page">
    <div class="page-header">
      <h2 class="page-title">商品管理</h2>
      <button type="button" class="btn-primary">新增商品</button>
    </div>
    <div class="toolbar">
      <input
        v-model="keyword"
        type="text"
        class="search-input"
        placeholder="商品名称 / ID"
      />
      <select v-model="category" class="select">
        <option value="">全部分类</option>
        <option value="escort">护航</option>
        <option value="loot">跑刀</option>
        <option value="33">33</option>
        <option value="grind">代肝</option>
      </select>
      <button type="button" class="btn-secondary">查询</button>
    </div>
    <section class="panel">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>商品 ID</th>
              <th>名称</th>
              <th>分类</th>
              <th>老板价格</th>
              <th>打手金额</th>
              <th>销量</th>
              <th>状态</th>
              <th>排序</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in mockGoods" :key="g.id">
              <td>{{ g.id }}</td>
              <td>{{ g.name }}</td>
              <td>{{ categoryText[g.category] }}</td>
              <td>¥{{ g.bossPrice }}</td>
              <td>¥{{ g.workerAmount }}</td>
              <td>{{ g.sales }}</td>
              <td>
                <span :class="['status-tag', g.status]">{{ g.status === 'on' ? '上架' : '下架' }}</span>
              </td>
              <td>{{ g.sort }}</td>
              <td>
                <button type="button" class="btn-link">编辑</button>
                <button type="button" class="btn-link">{{ g.status === 'on' ? '下架' : '上架' }}</button>
                <button type="button" class="btn-link danger">删除</button>
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
const category = ref('')

const categoryText: Record<string, string> = {
  escort: '护航',
  loot: '跑刀',
  '33': '33',
  grind: '代肝'
}

const mockGoods = ref([
  { id: 'G001', name: '春服护航 1小时', category: 'escort', bossPrice: '38.00', workerAmount: '28.00', sales: 256, status: 'on' as const, sort: 1 },
  { id: 'G002', name: '春服护航 3小时', category: 'escort', bossPrice: '98.00', workerAmount: '72.00', sales: 128, status: 'on' as const, sort: 2 },
  { id: 'G003', name: '跑刀代打', category: 'loot', bossPrice: '25.00', workerAmount: '18.00', sales: 89, status: 'on' as const, sort: 3 },
  { id: 'G004', name: '33 上分', category: '33', bossPrice: '88.00', workerAmount: '65.00', sales: 312, status: 'on' as const, sort: 4 },
  { id: 'G005', name: '代肝周常', category: 'grind', bossPrice: '50.00', workerAmount: '38.00', sales: 67, status: 'off' as const, sort: 5 }
])
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

.btn-primary {
  padding: 8px 16px;
  font-size: 13px;
  color: #fff;
  background: #1e293b;
  border: none;
  border-radius: 6px;
  cursor: pointer;
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

.btn-secondary {
  padding: 8px 16px;
  font-size: 13px;
  color: #374151;
  background: #fff;
  border: 1px solid #e5e7eb;
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

.status-tag.on { background: #dcfce7; color: #166534; }
.status-tag.off { background: #f1f5f9; color: #64748b; }

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

.btn-link.danger:hover {
  color: #dc2626;
}
</style>
