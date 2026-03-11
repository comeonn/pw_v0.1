<template>
  <div class="page">
    <header class="header">
      <button class="back-btn" type="button" @click="router.back()">←</button>
      <div class="header-title">商品详情</div>
      <div class="header-spacer"></div>
    </header>

    <main class="content" v-if="goods">
      <section class="gallery">
        <div class="gallery-track">
          <div v-for="(img, idx) in goods.images" :key="idx" class="gallery-item">
            <img :src="img" :alt="goods.title" />
          </div>
        </div>
      </section>

      <section class="card">
        <div class="title-row">
          <div class="goods-title">{{ goods.title }}</div>
        </div>
        <div class="intro">{{ goods.intro }}</div>
        <div v-if="goods.detail" class="detail-block">
          <div class="detail-title">商品详情介绍</div>
          <div class="detail-content">{{ goods.detail }}</div>
        </div>

        <div class="price-row">
          <span class="price">￥{{ goods.price }}</span>
          <span class="sales">已售 {{ goods.sales }}</span>
        </div>
      </section>
    </main>

    <main class="content" v-else>
      <section class="empty">
        <div class="empty-title">商品不存在</div>
        <div class="empty-sub">返回看看其他商品</div>
      </section>
    </main>

    <footer class="footer" v-if="goods">
      <div class="footer-price">
        <div class="footer-price-label">到手价</div>
        <div class="footer-price-value">￥{{ goods.price }}</div>
      </div>
      <button class="buy-btn" type="button" @click="openOrderForm">
        立即下单
      </button>
    </footer>

    <Teleport to="body">
      <div
        v-if="showOrderForm && goods"
        class="order-mask"
        @click.self="closeOrderForm"
      >
        <div class="order-modal">
          <div class="order-title">填写下单信息</div>
          <div class="order-sub">
            商品：{{ goods.title }}（<span class="required-mark">*</span>￥{{ goods.price }}）
          </div>
          <div class="order-form">
            <label class="order-label">
              游戏类型
              <div class="order-radio-row">
                <label class="order-radio">
                  <input v-model="formGameType" type="radio" value="端游" />
                  <span>端游</span>
                </label>
                <label class="order-radio">
                  <input v-model="formGameType" type="radio" value="手游" />
                  <span>手游</span>
                </label>
              </div>
            </label>
            <label class="order-label">
              <div class="label-row">
                手机号<span class="required-text">(必填)</span>
              </div>
              <input
                v-model="formPhone"
                type="tel"
                class="order-input"
                placeholder="请输入联系手机号"
              />
            </label>
            <label class="order-label">
              <div class="id-note">游戏ID和数字ID其中之一必填</div>
              游戏 ID
              <input
                v-model="formGameId"
                type="text"
                class="order-input"
                placeholder="请输入游戏内 ID"
              />
            </label>
            <label class="order-label">
              数字 ID
              <input
                v-model="formNumericId"
                type="text"
                class="order-input"
                placeholder="请输入数字 ID"
              />
            </label>
            <label class="order-label">
              备注
              <textarea
                v-model="formRemark"
                class="order-input textarea"
                rows="3"
                placeholder="可填写上号时间、特殊要求等"
              />
            </label>
          </div>
          <div class="order-actions">
            <button type="button" class="order-btn secondary" @click="closeOrderForm">
              取消
            </button>
            <button type="button" class="order-btn primary" @click="submitOrder">
              确认下单
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getGoodsById } from '../mock/goods'

const route = useRoute()
const router = useRouter()

const goods = computed(() => {
  const raw = route.params.id
  const id = typeof raw === 'string' ? Number.parseInt(raw, 10) : NaN
  if (!Number.isFinite(id)) return undefined
  return getGoodsById(id)
})

const showOrderForm = ref(false)
const formGameType = ref<'手游' | '端游'>('端游')
const formPhone = ref('')
const formGameId = ref('')
const formNumericId = ref('')
const formRemark = ref('')

