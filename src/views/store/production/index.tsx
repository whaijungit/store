import React from 'react'
import { ScheduleOutlined } from '@ant-design/icons'
import StoreListContainer from '../../components/StoreList'
import { TableRowSelection } from 'antd/lib/table/interface'
import StoreForm, { InputType } from '../../components/StoreForm'
import { ColumnType, TablePaginationConfig } from 'antd/lib/table'
import { Button, Image, Input, message, Popconfirm, Space, Tag } from 'antd'
import { getProduction, removeProduction, removeProductions, saveProduction } from '@/common/services'

interface FormItem {
  type: InputType
  label: string
  name: string
  required: boolean
}

const formItem: Array<FormItem> = [
  { label: '名称', name: 'name', required: true, type: 'text' },
  { label: '型号', name: 'series', required: true, type: 'text' },
  { label: '材质', name: 'textureMaterial', required: true, type: 'text' },
  { label: '颜色', name: 'color', required: true, type: 'text' },
  { label: '尺寸', name: 'size', required: false, type: 'text' },
  { label: '图片', name: 'poster', required: true, type: 'file' },
]

interface ProductionListProps {
  onPopProduction?: (chooseProductions: Production[]) => void
  onPushProduction?: (chooseProductions: Production[]) => void
}

const ProductionList: React.FC<ProductionListProps> = ({ onPopProduction, onPushProduction }) => {
  const handlePageChange = (newPage: number, pageSize: number) => {
    setLoading(true)
    setPagination({ ...pagination, current: newPage, pageSize })
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }
  const [key, setKey] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [editingKey, setEditingKey] = React.useState('')
  const [data, setData] = React.useState<Production[]>([])
  const [chooseProductions, setChooseProductions] = React.useState<Production[]>([])
  const [pagination, setPagination] = React.useState<TablePaginationConfig>({ current: 1, total: 0, pageSize: 4, onChange: handlePageChange, position: ['bottomCenter'] })
  const isEditing = (production: Production) => production.id === editingKey
  const save = async (id: string) => {
    setEditingKey('')
  }
  React.useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    setLoading(true)
    const list = await getProduction()
    setTimeout(() => {
      setLoading(false)
      setPagination({ ...pagination, total: list.length })
      setData(list)
    }, 500)
  }
  const columns: (ColumnType<Production> & { editable?: boolean })[] = [
    {
      title: '图片',
      dataIndex: 'poster',
      fixed: 'left',
      width: 100,
      editable: true,
      align: 'center',
      render: (_) => <Image width={50} height={50} src={_} />
    },
    {
      title: '名称',
      width: 100,
      editable: true,
      dataIndex: 'name',
      align: 'center',
      render: (_) => _
    },
    {
      title: '型号',
      width: 100,
      align: 'center',
      dataIndex: 'series',
      render: (_) => <Tag color='blue' children={_} />
    }, {
      width: 100,
      editable: true,
      title: '颜色',
      align: 'center',
      dataIndex: 'color',
      render: (_) => _
    },
    {
      align: 'center',
      title: '材质',
      width: 100,
      editable: true,
      dataIndex: 'textureMaterial',
      render: (_) => _
    },
    {
      align: 'center',
      title: '尺寸',
      width: 80,
      editable: true,
      dataIndex: 'size',
      render: (_) => _ == 0 ?? null
    },
    {
      align: 'center',
      title: '操作',
      fixed: 'right',
      width: 130,
      dataIndex: 'id',
      render: (_, production) => {
        return isEditing(production) ? (
          <Space>
            <Button size='small' onClick={() => save(production.id)}>
              保存
            </Button>
            <Popconfirm title="确定要取消保存嘛？" cancelText="取消" okText="确定" onConfirm={() => setEditingKey('')}>
              <Button size='small'>取消</Button>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Button onClick={() => setEditingKey(production.id)} type="default" size="small">编辑</Button>
            <Popconfirm placement='bottom' cancelText="取消" okText="确定" title="真的要删除嘛？" onConfirm={async () => {
              await removeProduction(_)
              await fetchData()
              message.success('删除成功')
            }}>
              <Button danger size="small">删除</Button>
            </Popconfirm>
          </Space>

        );

      }
    }
  ]
  const rowSelection: TableRowSelection<Production> = {
    onChange(keys, rowKeys, info) {
      setChooseProductions(rowKeys)
    },
  }
  const handleOperation = async (type: 'pop' | 'push' | 'delete') => {
    if (!chooseProductions.length) {
      message.info('请选择商品', 0.6)
      return
    }
    switch (type) {
      case 'delete':
        await removeProductions(chooseProductions)
        await fetchData()
        message.success('成功删除商品' + chooseProductions.length + '件')
        setChooseProductions([])
        break;
      case 'pop':
        message.info('已选择出货数量' + chooseProductions.length + '件')
        onPopProduction && onPopProduction(chooseProductions)

        break
      case 'push':
        message.info('已选择入库数量' + chooseProductions.length + '件')
        onPushProduction && onPushProduction(chooseProductions)
        break
    }
  }
  const handleSearch = () => {
    setLoading(true)
    const newState = new Set<Production>();
    for (const production of data) {
      let prop: keyof Production
      for (prop in production) {
        if (production[prop] == key) {
          newState.add(production);
        }
      }
    }
    setLoading(false)
    setData([...newState])
  }
  const title = (): React.ReactNode => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Space size={4} align="center" direction="horizontal">
          <Tag color='blue' icon={<ScheduleOutlined />}>产品</Tag>
          <Button size='small' onClick={() => handleOperation('pop')}>出货</Button>
          <Button size='small' onClick={() => handleOperation('push')}>入库</Button>
          <Button size='small' onClick={() => handleOperation('delete')}>删除</Button>
        </Space>
        <Input.Search
          value={key}
          onBlur={() => {
            fetchData()
            setKey('')
          }}
          onChange={(e) => {
            setKey(e.target.value)
          }}
          onPressEnter={handleSearch}
          style={{ width: '10em' }}
          placeholder='请输入关键字'
        />
      </div>
    )
  }
  const list = StoreListContainer<Production>({ data, loading, pagination, columns, rowSelection, title })
  return (
    <>
      <StoreForm
        onValidateFailed={() => {
          message.warning('请输入必填项')
        }}
        onSubmitSuccess={async () => {
          message.success('添加成功')
          await fetchData()
        }}
        onSubmit={async (values) => {
          const produc = values as Production
          produc.size = 0
          produc.size = +produc.size
          try {
            return await saveProduction(produc)
          } catch (error) {
            return false
          }

        }} formItem={formItem}></StoreForm>
      {list}
    </>
  )
}

export default ProductionList