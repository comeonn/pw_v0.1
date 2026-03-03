<template>
  <div class="page">
    <header class="header">
      <div class="header-center">
        <div class="header-title">三角洲陪玩</div>
        <div class="header-subtitle">让每一局游戏更简单</div>
      </div>
      <div class="search-bar">
        <span class="icon-search">🔍</span>
        <input
          v-model="keyword"
          class="search-input"
          placeholder="搜索你喜欢的单子"
        />
      </div>
    </header>

    <main class="content">
      <section class="hero">
        <div class="hero-bg"></div>
        <div class="banner">
          <img src="/banner-ksdj.png" alt="怪兽电竞" class="banner-image" />
        </div>
      </section>

      <section class="notice card-elevated">
        <span class="notice-icon">📢</span>
        <span class="notice-text">
          如果打开客服页不好联系请客免单！如果开车看私加首…
        </span>
      </section>

      <section class="feature-row">
        <button class="feature-card feature-hot card-elevated" type="button">
          <img src="/hot-card.png" alt="热门推荐" class="feature-image" />
        </button>
        <router-link
          to="/lottery"
          class="feature-card feature-lottery card-elevated"
        >
          <img src="/lottery-card.png" alt="抽奖转盘" class="feature-image" />
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
            <div class="item-meta">
              <span class="item-price">￥{{ item.price }}</span>
              <span class="item-original" v-if="item.originalPrice">
                ￥{{ item.originalPrice }}
              </span>
              <span class="item-sales">已接 {{ item.sales }} 单</span>
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
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f2f3f7;
  padding-bottom: 60px;
  box-sizing: border-box;
}

.header {
  padding: 10px 12px 12px;
  background: linear-gradient(135deg, #121b2b, #252f4a);
  color: #fff;
}

.header-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.header-title {
  font-size: 15px;
  font-weight: 600;
}

.header-subtitle {
  font-size: 11px;
  opacity: 0.7;
}

.search-bar {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 6px 10px;
  border: 1px solid rgba(255, 255, 255, 0.16);
}

.icon-search {
  margin-right: 4px;
  font-size: 14px;
}

.search-input {
  border: none;
  outline: none;
  flex: 1;
  background: transparent;
  font-size: 14px;
  color: #fff;
}

.content {
  padding: 14px 12px 0;
  position: relative;
  margin-top: -2px;
}

.hero {
  position: relative;
  margin-bottom: 20px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  top: -14px;
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
}

.notice-icon {
  margin-right: 4px;
}

.feature-row {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
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
  height: 90px;
  position: relative;
  overflow: hidden;
}

.item-cover-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.item-info {
  padding: 6px 6px 8px;
}

.item-title {
  font-size: 13px;
  line-height: 1.3;
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

.item-original {
  font-size: 11px;
  color: #999;
  text-decoration: line-through;
}

.item-sales {
  font-size: 11px;
  color: #999;
  margin-left: auto;
}
</style>
