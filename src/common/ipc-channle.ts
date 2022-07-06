export enum IpcRequestEventName {
  /** 保存一个商品 channle_id */
  SAVE_PRODUCTION = 'save-produciton',
  /** 删除一个商品 channle_id */
  DELETE_PRODUCTION = 'delete-production',
  /** 保存一条出货记录 */
  SAVE_POP_PROUDCITON = 'save-pop-production',
  delete_POP_PROUDCITON = 'delete-pop-production',
  /** 保存一条入库记录 */
  SAVE_PUSS_STOR_PRODUCTION = 'save-push-store-production',
  DETETE_PUSS_STOR_PRODUCTION = 'delete-push-store-production',
}

export enum IpcResponseEventName {
  /** 成功保存商品 channle_id */
  SAVE_STATUS_PRODUCTION = 'success-status-produciton',
  /** 删除 channle_id */
  DELETE_STATUS_PRODUCTION = 'delete-status-production',
}

export type IPCChannle = IpcRequestEventName | IpcResponseEventName