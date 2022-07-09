import { exec } from 'child_process'
import { Table, Tag } from 'antd'

const PopList: React.FC = () => {
  return (
    <Table
      rowKey={'order'}
      columns={[{
        title: '单号',
        dataIndex: 'order',
        render: (_) => {
          return (
            <Tag style={{ cursor: 'pointer' }} color='blue' onMouseDown={(e) => {
              if (e.button === 2) {
                exec('chrome https://www.kuaidi100.com/all/')
              }
            }}>{_}</Tag>
          )
        }
      }]}
      dataSource={[{
        order: '01920391023123'
      }]}
    ></Table>
  )
}

export default PopList