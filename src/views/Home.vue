<template>
  <div class="page">
    <main class="content">
      <section class="hero">
        <div class="hero-bg"></div>
        <div class="banner">
          <img :src="homePosterSrc" alt="首页海报" class="banner-image" />
        </div>
      </section>

      <section class="notice card-elevated">
        <span class="notice-icon">📢</span>
        <div class="notice-track" aria-label="公告">
          <div class="notice-marquee">
            <span class="notice-text" title="如果打开客服页不好联系请客免单！如果开车看私加首…">
              如果打开客服页不好联系请客免单！如果开车看私加首…
            </span>
            <span class="notice-gap" aria-hidden="true"></span>
            <span class="notice-text" aria-hidden="true">
              如果打开客服页不好联系请客免单！如果开车看私加首…
            </span>
          </div>
        </div>
      </section>

      <section class="search-section">
        <div class="search-bar">
          <span class="icon-search">🔍</span>
          <input
            v-model="keyword"
            class="search-input"
            placeholder="搜索你喜欢的单子"
          />
        </div>
      </section>

      <section class="feature-row">
        <router-link to="/hot" class="feature-card card-elevated">
          <img :src="hotPosterSrc" alt="热门推荐" class="feature-image" />
        </router-link>
        <router-link to="/lottery" class="feature-card card-elevated">
          <img :src="lotteryPosterSrc" alt="抽奖转盘" class="feature-image" />
        </router-link>
      </section>

      <section class="category-section">
        <div class="goods-header">
          <span class="goods-title">全部商品</span>
        </div>
      </section>

      <section class="card-list">
        <router-link
          v-for="item in filteredItems"
          :key="item.id"
          class="item-card"
          :to="`/goods/${item.id}`"
        >
          <div class="item-cover">
            <img :src="item.cover" :alt="item.title" class="item-cover-image" />
          </div>
          <div class="item-info">
            <div class="item-title">{{ item.title }}</div>
            <div v-if="item.detail || item.intro" class="item-detail">{{ item.detail || item.intro }}</div>
            <div class="item-meta">
              <span class="item-price">￥{{ item.price }}</span>
              <span class="item-sales">已售 {{ item.sales }}</span>
            </div>
          </div>
        </router-link>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { GOODS } from '../mock/goods'

const keyword = ref('')

const filteredItems = computed(() => GOODS)

const homePosterSrc = ref(localStorage.getItem('home_poster') || '/banner-ksdj.png')
const hotPosterSrc = ref(localStorage.getItem('hot_poster') || '/hot-recommend.png')
const lotteryPosterSrc = ref(localStorage.getItem('lottery_poster') || '/lottery-card.png')
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f2f3f7;
  padding-bottom: 60px;
  box-sizing: border-box;
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
  margin-right: 4px;
  font-size: 14px;
  color: #94a3b8;
}

.search-input {
  border: none;
  outline: none;
  flex: 1;
  background: transparent;
  font-size: 14px;
  color: #0f172a;
}

.content {
  padding: 14px 12px 0;
}

.hero {
  position: relative;
  margin-bottom: 20px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #252f4a 0%, #f2f3f7 70%);
  z-index: -1;
}

.banner {
  margin-bottom: 0;
}

.banner-image {
  width: 100%;
  display: block;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.notice {
  display: flex;
  align-items: center;
  background: #fff7e6;
  color: #ff6a00;
  padding: 6px 8px;
  border-radius: 8px;
  margin-bottom: 18px;
  font-size: 12px;
  overflow: hidden;
}

.notice-icon {
  margin-right: 4px;
}

.notice-track {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.notice-marquee {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  will-change: transform;
  animation: notice-marquee 12s linear infinite;
}

.notice-text {
  display: inline-block;
  white-space: nowrap;
}

.notice-gap {
  width: 36px;
  flex: 0 0 auto;
}

@keyframes notice-marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.search-section {
  margin-bottom: 18px;
}

.feature-row {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
}

.feature-card {
  flex: 1;
  border-radius: 10px;
  padding: 0;
  overflow: hidden;
  background: transparent;
  text-decoration: none;
  color: inherit;
  border: none;
  cursor: pointer;
  display: block;
}

.card-elevated {
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.16);
}

.feature-image {
  display: block;
  width: 100%;
  height: auto;
}

.category-section {
  margin-bottom: 0;
  margin-top: 0;
}

.goods-header {
  background: #ffffff;
  border-radius: 12px 12px 0 0;
  padding: 8px 10px;
  border: 1px solid #e5e7eb;
  border-bottom: none;
}

.goods-title {
  font-size: 13px;
  font-weight: 600;
}

.card-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 10px 10px 20px;
  margin: 0;
  background: #ffffff;
  border-radius: 0 0 14px 14px;
  border: 1px solid #e5e7eb;
  border-top: none;
}

.item-card {
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
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

.item-detail {
  font-size: 12px;
  line-height: 1.4;
  color: #64748b;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
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
