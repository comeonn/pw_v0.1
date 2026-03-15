<template>
  <div class="page">
    <main class="content">
      <header class="page-header">
        <button type="button" class="back-btn" @click="goBack">← 返回</button>
      </header>
      <div class="header-text">
        <h1 class="page-title">热门推荐</h1>
        <p class="page-subtitle">人气酷玩 · 爆款单子</p>
      </div>
      <section v-if="loading" class="loading">加载中…</section>
      <section v-else-if="items.length === 0" class="empty">暂无推荐商品，敬请期待</section>
      <section v-else class="card-list">
        <router-link
          v-for="item in items"
          :key="item.id"
          class="item-card"
          :to="`/goods/${item.id}`"
        >
          <div class="item-cover">
            <img :src="item.cover || '/goods-1.png'" :alt="item.title" class="item-cover-image" />
          </div>
          <div class="item-info">
            <div class="item-title">{{ item.title }}</div>
            <div class="item-meta">
              <span class="item-price">￥{{ item.price }}</span>
              <span class="item-sales">已售 {{ item.sales ?? 0 }}</span>
            </div>
          </div>
        </router-link>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getJson } from '@/api/http'

const router = useRouter()
function goBack() {
  router.back()
}

interface HotGood {
  id: number
  title: string
  cover: string | null
  price: number
  sales: number
}

const loading = ref(true)
const items = ref<HotGood[]>([])

async function load() {
  loading.value = true
  try {
    const list = await getJson<HotGood[]>('/api/hot_recommend_goods')
    items.value = list ?? []
  } catch {
    items.value = []
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f2f3f7;
  padding: 16px 12px 60px;
  box-sizing: border-box;
}

.content {
  max-width: 640px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  margin: -16px -12px 16px -12px;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
}

.back-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
}

.back-btn:active {
  opacity: 0.8;
}

.header-text {
  margin-bottom: 16px;
}

.page-title {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
}

.page-subtitle {
  margin: 0;
  font-size: 13px;
  color: #64748b;
}

.loading,
.empty {
  text-align: center;
  padding: 40px 16px;
  font-size: 14px;
  color: #64748b;
}

.card-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.item-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
  text-decoration: none;
  color: inherit;
}

.item-cover {
  height: 170px;
  position: relative;
  overflow: hidden;
  background: #020617;
}

.item-cover-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

.item-info {
  padding: 6px 6px 8px;
}

.item-title {
  font-size: 16px;
  line-height: 1.35;
  margin-bottom: 4px;
}

.item-meta {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 4px;
}

.item-price {
  color: #ff4d4f;
  font-weight: 600;
}

.item-sales {
  font-size: 11px;
  color: #999;
  margin-left: auto;
}
</style>
