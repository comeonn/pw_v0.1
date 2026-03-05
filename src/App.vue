<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <nav v-if="showTabbar" class="tabbar">
      <button
        class="tabbar-item"
        :class="{ active: isActive('Home') }"
        type="button"
        @click="go('/')"
      >
        <span class="tabbar-icon">
          <svg
            class="tabbar-icon-svg"
            viewBox="0 0 1024 1024"
            aria-hidden="true"
          >
            <path
              d="M49.617455 515.304727a34.909091 34.909091 0 0 1-23.645091-60.625454L488.378182 29.626182a34.978909 34.978909 0 0 1 47.336727 0.069818L995.444364 454.749091a34.909091 34.909091 0 1 1-47.406546 51.269818L511.930182 102.795636 73.239273 506.088727a34.769455 34.769455 0 0 1-23.621818 9.216z"
              fill="currentColor"
            />
            <path
              d="M827.275636 1001.844364H196.724364c-44.916364 0-81.454545-36.538182-81.454546-81.454546V541.858909a34.909091 34.909091 0 1 1 69.818182 0v378.530909a11.636364 11.636364 0 0 0 11.636364 11.636364h630.551272c6.4 0 11.636364-5.236364 11.636364-11.636364V541.858909a34.909091 34.909091 0 1 1 69.818182 0v378.530909c0 44.916364-36.538182 81.454545-81.454546 81.454546z"
              fill="currentColor"
            />
            <path
              d="M597.178182 1001.844364h-170.379637c-44.916364 0-81.454545-36.538182-81.454545-81.454546v-237.149091c0-44.916364 36.538182-81.454545 81.454545-81.454545h170.379637c44.916364 0 81.454545 36.538182 81.454545 81.454545v237.125818a81.547636 81.547636 0 0 1-81.454545 81.477819z m-170.379637-330.24a11.636364 11.636364 0 0 0-11.636363 11.636363v237.125818a11.636364 11.636364 0 0 0 11.636363 11.636364h170.379637c6.4 0 11.636364-5.236364 11.636363-11.636364V683.240727c0-6.4-5.236364-11.636364-11.636363-11.636363h-170.379637z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span class="tabbar-text">首页</span>
      </button>
      <button
        class="tabbar-item"
        :class="{ active: isActive('Category') }"
        type="button"
        @click="go('/category')"
      >
        <span class="tabbar-icon">
          <svg
            class="tabbar-icon-svg"
            viewBox="0 0 1024 1024"
            aria-hidden="true"
          >
            <path
              d="M420.48 539.328a64 64 0 0 1 63.808 59.232l0.192 4.8v210.944a64 64 0 0 1-59.232 63.84l-4.8 0.16H209.536a64 64 0 0 1-63.84-59.2l-0.16-4.8v-210.976a64 64 0 0 1 59.2-63.808l4.8-0.192h210.976z m397.184 0a64 64 0 0 1 63.808 59.232l0.192 4.8v210.944a64 64 0 0 1-59.232 63.84l-4.8 0.16H606.72a64 64 0 0 1-63.84-59.2l-0.16-4.8v-210.976a64 64 0 0 1 59.2-63.808l4.8-0.192h210.976z m-397.184 64H209.504v210.976h210.976v-210.976z m397.184 0h-210.976v210.976h210.976v-210.976z m-150.72-464.512a64 64 0 0 1 86.4-3.744l4.096 3.744 127.552 127.584a64 64 0 0 1 3.744 86.4l-3.744 4.096-127.552 127.584a64 64 0 0 1-86.464 3.744l-4.064-3.744-127.584-127.584a64 64 0 0 1-3.744-86.432l3.744-4.064 127.584-127.584z m-246.464 3.328a64 64 0 0 1 63.808 59.232l0.192 4.8v210.944a64 64 0 0 1-59.232 63.84l-4.8 0.16H209.536a64 64 0 0 1-63.84-59.2l-0.16-4.8V206.144a64 64 0 0 1 59.2-63.808l4.8-0.192h210.976z m291.68 41.92L584.64 311.68l127.552 127.584 127.584-127.584-127.584-127.584z m-291.68 22.08H209.504v210.976h210.976V206.144z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span class="tabbar-text">分类</span>
      </button>
      <button
        class="tabbar-item"
        :class="{ active: isActive('Mine') }"
        type="button"
        @click="go('/mine')"
      >
        <span class="tabbar-icon">
          <svg
            class="tabbar-icon-svg"
            viewBox="0 0 1024 1024"
            aria-hidden="true"
          >
            <path
              d="M516.098 58c147.278 0 266.67 119.398 266.67 266.683 0 98.537-53.438 184.591-132.913 230.762l0.004-0.012C809.06 612.26 923 764.38 923 943.113 923 959.62 909.62 973 893.115 973c-16.27 0-29.503-13.001-29.878-29.181l-0.008-0.706c0-194.264-157.474-351.746-351.729-351.746-192.312 0-348.576 154.348-351.682 345.93l-0.047 5.816c0 16.506-13.38 29.887-29.886 29.887C113.38 973 100 959.62 100 943.113c0-180.89 116.706-334.52 278.925-389.696l0.004 0.012c-77.589-46.631-129.502-131.626-129.502-228.746C249.427 177.398 368.82 58 516.097 58z m0 59.774c-114.268 0-206.9 92.636-206.9 206.91 0 114.272 92.632 206.909 206.9 206.909 114.267 0 206.9-92.637 206.9-206.91s-92.633-206.91-206.9-206.91z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span class="tabbar-text">我的</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const showTabbar = computed(() => {
  if (route.path.startsWith('/admin')) return false
  return (route.meta.showTabbar as boolean) !== false
})

function isActive(name: string) {
  return route.name === name
}

function go(path: string) {
  router.push(path)
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: #f2f3f7;
}

.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 58px;
  background: #ffffff;
  display: flex;
  border-top: 1px solid #e5e7eb;
}

.tabbar-item {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 11px;
  border: none;
  background: transparent;
  cursor: pointer;
}

.tabbar-item.active {
  color: #ff4d4f;
}

.tabbar-icon {
  line-height: 1;
  margin-bottom: 2px;
}

.tabbar-icon-svg {
  width: 20px;
  height: 20px;
  display: block;
}

.tabbar-text {
  line-height: 1;
}
</style>
