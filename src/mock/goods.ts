export type Goods = {
  id: number
  title: string
  intro: string
  detail?: string
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
    detail:
      '服务内容：队滅上分护航 + 关键局保底\n' +
      '适用人群：想稳步冲分、时间不固定的老板\n' +
      '交付方式：按局/按阶段反馈，沟通战术与天赋搭配\n' +
      '注意事项：请提前告知段位/常用角色/是否语音',
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
    detail:
      '服务内容：守滅浪上分护航（效率优先）\n' +
      '玩法特点：节奏控制、关键点位细节拉满\n' +
      '可选项：战术局/指定阵容/复盘建议',
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
    detail:
      '服务内容：跑刀路线带练 + 基础打法讲解\n' +
      '适用人群：想快速上手跑刀、需要效率路线\n' +
      '说明：福利价限时，可能会排队',
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
    detail:
      '服务内容：指定材料/道具速刷\n' +
      '交付方式：按清单交付，途中可实时同步进度\n' +
      '注意事项：请提供材料名称/数量/优先级',
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
    detail:
      '服务内容：33 赌单冲分挑战\n' +
      '玩法特点：强对抗、快节奏、强调执行\n' +
      '说明：请提前确认网络/设备/语音环境',
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
    detail:
      '服务内容：周常/日常/指定任务代做\n' +
      '交付方式：阶段截图/文字反馈，遇到卡点先沟通\n' +
      '注意事项：请说明目标、截止时间、账号规则',
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

