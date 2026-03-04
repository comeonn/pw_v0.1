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

        <div class="price-row">
          <span class="price">￥{{ goods.price }}</span>
          <span v-if="goods.originalPrice" class="original">￥{{ goods.originalPrice }}</span>
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
      <button class="buy-btn" type="button" @click="orderNow">
        立即下单
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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

function orderNow() {
  // TODO: 后续接下单页/支付，这里先给个“回到我的订单/首页”的示意
  router.push('/mine')
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

.original {
  font-size: 12px;
  color: #94a3b8;
  text-decoration: line-through;
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
</style>

