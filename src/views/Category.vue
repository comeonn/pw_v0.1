<template>
  <div class="page">
    <header class="header">
      <div class="header-center">
        <div class="header-title">分类</div>
        <div class="header-subtitle">护航 / 跑刀 / 33 / 代肝</div>
      </div>
      <div class="search">
        <span class="search-icon">🔍</span>
        <input class="search-input" placeholder="搜道具 / 玩法 / 保底单" />
      </div>
    </header>

    <main class="content">
      <section class="panel">
        <div class="layout">
          <!-- 一级分类 -->
          <aside class="lvl1">
            <button
              v-for="c1 in level1"
              :key="c1.id"
              class="lvl1-item"
              :class="{ active: c1.id === activeL1 }"
              type="button"
              @click="selectL1(c1.id)"
            >
              <span class="lvl1-icon" aria-hidden="true">{{ c1.icon }}</span>
              <span class="lvl1-name">{{ c1.name }}</span>
              <span class="lvl1-sub">精选</span>
            </button>
          </aside>

          <!-- 二级分类 + 商品 -->
          <section class="main">
            <div class="lvl2-row">
              <button
                v-for="c2 in level2"
                :key="c2.id"
                class="lvl2-chip"
                :class="{ active: c2.id === activeL2 }"
                type="button"
                @click="activeL2 = c2.id"
              >
                {{ c2.name }}
              </button>
            </div>

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

type L1 = { id: 'escort' | 'loot' | '33' | 'grind'; name: string; icon: string }
type L2 = {
  id: 'prop' | 'single' | 'special' | 'basic' | 'opening'
  name: string
}

const level1: L1[] = [
  { id: 'escort', name: '护航', icon: '🛡️' },
  { id: 'loot', name: '跑刀', icon: '🏃' },
  { id: '33', name: '33', icon: '🎯' },
  { id: 'grind', name: '代肝', icon: '⏳' }
]

const level2: L2[] = [
  { id: 'prop', name: '道具单' },
  { id: 'single', name: '单局赌单' },
  { id: 'special', name: '特殊玩法' },
  { id: 'basic', name: '基础保底' },
  { id: 'opening', name: '开业福利' }
]

const activeL1 = ref<L1['id']>('escort')
const activeL2 = ref<L2['id']>('basic')

const filteredGoods = computed(() =>
  GOODS.filter((g) => g.l1 === activeL1.value && g.l2 === activeL2.value)
)

function selectL1(id: L1['id']) {
  activeL1.value = id
  // 切一级时，二级回到“基础保底”，避免空列表
  activeL2.value = 'basic'
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f2f3f7;
  padding-bottom: 60px;
  box-sizing: border-box;
}

.header {
  padding: 14px 16px 14px;
  background: linear-gradient(135deg, #121b2b, #252f4a);
  color: #fff;
}

.header-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
}

.header-subtitle {
  font-size: 12px;
  opacity: 0.8;
  margin-top: 4px;
}

.search {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.16);
}

.search-icon {
  font-size: 14px;
  opacity: 0.9;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
  font-size: 13px;
}

.content {
  padding: 12px 12px 24px;
}

.panel {
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.08),
    0 2px 10px rgba(15, 23, 42, 0.05);
}

.layout {
  display: flex;
  min-height: calc(100vh - 58px - 80px);
}

.lvl1 {
  width: 94px;
  background: linear-gradient(180deg, #f8fafc, #f4f6fb);
  border-right: 1px solid #eceef3;
  padding: 10px 8px;
}

.lvl1-item {
  width: 100%;
  border: none;
  background: transparent;
  padding: 10px 8px;
  font-size: 13px;
  color: #475569;
  text-align: center;
  border-radius: 12px;
  display: grid;
  place-items: center;
  gap: 4px;
  cursor: pointer;
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
  left: -8px;
  top: 12px;
  bottom: 12px;
  width: 4px;
  background: #ff4d4f;
  border-radius: 999px;
}

.lvl1-icon {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(15, 23, 42, 0.06);
  font-size: 16px;
}

.lvl1-item.active .lvl1-icon {
  background: rgba(255, 77, 79, 0.12);
}

.lvl1-name {
  font-size: 12px;
  line-height: 1;
}

.lvl1-sub {
  font-size: 10px;
  color: #94a3b8;
  line-height: 1;
}

.lvl1-item.active .lvl1-sub {
  color: rgba(255, 77, 79, 0.8);
}

.main {
  flex: 1;
  padding: 12px 12px 14px;
}

.lvl2-row {
  display: flex;
  gap: 8px;
  padding: 2px 2px 12px;
  overflow-x: auto;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 12px;
  -webkit-overflow-scrolling: touch;
}

.lvl2-chip {
  border: 1px solid #e5e7eb;
  background: #fff;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  color: #475569;
  white-space: nowrap;
}

.lvl2-chip.active {
  border-color: rgba(255, 77, 79, 0.35);
  background: rgba(255, 77, 79, 0.1);
  color: #ff4d4f;
  font-weight: 600;
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
  height: 90px;
  flex-shrink: 0;
  background: #0f172a;
}

.goods-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

