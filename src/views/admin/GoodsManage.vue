<template>
  <div class="admin-page">
    <div class="page-header">
      <h2 class="page-title">商品管理</h2>
      <button type="button" class="btn-primary" @click="openAddModal">新增商品</button>
    </div>

    <!-- 新增/编辑商品弹窗 -->
    <div v-if="showFormModal" class="modal-mask" @click.self="closeFormModal">
      <div class="modal">
        <h3 class="modal-title">{{ formMode === 'add' ? '新增商品' : '编辑商品' }}</h3>
        <form class="form" @submit.prevent="submitForm">
          <div class="form-group">
            <label class="form-label">商品图片</label>
            <div class="upload-area">
              <template v-if="form.cover">
                <img :src="form.cover" class="cover-preview" alt="商品图" />
                <button type="button" class="cover-remove" @click="form.cover = ''">移除</button>
              </template>
              <label v-else class="upload-label">
                <input type="file" accept="image/*" class="upload-input" @change="onCoverChange" />
                <span class="upload-text">点击上传图片</span>
              </label>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">商品名称 <span class="required">*</span></label>
            <input v-model="form.name" type="text" class="form-input" placeholder="请输入商品名称" required />
          </div>
          <div class="form-group">
            <label class="form-label">商品详情介绍</label>
            <textarea
              v-model="form.detail"
              class="form-input textarea"
              rows="5"
              placeholder="请输入商品详细介绍（将用于老板端查看商品、打手端接单展示）"
            />
          </div>
          <div class="form-group">
            <label class="form-label">分类 <span class="required">*</span></label>
            <select v-model="form.categoryId" class="form-select" required>
              <option value="">请选择分类</option>
              <option v-if="categories.length === 0" value="" disabled>暂无可用分类</option>
              <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div class="form-row">
            <div class="form-group flex">
              <label class="form-label">老板价格（元）<span class="required">*</span></label>
              <input v-model="form.bossPrice" type="text" class="form-input" placeholder="如 38.00" required />
            </div>
            <div class="form-group flex">
              <label class="form-label">打手金额（元）<span class="required">*</span></label>
              <input v-model="form.workerAmount" type="text" class="form-input" placeholder="如 28.00" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group flex">
              <label class="form-label">销量</label>
              <input v-model.number="form.sales" type="number" min="0" class="form-input" placeholder="0" />
            </div>
            <div class="form-group flex">
              <label class="form-label">排序</label>
              <input v-model.number="form.sort" type="number" min="0" class="form-input" placeholder="数字越小越靠前" />
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="closeFormModal">取消</button>
            <button type="submit" class="btn-primary">{{ formMode === 'add' ? '确定新增' : '保存' }}</button>
          </div>
        </form>
      </div>
    </div>
    <div class="toolbar">
      <input
        v-model="keyword"
        type="text"
        class="search-input"
        placeholder="商品名称 / ID"
      />
      <select v-model="category" class="select">
        <option value="">全部分类</option>
        <option v-for="c in categories" :key="c.id" :value="String(c.id)">{{ c.name }}</option>
      </select>
      <button type="button" class="btn-secondary">查询</button>
    </div>
    <section class="panel">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>商品 ID</th>
              <th>图片</th>
              <th>名称</th>
              <th>分类</th>
              <th>老板价格</th>
              <th>打手金额</th>
              <th>销量</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in mockGoods" :key="g.id">
              <td>{{ g.id }}</td>
              <td>
                <img v-if="g.cover" :src="g.cover" class="table-cover" alt="" />
                <span v-else class="no-cover">—</span>
              </td>
              <td>{{ g.name }}</td>
              <td>{{ categoryText[g.categoryId] || '—' }}</td>
              <td>¥{{ g.bossPrice }}</td>
              <td>¥{{ g.workerAmount }}</td>
              <td>{{ g.sales }}</td>
              <td>
                <button type="button" class="btn-link" @click="openEditModal(g)">编辑</button>
                <button type="button" class="btn-link danger" @click="removeGood(g)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, reactive } from 'vue'
import { getJson } from '@/api/http'

interface GoodsCategoryItem {
  id: number
  code: string
  name: string
  sort: number
}

interface GoodItem {
  id: string
  name: string
  categoryId: number
  cover: string
  bossPrice: string
  workerAmount: string
  detail?: string
  sales: number
  sort: number
}

const keyword = ref('')
const category = ref('')

const categories = ref<GoodsCategoryItem[]>([])

const categoryText = computed<Record<number, string>>(() => {
  const m: Record<number, string> = {}
  for (const c of categories.value) m[c.id] = c.name
  return m
})

async function loadCategories() {
  try {
    categories.value = await getJson<GoodsCategoryItem[]>('/api/goods_categories')
  } catch (e) {
    console.error(e)
    categories.value = []
  }
}

const mockGoods = ref<GoodItem[]>([
  {
    id: 'G001',
    name: '春服护航 1小时',
    categoryId: 0,
    cover: '/goods-1.png',
    bossPrice: '38.00',
    workerAmount: '28.00',
    detail: '服务内容：护航陪玩 1 小时\n说明：可语音/可不语音，按需求调整节奏',
    sales: 256,
    sort: 1
  },
  {
    id: 'G002',
    name: '春服护航 3小时',
    categoryId: 0,
    cover: '/goods-2.png',
    bossPrice: '98.00',
    workerAmount: '72.00',
    detail: '服务内容：护航陪玩 3 小时\n说明：适合上分冲刺/战术局，可拆分多段进行',
    sales: 128,
    sort: 2
  },
  {
    id: 'G003',
    name: '跑刀代打',
    categoryId: 0,
    cover: '/goods-1.png',
    bossPrice: '25.00',
    workerAmount: '18.00',
    detail: '服务内容：跑刀代打\n说明：按路线效率刷取，过程中可同步进度',
    sales: 89,
    sort: 3
  },
  {
    id: 'G004',
    name: '33 上分',
    categoryId: 0,
    cover: '/goods-1.png',
    bossPrice: '88.00',
    workerAmount: '65.00',
    detail: '服务内容：33 上分\n说明：节奏快，建议语音沟通',
    sales: 312,
    sort: 4
  },
  {
    id: 'G005',
    name: '代肝周常',
    categoryId: 0,
    cover: '/goods-2.png',
    bossPrice: '50.00',
    workerAmount: '38.00',
    detail: '服务内容：代肝周常\n说明：按目标拆解任务，阶段反馈',
    sales: 67,
    sort: 5
  }
])

