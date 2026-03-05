<template>
  <div class="admin-page">
    <div class="page-header">
      <h2 class="page-title">文案管理</h2>
    </div>
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
        <label class="copy-label">客服微信号图片</label>
        <div class="wechat-upload">
          <input
            ref="wechatFileInput"
            type="file"
            accept="image/*"
            class="wechat-file-input"
            @change="onWechatImageChange"
          />
          <div v-if="wechatImageUrl" class="wechat-preview">
            <img :src="wechatImageUrl" alt="客服微信号" class="wechat-preview-img" />
            <button type="button" class="wechat-remove" @click="removeWechatImage">移除</button>
          </div>
          <div v-else class="wechat-placeholder" @click="triggerWechatUpload">
            <span class="wechat-placeholder-text">点击上传客服微信号二维码/图片</span>
          </div>
        </div>
      </div>
      <div class="copy-actions">
        <button type="button" class="btn-primary">保存</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟数据
const notice = ref('如果打手服务不好联系客服免单!如果打手有私加直接联系客服举报有奖!有问题加客服微信。')
const wechatId = ref('game-helper-001')
const wechatImageUrl = ref<string>('')
const wechatFileInput = ref<HTMLInputElement | null>(null)

function triggerWechatUpload() {
  wechatFileInput.value?.click()
}

function onWechatImageChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file && file.type.startsWith('image/')) {
    wechatImageUrl.value = URL.createObjectURL(file)
  }
  target.value = ''
}

function removeWechatImage() {
  if (wechatImageUrl.value) URL.revokeObjectURL(wechatImageUrl.value)
  wechatImageUrl.value = ''
}
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

.wechat-upload {
  position: relative;
}

.wechat-file-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}

.wechat-placeholder {
  width: 160px;
  height: 160px;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #f8fafc;
  transition: border-color 0.2s, background 0.2s;
}

.wechat-placeholder:hover {
  border-color: #3b82f6;
  background: #eff6ff;
}

.wechat-placeholder-text {
  font-size: 12px;
  color: #64748b;
  text-align: center;
  padding: 8px;
}

.wechat-preview {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.wechat-preview-img {
  width: 160px;
  height: 160px;
  object-fit: contain;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.wechat-remove {
  padding: 4px 12px;
  font-size: 12px;
  color: #64748b;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  cursor: pointer;
}

.wechat-remove:hover {
  color: #dc2626;
  border-color: #fca5a5;
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