function openOrderForm() {
  showOrderForm.value = true
  formGameType.value = '端游'
  formPhone.value = ''
  formGameId.value = ''
  formNumericId.value = ''
  formRemark.value = ''
}

function closeOrderForm() {
  showOrderForm.value = false
}

function submitOrder() {
  const hasAnyId = !!formGameId.value || !!formNumericId.value
  if (!formPhone.value || !hasAnyId) {
    alert('请填写手机号，并且游戏 ID/数字 ID 至少填一个')
    return
  }
  // TODO: 调用后端创建订单
  alert('已提交下单信息（示例），后续对接后端接口生效')
  showOrderForm.value = false
  router.push({ name: 'BossUnassignedOrders', query: { tab: 'toDispatch' } })
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f2f3f7;
  padding-bottom: 76px;
  box-sizing: border-box;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: #ffffff;
  border-bottom: 1px solid #eef2f7;
}

.back-btn {
  border: none;
  background: #f8fafc;
  border-radius: 999px;
  padding: 8px 10px;
  font-size: 14px;
  cursor: pointer;
}

.header-title {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

.header-spacer {
  width: 44px;
}

.content {
  padding: 12px 12px 18px;
}

.gallery {
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #eef2f7;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  margin-bottom: 12px;
}

.gallery-track {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.gallery-item {
  flex: 0 0 100%;
  scroll-snap-align: start;
  height: 260px;
  background: #0f172a;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card {
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #eef2f7;
  padding: 14px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.goods-title {
  font-size: 16px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.3;
}

.intro {
  margin-top: 8px;
  font-size: 13px;
  color: #475569;
  line-height: 1.5;
}

.detail-block {
  margin-top: 10px;
  padding: 10px 10px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
}

.detail-title {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 6px;
}

.detail-content {
  font-size: 13px;
  color: #334155;
  line-height: 1.6;
  white-space: pre-wrap;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 12px;
}

.price {
  font-size: 18px;
  font-weight: 900;
  color: #ff4d4f;
}

.sales {
  margin-left: auto;
  font-size: 12px;
  color: #94a3b8;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 64px;
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  padding: 10px 12px;
  gap: 10px;
  box-sizing: border-box;
}

.footer-price {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.footer-price-label {
  font-size: 11px;
  color: #94a3b8;
}

.footer-price-value {
  font-size: 18px;
  font-weight: 900;
  color: #ff4d4f;
}

.buy-btn {
  flex: 0 0 auto;
  padding: 12px 18px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #ff4d4f, #ff7a45);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(255, 77, 79, 0.28);
}

.empty {
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #eef2f7;
  padding: 22px 14px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.empty-title {
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 6px;
}

.empty-sub {
  font-size: 12px;
  color: #94a3b8;
}

.order-mask {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.order-modal {
  width: 100%;
  max-width: 360px;
  background: #ffffff;
  border-radius: 16px;
  padding: 18px 16px 14px;
  box-shadow:
    0 18px 40px rgba(15, 23, 42, 0.15),
    0 0 0 1px rgba(15, 23, 42, 0.04);
}

.order-title {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
}

.order-sub {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 10px;
}

.required-mark {
  color: #ef4444;
  font-weight: 700;
}

.required-text {
  color: #ef4444;
  font-weight: 600;
  margin-left: 4px;
}

.label-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.id-note {
  font-size: 11px;
  color: #ef4444;
  line-height: 1.2;
}

.order-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 12px;
}

.order-label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #4b5563;
}

.order-input {
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 13px;
  box-sizing: border-box;
}

.order-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1);
}

.order-input.textarea {
  resize: vertical;
}

.order-radio-row {
  display: flex;
  gap: 16px;
  margin-top: 4px;
}

.order-radio {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
}

.order-radio input {
  width: 16px;
  height: 16px;
}

.order-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.order-btn {
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 13px;
  cursor: pointer;
}

.order-btn.secondary {
  background: #ffffff;
  border-color: #e5e7eb;
  color: #4b5563;
}

.order-btn.primary {
  background: linear-gradient(135deg, #ff4d4f, #ff7a45);
  color: #ffffff;
}
</style>

