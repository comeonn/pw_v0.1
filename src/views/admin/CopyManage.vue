<template>
  <div class="admin-page">
    <div class="page-header">
      <h2 class="page-title">文案管理</h2>
    </div>
    <p class="page-desc">配置前端展示的公告、客服微信号等文案，对接后端后在此编辑并发布。</p>
    <section class="panel">
      <div class="copy-item">
        <label class="copy-label">首页公告</label>
        <textarea
          v-model="notice"
          class="copy-input"
          rows="2"
          placeholder="例如：如果打开客服页不好联系请客免单！…"
        />
      </div>
      <div class="copy-item">
        <label class="copy-label">客服微信号</label>
        <input
          v-model="wechatId"
          type="text"
          class="copy-input single"
          placeholder="例如：game-helper-001"
        />
      </div>
      <div class="copy-item">
        <label class="copy-label">打手端提现说明</label>
        <textarea
          v-model="withdrawTip"
          class="copy-input"
          rows="3"
          placeholder="当前版本提现需添加客服微信…"
        />
      </div>
      <div class="copy-actions">
        <button type="button" class="btn-primary">保存</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const notice = ref('')
const wechatId = ref('')
const withdrawTip = ref('')
</script>

<style scoped>
.admin-page {
  max-width: 720px;
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
  margin: 0 0 20px;
  font-size: 13px;
  color: #64748b;
}

.panel {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
}

.copy-item {
  margin-bottom: 20px;
}

.copy-item:last-of-type {
  margin-bottom: 0;
}

.copy-label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.copy-input {
  width: 100%;
  padding: 10px 12px;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  resize: vertical;
  font-family: inherit;
}

.copy-input.single {
  max-width: 280px;
}

.copy-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.copy-actions {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.btn-primary {
  padding: 8px 20px;
  font-size: 13px;
  color: #fff;
  background: #1e293b;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
