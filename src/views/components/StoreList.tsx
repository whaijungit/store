import React from 'react'
import { Table } from 'antd'
import { ColumnType, TablePaginationConfig } from 'antd/lib/table'

interface StoreListProps<T = any> {
  data?: T[]
  title?: string
  loading?: boolean
  columns?: ColumnType<T>[]
  onChange?: (tablePagnation: TablePaginationConfig) => void
}

const StoreList: React.FC<StoreListProps> = (props) => {
  return (
    <Table
      rowKey={'id'}
      rowSelection={{}}
      columns={props.columns}
      dataSource={props.data}
      loading={props.loading}
      onChange={props.onChange}
      scroll={{ x: 370, y: 600 }}
    />
  )
}

function StoreListContainer<T = any>(defaultState: StoreListProps<T>) {
  return <StoreList data={defaultState.data} title={defaultState.title} columns={defaultState.columns} loading={defaultState.loading} />
}

export default StoreListContainer