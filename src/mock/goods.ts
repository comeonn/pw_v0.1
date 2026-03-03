export type Goods = {
  id: number
  title: string
  intro: string
  cover: string
  images: string[]
  price: number
  originalPrice?: number
  sales: number
  l1?: 'escort' | 'loot' | '33' | 'grind'
  l2?: 'prop' | 'single' | 'special' | 'basic' | 'opening'
}

export const GOODS: Goods[] = [
  {
    id: 1,
    title: '队滅上分 · 抽密保底',
    intro: '适合想稳定冲分的老板：车队配合、策略沟通、保底机制清晰。',
    cover: '/goods-1.png',
    images: ['/goods-1.png', '/goods-2.png', '/banner-ksdj.png'],
    price: 59.9,
    originalPrice: 99.9,
    sales: 1286,
    l1: 'escort',
    l2: 'basic'
  },
  {
    id: 2,
    title: '守滅浪上分 · 抽密保底',
    intro: '主打效率与稳定：细节执行、节奏控制、翻车兜底。',
    cover: '/goods-2.png',
    images: ['/goods-2.png', '/goods-1.png', '/banner-ksdj.png'],
    price: 79.9,
    originalPrice: 129.9,
    sales: 862,
    l1: 'escort',
    l2: 'special'
  },
  {
    id: 3,
    title: '跑刀福利 · 开业亏本单',
    intro: '开业福利价：适合体验跑刀玩法与路线带练，收益更直观。',
    cover: '/goods-2.png',
    images: ['/goods-2.png', '/banner-ksdj.png'],
    price: 39.9,
    originalPrice: 69.9,
    sales: 2034,
    l1: 'loot',
    l2: 'opening'
  },
  {
    id: 4,
    title: '跑刀道具 · 指定材料单',
    intro: '指定材料/道具速刷：路线规划、效率最大化，按需交付。',
    cover: '/goods-1.png',
    images: ['/goods-1.png', '/goods-2.png'],
    price: 49.9,
    originalPrice: 89.9,
    sales: 1560,
    l1: 'loot',
    l2: 'prop'
  },
  {
    id: 5,
    title: '33 赌单 · 冲分挑战局',
    intro: '高强度对局：只适合敢拼的老板，节奏快、输出拉满。',
    cover: '/goods-1.png',
    images: ['/goods-1.png', '/banner-ksdj.png'],
    price: 99.0,
    originalPrice: 159.0,
    sales: 520,
    l1: '33',
    l2: 'single'
  },
  {
    id: 6,
    title: '代肝任务 · 基础保底',
    intro: '任务代做与进度推进：按目标拆解，阶段反馈，保底完成。',
    cover: '/goods-2.png',
    images: ['/goods-2.png', '/goods-1.png'],
    price: 129.0,
    originalPrice: 199.0,
    sales: 334,
    l1: 'grind',
    l2: 'basic'
  }
]

export function getGoodsById(id: number) {
  return GOODS.find((g) => g.id === id)
}

