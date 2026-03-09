export type WorkerOrderStatus = 'waiting' | 'ongoing' | 'pendingConfirm' | 'finished'

export type WorkerLevel = 'gold' | 'normal'

export interface WorkerProfile {
  id: string
  name: string
  level: WorkerLevel
  todayIncome: number
  monthIncome: number
  totalOrders: number
  rating: number
}

export interface WorkerOrder {
  id: string
  goodsId: number
  title: string
  mode: string
  levelTag: '金牌订单' | '普通订单'
  bossPrice: number
  workerPrice: number
  expectedTime: string
  createdAt: string
  status: WorkerOrderStatus
  gameId?: string
  numericId?: string
  bossNote?: string
}

export interface WorkerWallet {
  balance: number
  totalIncome: number
  totalWithdrawn: number
}

export interface WalletTxn {
  id: string
  type: 'income' | 'withdraw' | 'adjust'
  amount: number
  title: string
  remark?: string
  createdAt: string
}

export const MOCK_WORKER_PROFILE: WorkerProfile = {
  id: 'WRK-8899',
  name: '金牌打手 · 阿怪',
  level: 'gold',
  todayIncome: 238.5,
  monthIncome: 5230.75,
  totalOrders: 186,
  rating: 4.9
}

export const MOCK_AVAILABLE_ORDERS: WorkerOrder[] = [
  {
    id: 'A20260303001',
    goodsId: 1,
    title: '护航 · 队滅上分 3 局',
    mode: '护航 / 基础保底',
    levelTag: '金牌订单',
    bossPrice: 99.9,
    workerPrice: 68.0,
    expectedTime: '预计 40 分钟',
    createdAt: '2026-03-03 14:20',
    status: 'waiting',
    gameId: '春服-小阿怪#5566',
    numericId: '88990011',
    bossNote: '优先带上语音，有需要可多局续费'
  },
  {
    id: 'A20260303002',
    goodsId: 3,
    title: '跑刀 · 开业福利单',
    mode: '跑刀 / 开业福利',
    levelTag: '普通订单',
    bossPrice: 59.9,
    workerPrice: 38.0,
    expectedTime: '预计 30 分钟',
    createdAt: '2026-03-03 13:45',
    status: 'waiting',
    gameId: '春服-小明#2333',
    numericId: '77001234'
  },
  {
    id: 'A20260303003',
    goodsId: 5,
    title: '33 赌单 · 冲分 2 场',
    mode: '33 / 单局赌单',
    levelTag: '金牌订单',
    bossPrice: 129.0,
    workerPrice: 90.0,
    expectedTime: '预计 50 分钟',
    createdAt: '2026-03-03 13:10',
    status: 'waiting',
    gameId: '春服-老玩家#9090',
    numericId: '66554433'
  }
]

export const MOCK_MY_ORDERS: WorkerOrder[] = [
  {
    id: 'O20260302001',
    goodsId: 1,
    title: '护航 · 队滅上分 5 局',
    mode: '护航 / 基础保底',
    levelTag: '金牌订单',
    bossPrice: 159.0,
    workerPrice: 110.0,
    expectedTime: '进行中',
    createdAt: '2026-03-02 21:30',
    status: 'ongoing',
    gameId: '春服-上分老板#1001',
    numericId: '11223344',
    bossNote: '开黑优先，帮看看天赋搭配'
  },
  {
    id: 'O20260302002',
    goodsId: 2,
    title: '守滅浪上分 · 特殊战术局',
    mode: '护航 / 特殊玩法',
    levelTag: '金牌订单',
    bossPrice: 189.0,
    workerPrice: 130.0,
    expectedTime: '待老板确认',
    createdAt: '2026-03-02 20:10',
    status: 'pendingConfirm',
    gameId: '春服-战术家#7788',
    numericId: '55667788',
    bossNote: '带走两局，注意节奏别太快'
  },
  {
    id: 'O20260301001',
    goodsId: 4,
    title: '跑刀道具 · 材料 3 套',
    mode: '跑刀 / 道具单',
    levelTag: '普通订单',
    bossPrice: 149.0,
    workerPrice: 95.0,
    expectedTime: '已完成',
    createdAt: '2026-03-01 19:05',
    status: 'finished',
    gameId: '春服-刀刀暴击#9999',
    numericId: '99887766',
    bossNote: '多刷几圈材料不急'
  }
]

export const MOCK_WALLET: WorkerWallet = {
  balance: 1386.5,
  totalIncome: 9876.3,
  totalWithdrawn: 8490.0
}

export const MOCK_WALLET_TXN: WalletTxn[] = [
  {
    id: 'T20260302001',
    type: 'income',
    amount: 110.0,
    title: '订单收入 · 护航 队滅上分 5 局',
    remark: '订单号 O20260302001',
    createdAt: '2026-03-02 22:05'
  },
  {
    id: 'T20260302000',
    type: 'withdraw',
    amount: -500.0,
    title: '提现申请 · 微信手动结算',
    remark: '请联系客服完成转账',
    createdAt: '2026-03-02 18:20'
  },
  {
    id: 'T20260301003',
    type: 'income',
    amount: 95.0,
    title: '订单收入 · 跑刀道具 材料 3 套',
    remark: '订单号 O20260301001',
    createdAt: '2026-03-01 19:30'
  }
]

