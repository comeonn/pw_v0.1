<template>
  <div class="admin-page">
    <div class="page-header">
      <h2 class="page-title">抽奖管理</h2>
    </div>
    <section class="panel">
      <div class="form-item">
        <label class="form-label">
          <input v-model="enabled" type="checkbox" class="form-checkbox" />
          开启老板端付费抽奖
        </label>
        <p class="form-hint">关闭后，老板端抽奖入口不展示或不可参与。</p>
      </div>
      <div class="form-item">
        <label class="form-label">抽奖单价（元）</label>
        <input
          v-model.number="price"
          type="number"
          min="0"
          step="0.01"
          class="form-input num"
          placeholder="例如 9.9"
        />
        <p class="form-hint">老板支付该金额可抽一次。</p>
      </div>

      <div class="form-item prizes-section">
        <label class="form-label">奖品设置</label>
        <p class="form-hint">选择参与抽奖的商品及数量，并设置每个奖品的抽中概率（总概率建议为 100%）。</p>
        <div class="prizes-table-wrap">
          <table class="prizes-table">
            <thead>
              <tr>
                <th>商品</th>
                <th>数量</th>
                <th>抽中概率（%）</th>
                <th class="col-action">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, index) in prizes" :key="p.id">
                <td>
                  <select v-model="p.goodsId" class="form-select goods-select">
                    <option value="">请选择商品</option>
                    <option
                      v-for="g in availableGoods"
                      :key="g.id"
                      :value="g.id"
                    >
                      {{ g.name }}（¥{{ g.bossPrice }}）
                    </option>
                  </select>
                </td>
                <td>
                  <input
                    v-model.number="p.quantity"
                    type="number"
                    min="1"
                    class="form-input qty-input"
                  />
                </td>
                <td>
                  <input
                    v-model.number="p.probability"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    class="form-input prob-input"
                    placeholder="0"
                  />
                </td>
                <td class="col-action">
                  <button
                    type="button"
                    class="btn-link danger"
                    @click="removePrize(index)"
                  >
                    删除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="prizes-footer">
          <span :class="['prob-total', totalProbability !== 100 && 'warn']">
            当前概率合计：{{ totalProbability }}%
          </span>
          <button type="button" class="btn-secondary" @click="addPrize">
            添加奖品
          </button>
        </div>
      </div>

      <div class="form-item">
        <label class="form-label">活动商品名称</label>
        <input
          v-model="productName"
          type="text"
          class="form-input"
          placeholder="例如：春服护航 1 单"
        />
        <p class="form-hint">用于抽奖页展示的标题，可与实际奖品不同。</p>
      </div>
      <div class="form-item">
        <label class="form-label">活动商品封面图</label>
        <div class="cover-upload">
          <input
            ref="coverFileInput"
            type="file"
            accept="image/*"
            class="cover-file-input"
            @change="onCoverChange"
          />
          <div v-if="coverUrl" class="cover-preview">
            <img :src="coverUrl" alt="封面" class="cover-img" />
            <button type="button" class="cover-remove" @click="removeCover">移除</button>
          </div>
          <div v-else class="cover-placeholder" @click="triggerCoverUpload">
            点击上传封面图
          </div>
        </div>
      </div>
      <div class="form-item">
        <label class="form-label">规则说明</label>
        <textarea
          v-model="ruleText"
          class="form-input textarea"
          rows="3"
          placeholder="例如：本期活动商品由管理员设置，支付后必得 1 单。不限制抽奖次数。"
        />
      </div>
      <div class="form-actions">
        <button type="button" class="btn-primary">保存</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const coverFileInput = ref<HTMLInputElement | null>(null)

// 可选商品列表（与商品管理一致，对接后端时改为接口拉取）
const availableGoods = ref([
  { id: 'G001', name: '春服护航 1小时', bossPrice: '38.00' },
  { id: 'G002', name: '春服护航 3小时', bossPrice: '98.00' },
  { id: 'G003', name: '跑刀代打', bossPrice: '25.00' },
  { id: 'G004', name: '33 上分', bossPrice: '88.00' },
  { id: 'G005', name: '代肝周常', bossPrice: '50.00' }
])

