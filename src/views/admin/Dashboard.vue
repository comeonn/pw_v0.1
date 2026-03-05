<template>
  <div class="admin-page">
    <div class="page-header">
      <h2 class="page-title">概览</h2>
    </div>
    <div class="stat-cards">
      <div class="stat-card">
        <div class="stat-label">今日订单</div>
        <div class="stat-value">--</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">今日 GMV（元）</div>
        <div class="stat-value">--</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">打手数</div>
        <div class="stat-value">--</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">老板数</div>
        <div class="stat-value">--</div>
      </div>
    </div>
    <section class="panel">
      <h3 class="panel-title">最近订单</h3>
      <div class="panel-empty">对接后端后展示最近 10 条订单流水</div>
    </section>
  </div>
</template>

<script setup lang="ts">
// TODO: 请求概览接口，展示今日订单/GMV/用户数、最近订单列表
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

.stat-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  padding: 16px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.stat-label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 20px;
  font-weight: 600;
  color: #0f172a;
}

.panel {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
}

.panel-title {
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
}

.panel-empty {
  padding: 24px;
  text-align: center;
  font-size: 13px;
  color: #94a3b8;
}
</style>