const showFormModal = ref(false)
const formMode = ref<'add' | 'edit'>('add')
const editingId = ref<string | null>(null)
const form = reactive({
  name: '',
  detail: '',
  categoryId: '' as number | '',
  cover: '',
  bossPrice: '',
  workerAmount: '',
  sales: 0,
  sort: 0
})

onMounted(async () => {
  await loadCategories()
  // 如果有分类数据，给 mock 商品一个默认分类，避免表格显示空
  if (categories.value.length > 0) {
    const firstId = categories.value[0].id
    for (const g of mockGoods.value) {
      if (!g.categoryId) g.categoryId = firstId
    }
  }
})

function getNextId(): string {
  const max = mockGoods.value.reduce((n, g) => {
    const num = parseInt(g.id.replace(/\D/g, ''), 10)
    return isNaN(num) ? n : Math.max(n, num)
  }, 0)
  return 'G' + String(max + 1).padStart(3, '0')
}

function getNextSort(): number {
  const max = Math.max(0, ...mockGoods.value.map((g) => g.sort))
  return max + 1
}

function openAddModal() {
  formMode.value = 'add'
  editingId.value = null
  form.name = ''
  form.detail = ''
  form.categoryId = categories.value[0]?.id ?? ''
  form.cover = ''
  form.bossPrice = ''
  form.workerAmount = ''
  form.sales = 0
  form.sort = getNextSort()
  showFormModal.value = true
}

function openEditModal(g: GoodItem) {
  formMode.value = 'edit'
  editingId.value = g.id
  form.name = g.name
  form.detail = g.detail || ''
  form.categoryId = g.categoryId || ''
  form.cover = g.cover
  form.bossPrice = g.bossPrice
  form.workerAmount = g.workerAmount
  form.sales = g.sales
  form.sort = g.sort
  showFormModal.value = true
}

function closeFormModal() {
  showFormModal.value = false
  editingId.value = null
}

function onCoverChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !file.type.startsWith('image/')) return
  const reader = new FileReader()
  reader.onload = () => {
    form.cover = reader.result as string
  }
  reader.readAsDataURL(file)
  input.value = ''
}

function submitForm() {
  const categoryIdVal = form.categoryId
  if (!form.name.trim() || !categoryIdVal) {
    alert('请填写商品名称并选择分类')
    return
  }
  const bossPrice = form.bossPrice.trim()
  const workerAmount = form.workerAmount.trim()
  if (!bossPrice || !workerAmount) {
    alert('请填写老板价格和打手金额')
    return
  }
  const payload = {
    name: form.name.trim(),
    detail: form.detail.trim(),
    categoryId: Number(categoryIdVal),
    cover: form.cover,
    bossPrice,
    workerAmount,
    sales: Math.max(0, form.sales),
    sort: Math.max(0, form.sort)
  }
  if (formMode.value === 'add') {
    mockGoods.value.push({
      id: getNextId(),
      ...payload
    })
  } else if (editingId.value) {
    const item = mockGoods.value.find((g) => g.id === editingId.value)
    if (item) {
      item.name = payload.name
      item.detail = payload.detail
      item.categoryId = payload.categoryId
      item.cover = payload.cover
      item.bossPrice = payload.bossPrice
      item.workerAmount = payload.workerAmount
      item.sales = payload.sales
      item.sort = payload.sort
    }
  }
  mockGoods.value.sort((a, b) => a.sort - b.sort)
  closeFormModal()
}

function removeGood(g: GoodItem) {
  if (confirm(`确定删除商品「${g.name}」？`)) {
    mockGoods.value = mockGoods.value.filter((x) => x.id !== g.id)
  }
}
</script>

<style scoped>
.admin-page {
  max-width: 1200px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.page-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
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

.toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.search-input {
  width: 200px;
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.select {
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
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

.panel {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
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

.data-table tbody tr:hover {
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

.btn-link:hover {
  text-decoration: underline;
}

.btn-link.danger:hover {
  color: #dc2626;
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
  max-width: 440px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-title {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
}

.form {
  display: block;
}

.form-group {
  margin-bottom: 16px;
}

.form-group.flex {
  flex: 1;
  min-width: 0;
}

.form-row {
  display: flex;
  gap: 12px;
}

.form-row .form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.form-label .required {
  color: #dc2626;
}

.form-input,
.form-select {
  width: 100%;
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
}

.form-input.textarea {
  resize: vertical;
  min-height: 108px;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}

.upload-area {
  border: 1px dashed #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  background: #f8fafc;
}

.cover-preview {
  display: block;
  max-width: 200px;
  max-height: 160px;
  object-fit: contain;
  border-radius: 6px;
  margin-bottom: 8px;
}

.cover-remove {
  font-size: 12px;
  color: #64748b;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.cover-remove:hover {
  color: #dc2626;
}

.upload-label {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  cursor: pointer;
}

.upload-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}

.upload-text {
  font-size: 13px;
  color: #64748b;
}

.upload-text:hover {
  color: #3b82f6;
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
</style>
