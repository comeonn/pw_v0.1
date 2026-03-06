<template>
  <div class="page">
    <main class="content">
      <section class="search-section">
        <div class="search-bar">
          <span class="icon-search">🔍</span>
          <input class="search-input" placeholder="搜道具 / 玩法 / 保底单" />
        </div>
      </section>
      <section class="panel">
        <div class="layout">
          <!-- 左侧一级分类（仅此一级） -->
          <aside class="lvl1">
            <button
              v-for="c in categories"
              :key="c.id"
              class="lvl1-item"
              :class="{ active: c.id === activeCategory }"
              type="button"
              @click="activeCategory = c.id"
            >
              <span class="lvl1-name">{{ c.name }}</span>
            </button>
          </aside>

          <!-- 右侧商品列表 -->
          <section class="main">
            <div class="goods">
              <router-link
                v-for="g in filteredGoods"
                :key="g.id"
                class="goods-card"
                :to="`/goods/${g.id}`"
              >
                <div class="goods-cover">
                  <img :src="g.cover" :alt="g.title" />
                </div>
                <div class="goods-info">
                  <div class="goods-title">{{ g.title }}</div>
                  <div class="goods-meta">
                    <span class="goods-price">￥{{ g.price }}</span>
                    <span class="goods-sales">已售 {{ g.sales }}</span>
                  </div>
                </div>
              </router-link>
              <div v-if="filteredGoods.length === 0" class="empty">
                <div class="empty-title">暂无商品</div>
                <div class="empty-sub">换个分类试试</div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { GOODS } from '../mock/goods'

type CategoryId = 'basic' | 'hourly' | 'fun' | 'red' | 'clear'

const categories: { id: CategoryId; name: string }[] = [
  { id: 'basic', name: '基础保底' },
  { id: 'hourly', name: '小时陪玩' },
  { id: 'fun', name: '趣味玩法' },
  { id: 'red', name: '赌红玩法' },
  { id: 'clear', name: '清图玩法' }
]

const activeCategory = ref<CategoryId>('basic')

/** 将商品按 l1/l2 映射到新五类，便于现有 mock 数据有展示 */
function goodsCategory(g: (typeof GOODS)[number]): CategoryId {
  if (g.l2 === 'basic') return 'basic'
  if (g.l1 === 'escort') return 'hourly'
  if (g.l2 === 'special' || g.l1 === '33') return 'fun'
  if (g.l2 === 'single') return 'red'
  if (g.l1 === 'loot') return 'clear'
  if (g.l1 === 'grind') return 'basic'
  return 'basic'
}

const filteredGoods = computed(() =>
  GOODS.filter((g) => goodsCategory(g) === activeCategory.value)
)
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f2f3f7;
  padding-bottom: 58px;
  box-sizing: border-box;
}

.content {
  min-height: calc(100vh - 58px);
  display: flex;
  flex-direction: column;
  padding: 0;
  box-sizing: border-box;
}

.search-section {
  padding: 12px 12px 10px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 16px;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  box-shadow:
    0 10px 24px rgba(15, 23, 42, 0.08),
    0 2px 10px rgba(15, 23, 42, 0.05);
}

.icon-search {
  margin-right: 6px;
  font-size: 14px;
  color: #94a3b8;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: #0f172a;
  font-size: 13px;
}

.panel {
  background: #ffffff;
  border-radius: 0;
  overflow: visible;
  border: 1px solid #e5e7eb;
  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.08),
    0 2px 10px rgba(15, 23, 42, 0.05);
  border-left: none;
  border-right: none;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.layout {
  display: flex;
  min-height: 0;
  flex: 1;
}

.lvl1 {
  width: 88px;
  flex-shrink: 0;
  background: linear-gradient(180deg, #f8fafc, #f4f6fb);
  border-right: 1px solid #eceef3;
  padding: 10px 6px;
}

.lvl1-item {
  width: 100%;
  border: none;
  background: transparent;
  padding: 12px 6px;
  font-size: 13px;
  color: #475569;
  text-align: center;
  border-radius: 10px;
  display: block;
  cursor: pointer;
  line-height: 1.35;
  margin-bottom: 4px;
}

.lvl1-item:last-child {
  margin-bottom: 0;
}

.lvl1-item.active {
  background: linear-gradient(135deg, rgba(255, 77, 79, 0.15), #ffffff);
  color: #ff4d4f;
  font-weight: 600;
  position: relative;
  box-shadow: 0 6px 18px rgba(255, 77, 79, 0.12);
}

.lvl1-item.active::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 10px;
  bottom: 10px;
  width: 4px;
  background: #ff4d4f;
  border-radius: 999px;
}

.lvl1-name {
  font-size: 13px;
  line-height: 1.35;
}

.main {
  flex: 1;
  min-width: 0;
  padding: 12px 12px 14px;
}

.goods {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.goods-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #eef2f7;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.06);
}

.goods-cover {
  width: 100%;
  height: 170px;
  flex-shrink: 0;
  background: #0f172a;
}

.goods-cover img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.goods-info {
  flex: 1;
  padding: 10px 10px 12px;
  min-width: 0;
}

.goods-title {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.3;
  margin-bottom: 8px;
  min-height: 34px;
}

.goods-meta {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.goods-price {
  color: #ff4d4f;
  font-weight: 700;
}

.goods-sales {
  color: #94a3b8;
  font-size: 12px;
}

.empty {
  grid-column: 1 / -1;
  padding: 22px 12px;
  text-align: center;
  color: #64748b;
}

.empty-title {
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
}

.empty-sub {
  font-size: 12px;
  opacity: 0.7;
}
</style>

