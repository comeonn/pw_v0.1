<template>
  <div class="lottery-page">
    <header class="lottery-header">
      <button class="back-btn" type="button" @click="router.push('/')">
        ← 返回
      </button>
      <button class="notice-btn" type="button" @click="showPublic = true">
        公示
      </button>
    </header>

    <main class="lottery-content">
      <p class="rule-tip">
        抽奖完成后您可选择立即下单，或若您需要稍作延迟，可随时在我的订单中点击派单自行操作，我们随时为您服务。
      </p>

      <section class="product-card">
        <div class="product-cover">
          <img :src="config.productCover" :alt="config.productName" />
        </div>
        <div class="product-info">
          <div class="product-name">{{ config.productName }}</div>
          <div class="product-desc">支付后转盘开奖，随机获得一款 3 小时护航商品</div>
        </div>
      </section>

      <section class="wheel-wrap">
        <div class="wheel-pointer"></div>
        <div
          class="wheel"
          :style="{ transform: `rotate(${wheelRotation}deg)` }"
        >
          <div class="wheel-inner">
            <div
              v-for="(label, i) in wheelLabels"
              :key="i"
              class="wheel-label"
              :style="labelStyle(i)"
            >
              {{ label }}
            </div>
          </div>
        </div>
      </section>

      <button
        class="draw-btn"
        :disabled="isSpinning || isPaying"
        type="button"
        @click="handleDraw"
      >
        <template v-if="isPaying">支付中…</template>
        <template v-else-if="isSpinning">开奖中…</template>
        <template v-else>￥{{ config.price }} 抽一次</template>
      </button>
    </main>

    <Teleport to="body">
      <div v-if="showResult" class="modal-mask" @click.self="closeResult">
        <div class="result-modal">
          <div class="result-title">恭喜获得</div>
          <div class="result-prize">{{ resultPrizeTitle }}</div>
          <div class="result-tip">已计入您的权益，可在「我的」中查看使用</div>
          <div class="result-actions">
            <button class="result-btn primary" type="button" @click="goOrder">
              立即去下单
            </button>
            <button class="result-btn" type="button" @click="closeResult">
              稍后再用
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <Teleport to="body">
      <div v-if="showPublic" class="modal-mask" @click.self="showPublic = false">
        <div class="public-modal">
          <div class="public-title">公示</div>
          <div class="public-content">
            <pre class="public-text">{{ publicText || '暂无公示内容' }}</pre>
          </div>
          <div class="public-actions">
            <button class="result-btn primary" type="button" @click="showPublic = false">
              知道了
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const config = ref({
  productName: '3 小时春服护航抽奖礼包',
  productCover: '/goods-1.png',
  price: 59
})

const wheelLabels = ['包过勇敢者行动！', '89.9保最低500w', '3小时保底最低500w']
const wheelRotation = ref(0)
const isPaying = ref(false)
const isSpinning = ref(false)
const showResult = ref(false)
const resultPrizeTitle = ref(wheelLabels[0] ?? '')
const showPublic = ref(false)
const publicText = ref(localStorage.getItem('lottery_public_text') ?? '')

const labelStyle = (index: number) => {
  const baseDeg = 60 + index * 120
  return {
    transform: `translate(-50%, -50%) rotate(${baseDeg}deg) translateY(-75px)`
  }
}

function mockPay(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 800)
  })
}

// 模拟抽奖：按 60% / 30% / 10% 概率抽中 3 款 3 小时护航商品之一
function mockDraw(): Promise<number> {
  const r = Math.random()
  if (r < 0.6) return Promise.resolve(0)
  if (r < 0.9) return Promise.resolve(1)
  return Promise.resolve(2)
}

async function handleDraw() {
  if (isPaying.value || isSpinning.value) return
  isPaying.value = true
  try {
    await mockPay()
  } finally {
    isPaying.value = false
  }
  const prizeIndex = await mockDraw()
  resultPrizeTitle.value = wheelLabels[prizeIndex] ?? ''
  const fullTurns = 5
  const segmentCenterDeg = 60 + prizeIndex * 120
  const offset = -18 // 让轮盘停在稍偏的位置，而不是指针正中
  // 在当前角度基础上累加，否则第二次第三次会逆着转且只转一点
  const targetDeg = wheelRotation.value + fullTurns * 360 + segmentCenterDeg + offset
  wheelRotation.value = targetDeg
  isSpinning.value = true
  setTimeout(() => {
    isSpinning.value = false
    showResult.value = true
  }, 4000)
}

function closeResult() {
  showResult.value = false
}

function goOrder() {
  closeResult()
  router.push('/')
}
</script>

<style scoped>
.lottery-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #1a1f35 0%, #2d3560 50%, #f2f3f7 100%);
  padding-bottom: 40px;
  box-sizing: border-box;
}

.lottery-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
}

.back-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.notice-btn {
  border: none;
  background: none;
  color: rgba(255, 255, 255, 0.9);
  font-size: 11px;
  padding: 4px 8px;
  cursor: pointer;
}

.notice-btn:active {
  opacity: 0.8;
}

.lottery-content {
  padding: 16px;
}

.rule-tip {
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  line-height: 1.5;
  margin: 0 0 16px;
  text-align: center;
}

.product-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  margin-bottom: 24px;
}

.product-cover {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.product-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  flex: 1;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-name {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
}

.product-desc {
  font-size: 12px;
  color: #666;
}

.wheel-wrap {
  position: relative;
  width: 280px;
  height: 280px;
  margin: 0 auto 24px;
}

.wheel-pointer {
  position: absolute;
  left: 50%;
  top: -8px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-top: 24px solid #ff4d4f;
  z-index: 2;
}

.wheel {
  position: absolute;
  inset: 20px;
  border-radius: 50%;
  background: conic-gradient(
    #ff6b6b 0deg 120deg,
    #ffd93d 120deg 240deg,
    #6bcb77 240deg 360deg
  );
  transition: transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99);
  box-shadow: 0 0 0 8px #fff, 0 0 0 10px #e5e7eb;
}

.wheel-inner {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
}

.wheel-center-label {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  padding: 6px 10px;
  max-width: 160px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 999px;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.18);
  pointer-events: none;
}

.wheel-label {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 13px;
  font-weight: 700;
  color: #1a1a1a;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
  white-space: nowrap;
}

.draw-btn {
  display: block;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #ff4d4f, #ff7a45);
  border: none;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(255, 77, 79, 0.4);
}

.draw-btn:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}

.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.result-modal {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 320px;
  text-align: center;
}

.public-modal {
  background: #fff;
  border-radius: 16px;
  padding: 18px 16px 14px;
  width: 100%;
  max-width: 360px;
}

.public-title {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 10px;
}

.public-content {
  max-height: 55vh;
  overflow: auto;
  border: 1px solid #eef2f7;
  border-radius: 12px;
  background: #f8fafc;
  padding: 10px 12px;
}

.public-text {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 13px;
  line-height: 1.6;
  color: #334155;
  font-family: inherit;
}

.public-actions {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}

.result-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.result-prize {
  font-size: 20px;
  font-weight: 700;
  color: #ff4d4f;
  margin-bottom: 12px;
}

.result-tip {
  font-size: 12px;
  color: #999;
  margin-bottom: 20px;
}

.result-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.result-btn {
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
}

.result-btn.primary {
  background: linear-gradient(135deg, #ff4d4f, #ff7a45);
  color: #fff;
  border: none;
}
</style>
