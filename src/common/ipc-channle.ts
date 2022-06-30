export enum IpcRequestEventName {
  /** 保存一个商品 channle_id */
  SAVE_PRODUCTION = 'save-produciton',
  /** 删除一个商品 channle_id */
  DELETE_PRODUCTION = 'delete-production',
}

export enum IpcResponseEventName {
  /** 成功保存商品 channle_id */
  SAVE_STATUS_PRODUCTION = 'success-status-produciton',
  /** 删除 channle_id */
  DELETE_STATUS_PRODUCTION = 'delete-status-production',
}

export interface IPCChannle {
  name: IpcRequestEventName | IpcResponseEventName 
}