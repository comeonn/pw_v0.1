<template>
  <div class="admin-page">
    <div class="page-header">
      <h2 class="page-title">热门推荐</h2>
      <button type="button" class="btn-primary" @click="openAddModal">添加推荐商品</button>
    </div>
    <p class="page-hint">此处维护的内容将展示在老板端首页「热门推荐」入口内，按排序从上到下显示。</p>

    <!-- 添加推荐商品弹窗：选择已有商品 -->
    <div v-if="showAddModal" class="modal-mask" @click.self="closeAddModal">
      <div class="modal">
        <h3 class="modal-title">添加推荐商品</h3>
        <div class="form-group">
          <label class="form-label">选择商品</label>
          <select v-model="selectedGoodsId" class="form-select">
            <option value="">请选择商品</option>
            <option v-for="g in addableGoods" :key="g.id" :value="g.id">{{ g.title }}（￥{{ g.price }}）</option>
          </select>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="closeAddModal">取消</button>
          <button type="button" class="btn-primary" :disabled="!selectedGoodsId" @click="confirmAdd">确定添加</button>
        </div>
      </div>
    </div>

    <section class="panel">
      <div v-if="loading" class="loading">加载中…</div>
      <div v-else-if="list.length === 0" class="empty">暂无推荐商品，点击「添加推荐商品」从商品库中选择。</div>
      <div v-else class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th width="60">排序</th>
              <th width="72">图片</th>
              <th>商品名称</th>
              <th width="120">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>
                <img v-if="item.cover" :src="item.cover" class="table-cover" alt="" />
                <span v-else class="no-cover">—</span>
              </td>
              <td>{{ item.title || '—' }}</td>
              <td>
                <button type="button" class="btn-link" :disabled="index === 0" @click="moveUp(index)">上移</button>
                <button type="button" class="btn-link" :disabled="index === list.length - 1" @click="moveDown(index)">下移</button>
                <button type="button" class="btn-link danger" @click="remove(item)">移除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getJson, postJson } from '@/api/http'

interface HotItem {
  id: number
  goodsId: number
  sort: number
  title: string | null
  cover: string | null
}

interface GoodOption {
  id: number
  title: string
  price: number
}

const loading = ref(true)
const list = ref<HotItem[]>([])
const allGoods = ref<GoodOption[]>([])
const showAddModal = ref(false)
const selectedGoodsId = ref<number | ''>('')

const addableGoods = computed(() => {
  const inIds = new Set(list.value.map((x) => x.goodsId))
  return allGoods.value.filter((g) => !inIds.has(g.id))
})

async function loadList() {
  try {
    list.value = await getJson<HotItem[]>('/api/admin/hot_recommend_goods')
  } catch {
    list.value = []
  }
}

async function loadGoods() {
  try {
    const rows = await getJson<Array<{ id: number; title: string; price: number }>>('/api/goods')
    allGoods.value = rows ?? []
  } catch {
    allGoods.value = []
  }
}

async function load() {
  loading.value = true
  await Promise.all([loadList(), loadGoods()])
  loading.value = false
}

function openAddModal() {
  selectedGoodsId.value = ''
  showAddModal.value = true
}

function closeAddModal() {
  showAddModal.value = false
}

async function confirmAdd() {
  if (!selectedGoodsId.value) return
  try {
    await postJson<HotItem>('/api/admin/hot_recommend_goods', { goodsId: selectedGoodsId.value })
    await loadList()
    closeAddModal()
  } catch (e) {
    alert('添加失败，可能该商品已在推荐中')
  }
}

async function remove(item: HotItem) {
  if (!confirm(`确定将「${item.title || item.goodsId}」从热门推荐中移除？`)) return
  try {
    const res = await fetch(`/api/admin/hot_recommend_goods/${item.id}`, { method: 'DELETE' })
    if (res.ok) await loadList()
    else alert('移除失败')
  } catch {
    alert('移除失败')
  }
}

async function moveUp(index: number) {
  if (index <= 0) return
  await reorderBySwap(index, index - 1)
}

async function moveDown(index: number) {
  if (index >= list.value.length - 1) return
  await reorderBySwap(index, index + 1)
}

async function reorderBySwap(i: number, j: number) {
  const items = [...list.value]
  const a = items[i]
  const b = items[j]
  if (!a || !b) return
  const body = [
    { id: a.id, sort: b.sort },
    { id: b.id, sort: a.sort }
  ]
  try {
    const res = await fetch('/api/admin/hot_recommend_goods/reorder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (res.ok) await loadList()
  } catch {
    alert('排序失败')
  }
}

onMounted(load)
</script>

<style scoped>
.admin-page {
  max-width: 900px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.page-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
}

.page-hint {
  margin: 0 0 16px;
  font-size: 13px;
  color: #64748b;
}

.btn-primary {
  padding: 8px 16px;
  font-size: 13px;
  color: #fff;
  background: #1e293b;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.panel {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
}

.loading,
.empty {
  text-align: center;
  padding: 24px;
  font-size: 13px;
  color: #64748b;
}

.table-wrap {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.data-table th,
.data-table td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.data-table th {
  font-weight: 600;
  color: #374151;
  background: #f8fafc;
}

.btn-link {
  padding: 0 4px;
  font-size: 13px;
  color: #3b82f6;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 8px;
}

.btn-link:hover:not(:disabled) {
  text-decoration: underline;
}

.btn-link:disabled {
  color: #94a3b8;
  cursor: not-allowed;
}

.btn-link.danger:hover {
  color: #dc2626;
}

.table-cover {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  vertical-align: middle;
}

.no-cover {
  color: #94a3b8;
  font-size: 13px;
}

.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.modal-title {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.form-select {
  width: 100%;
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}

.btn-secondary {
  padding: 8px 16px;
  font-size: 13px;
  color: #374151;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
}
</style>