interface PrizeItem {
  id: string
  goodsId: string
  quantity: number
  probability: number
}

let prizeIdCounter = 0
function nextPrizeId() {
  return `prize_${++prizeIdCounter}`
}

// 模拟数据：老板端付费抽奖配置
const enabled = ref(true)
const price = ref(9.9)
const productName = ref('春服护航 1 单')
const coverUrl = ref<string>('')
const ruleText = ref('本期活动商品由管理员设置，支付后必得 1 单。不限制抽奖次数。')

const prizes = ref<PrizeItem[]>([
  { id: nextPrizeId(), goodsId: 'G001', quantity: 1, probability: 50 },
  { id: nextPrizeId(), goodsId: 'G001', quantity: 2, probability: 30 },
  { id: nextPrizeId(), goodsId: 'G001', quantity: 3, probability: 20 }
])

const totalProbability = computed(() => {
  const sum = prizes.value.reduce((s, p) => s + (Number(p.probability) || 0), 0)
  return Math.round(sum * 10) / 10
})

function addPrize() {
  prizes.value.push({
    id: nextPrizeId(),
    goodsId: '',
    quantity: 1,
    probability: 0
  })
}

function removePrize(index: number) {
  prizes.value.splice(index, 1)
}

function triggerCoverUpload() {
  coverFileInput.value?.click()
}

function onCoverChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file && file.type.startsWith('image/')) {
    coverUrl.value = URL.createObjectURL(file)
  }
  target.value = ''
}

function removeCover() {
  if (coverUrl.value) URL.revokeObjectURL(coverUrl.value)
  coverUrl.value = ''
}
</script>

<style scoped>
.admin-page {
  max-width: 640px;
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

.form-item {
  margin-bottom: 20px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.form-checkbox {
  width: 16px;
  height: 16px;
}

.form-hint {
  margin: 6px 0 0;
  font-size: 12px;
  color: #64748b;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-family: inherit;
}

.form-input.num {
  max-width: 120px;
}

.form-input.textarea {
  resize: vertical;
}

.cover-upload {
  position: relative;
}

.cover-file-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}

.cover-placeholder {
  width: 120px;
  height: 120px;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #64748b;
  background: #f8fafc;
  cursor: pointer;
}

.cover-placeholder:hover {
  border-color: #3b82f6;
  background: #eff6ff;
}

.cover-preview {
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
}

.cover-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.cover-remove {
  padding: 4px 12px;
  font-size: 12px;
  color: #64748b;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;
}

.cover-remove:hover {
  color: #dc2626;
  border-color: #fca5a5;
}

.prizes-section .form-label {
  display: block;
}

.prizes-table-wrap {
  overflow-x: auto;
  margin-top: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.prizes-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.prizes-table th,
.prizes-table td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: middle;
}

.prizes-table th {
  font-weight: 600;
  color: #374151;
  background: #f8fafc;
}

.prizes-table th.col-action,
.prizes-table td.col-action {
  width: 80px;
  text-align: center;
}

.prizes-table tbody tr:last-child td {
  border-bottom: none;
}

.goods-select {
  min-width: 180px;
  padding: 8px 10px;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
}

.qty-input,
.prob-input {
  width: 80px;
  padding: 8px 10px;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.prizes-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
}

.prob-total {
  font-size: 13px;
  color: #64748b;
}

.prob-total.warn {
  color: #d97706;
  font-weight: 500;
}

.btn-secondary {
  padding: 6px 14px;
  font-size: 13px;
  color: #374151;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.btn-link {
  padding: 0;
  font-size: 13px;
  color: #3b82f6;
  background: none;
  border: none;
  cursor: pointer;
}

.btn-link:hover {
  text-decoration: underline;
}

.btn-link.danger {
  color: #dc2626;
}

.btn-link.danger:hover {
  color: #b91c1c;
}

.form-actions {
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
