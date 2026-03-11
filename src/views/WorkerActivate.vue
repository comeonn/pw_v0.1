<template>
  <div class="page worker-page">
    <header class="header-simple">
      <div class="title">打手授权</div>
    </header>

    <main class="content">
      <section class="card">
        <div class="card-title">输入授权码</div>
        <div class="card-sub">
          首次进入需要管理员发放的授权码。授权成功后将自动进入打手端，后续不再需要输入。
        </div>

        <div class="form">
          <input
            v-model="code"
            class="input"
            placeholder="请输入授权码"
            autocomplete="one-time-code"
          />
          <button class="btn" type="button" :disabled="loading" @click="submit">
            {{ loading ? '授权中…' : '确认授权' }}
          </button>
        </div>

        <div v-if="errorText" class="error">{{ errorText }}</div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { postJson } from '../api/http'

const router = useRouter()

const code = ref('')
const wechatOpenid = ref(localStorage.getItem('wechat_openid') || `demo-openid-${Date.now()}`)
const loading = ref(false)
const errorText = ref('')

async function submit() {
  errorText.value = ''
  if (!code.value.trim()) {
    errorText.value = '请输入授权码'
    return
  }
  // openid 后续接入微信网页授权后由后端/前端自动获取；当前演示环境用 localStorage 自动生成
  if (!wechatOpenid.value.trim()) wechatOpenid.value = `demo-openid-${Date.now()}`

  loading.value = true
  try {
    const resp = await postJson<{ ok: boolean; workerUserId: number }>(
      '/api/worker/activate',
      { code: code.value.trim(), wechatOpenid: wechatOpenid.value.trim() }
    )
    if (resp.ok) {
      localStorage.setItem('worker_activated', '1')
      localStorage.setItem('worker_user_id', String(resp.workerUserId))
      localStorage.setItem('wechat_openid', wechatOpenid.value.trim())
      router.replace('/worker/home')
    } else {
      errorText.value = '授权失败'
    }
  } catch (e: any) {
    errorText.value = e?.bodyText || e?.message || '授权失败'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.worker-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 0 0, rgba(34, 197, 94, 0.22), transparent 55%),
    radial-gradient(circle at 100% 0, rgba(248, 113, 22, 0.18), transparent 60%),
    linear-gradient(145deg, #020617 0%, #020617 40%, #020617 100%);
  color: #e5e7eb;
}

.header-simple {
  padding: 12px 12px;
  border-bottom: 1px solid #111827;
}

.title {
  font-size: 16px;
  font-weight: 800;
}

.content {
  padding: 16px 12px;
}

.card {
  background: rgba(2, 6, 23, 0.7);
  border: 1px solid rgba(31, 41, 55, 0.9);
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.7);
}

.card-title {
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 6px;
}

.card-sub {
  font-size: 12px;
  color: #9ca3af;
  line-height: 1.4;
  margin-bottom: 12px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #1f2937;
  background: #020617;
  color: #e5e7eb;
  outline: none;
  font-size: 13px;
}

.btn {
  padding: 10px 12px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #22c55e, #4ade80);
  color: #022c22;
  font-weight: 800;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  margin-top: 10px;
  font-size: 12px;
  color: #fecaca;
  white-space: pre-wrap;
}
</style>

