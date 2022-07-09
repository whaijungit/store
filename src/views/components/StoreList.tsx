import React from 'react'
import { Table } from 'antd'
import { TableRowSelection } from 'antd/lib/table/interface'
import { ColumnType, TablePaginationConfig } from 'antd/lib/table'

interface StoreListProps<T = any> {
  data?: T[]
  loading?: boolean
  EditableCell?: any
  title?: () => React.ReactNode
  pagination?: TablePaginationConfig
  rowSelection?: TableRowSelection<T>
  onChange?: (page: number, pageSize: number) => void
  columns?: (ColumnType<T> | ColumnType<T> & { editable: boolean })[]
}

const StoreList: React.FC<StoreListProps> = (props) => {
  return (
    <Table
      bordered
      components={{
        body: {
          cell: props.EditableCell
        }
      }}
      rowKey={'id'}
      title={props.title}
      columns={props.columns}
      dataSource={props.data}
      loading={props.loading}
      scroll={{ x: 460, y: 400 }}
      pagination={props.pagination}
      rowSelection={props.rowSelection}
    />
  )
}

function StoreListContainer<T = any>(defaultState: StoreListProps<T>) {
  return <StoreList
    data={defaultState.data}
    title={defaultState.title}
    columns={defaultState.columns}
    loading={defaultState.loading}
    pagination={defaultState.pagination}
    EditableCell={defaultState.EditableCell}
    rowSelection={defaultState.rowSelection}
  />
}

export default StoreListContainer