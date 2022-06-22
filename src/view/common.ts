import { ColumnType } from 'antd/lib/table';

/**
 * 自定义columns 继承ColumnType
 * 方便添加元数据进行操作
 */
export interface CustmizerColumnType<T> extends ColumnType<T> {
  ediable?: boolean
  required?: boolean
  type?: 'file' | 'number' | 'timer' | 'text'
}

export enum OperationType {
  add = '新增',
  edit = '修改',
  delete = '删除',
}

/** 操作返回值 */
export interface OperationResult<T> {
  type: OperationType
  data: T[]
  status: boolean
  total: number
}

export const resetLabel = (key: LOCA_KEY) => {
  switch (key) {
    case 'production':
      return '产品'
    case 'pop_store':
      return '出货'
    case 'push_store':
      return '入货'
    case 'store':
      return '仓库'
  }
}