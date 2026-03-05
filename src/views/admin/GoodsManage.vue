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
      <div class="panel-empty">对接后端后展示商品列表（增删改、上下架、排序）</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('')
const category = ref('')
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

.panel-empty {
  padding: 40px;
  text-align: center;
  font-size: 13px;
  color: #94a3b8;
}
</style>
