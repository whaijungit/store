/** 产品颜色 */
declare type Color = string
/** 型号 */
declare type Series = string[]

declare type Keys = "仓库" | "入货" | "出货"

declare type SetState<A> = React.Dispatch<React.SetStateAction<A>>


/** 时间 */
declare type Timer = {
  /** 年 */
  year: number
  /** 月 */
  month: number
  /** 日 */
  deay: number
}

/** localStorage 添加数据时返回结果集 */
interface SetListResult<T> {
  /**
   * 结果集
   */
  data: T[]
  /**
   * 状态 true 写入成功 false 写入失败
   */
  status: boolean
  /**
   * 数据总量
   */
  total: number
}



/** 按日期搜索条件 */
interface ConditionTimer {
  /**
   * 开始天
   */
  bd: number
  /**
   * 结束天
   */
  ed: number
}

/** 查找结果 */
interface FindResult<T> {
  /**
   * 结果集
   */
  data: T
  /**
   * 是否查询到数据
   */
  status: boolean
  /**
   * 数据总量
   */
  total: number
}
/** localStoreage 存储的三种数据为 总库记录 出库记录 入库记录 型号 */
declare type LOCA_KEY = 'production' | 'pop_store' | 'push_store' | 'store' | 'series'
declare interface Store {
  id?: string
  series: string
  number: number
}
/**
 * 一条产品的记录
 */
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

/** @description 出货的一条记录 */
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

/**
 * 入货记录 一条记录
 */
declare interface PushProduction {
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

/**
 * localStoreage 中存储的三种 总库记录 出库记录 入库记录
 */
declare type StoreProduction = Production | PushProduction | PopProduction

/** 型号查找 */
declare interface SeriesCondition {
  /** 类型值 */
  series: string
}

/** 时间查找 */
declare interface TimerCondition {
  /** 起始时间 */
  deay1: number
  /** 结束时间 */
  deay2: number
}

declare interface Moment {
  year(): number
  /** 月 */
  month(): number
  /** 日 */
  date(): number
}