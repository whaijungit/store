declare var api: API

type API = ElectronAPI & NativeAPI

interface ElectronAPI {
  ipcRenderer: () => import('electron').IpcRenderer
  clipboard: () => import('electron').Clipboard
}

interface NativeAPI {
  fs: typeof import('fs')
  os: typeof import('os')
  path: typeof import('path')
}

interface Window {
  electronAPI: ElectronAPI
  nodeAPI: NativeAPI
}

/** 产品一条记录 */
declare interface Production {
  /**
  * 产品图片
  */
  poster: string
  /**
   * 产品id
   */
  id: string,
  /**
   * 产品系列
   */
  series: string
  /**
   * 产品名称
   */
  name: string
  /** 
   * 产品尺寸 
   */
  size: number
  /**
   * 产品颜色
   */
  color: Color
  /**
   * 材质
   */
  textureMaterial: string
}

/** 出货一条记录 */
declare interface PopProduction {
  id: string
  /** @description 单号 */
  order: string
  /** @description 出货时间 */
  timer: Timer
  /** @description 出货数量 */
  number: number
  /** @description 收货地址及联系人 */
  /** @description 收货地址 */
  address: string
  /** @description 联系人 */
  concat: string
  /** @description 运费 */
  cost: number
  /** @description 结算 */
  settlement: number
  /** @description 贷款 */
  loan: number
  /** @description 发货地 */
  publishAddress: string
  /** @description 签收时间 */
  signingTimer: Timer
  /** 别名 */
  nickName: string
  /** 电话号 */
  phone: string
  /** 产品 */
  production: Production | Production[]
}

/** 入库一条记录 */
declare interface PushProducitonStore {
  id?: string
  /**
   * 入货时间
   */
  timer: Timer
  /**
   * 入货数量
   */
  number: number
  /**
   * 入货到达时间
   */
  dist: string
  /**
   * 入货产品
   */
  production: Production
  /**
   * 入货备注
   */
  description: string
}

declare interface StoreResult {
  /** 数据总量 */
  total: number
  /** 操作是否成功 */
  status: boolean
  /** 操作附加信息 */
  message: string
  /** 操作类型 */
  type: OperationType
  /** 当前操作项 */
  item?: Production | PopProduction | PopProductionStore
  /** 返回的总集合 */
  data: (Production | PopProduction | PushProducitonStore)[]
}

declare enum OperationType {
  add = '新增',
  init = 'init',
  edit = '编辑',
  delete = '删除',
}