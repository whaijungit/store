import { ReactKeys } from '..'
import EditableCell from './EditableCell'
import { useForm } from 'antd/lib/form/Form'
import React, { SetStateAction } from 'react'
import ProductionServices from '@/common/services'
import { ScheduleOutlined } from '@ant-design/icons'
import StoreListContainer from '../../components/StoreList'
import { TableRowSelection } from 'antd/lib/table/interface'
import StoreForm, { InputType } from '../../components/StoreForm'
import { ColumnType, TablePaginationConfig } from 'antd/lib/table'
import { Button, Form, Image, Input, message, Popconfirm, Space, Tag } from 'antd'

export interface FormItem {
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
  setKeys: React.Dispatch<SetStateAction<ReactKeys[]>>
  onPopProduction?: (chooseProductions: Production[]) => void
  onPushProduction?: (chooseProductions: Production[]) => void
}

const ProductionList: React.FC<ProductionListProps> = ({ setKeys, onPopProduction, onPushProduction }) => {
  const handlePageChange = (newPage: number, pageSize: number) => {
    cancel()
    setLoading(true)
    setTimeout(() => {
      setPagination({ ...pagination, current: newPage, pageSize })
      setLoading(false)
    }, 200);
  }
  const [form] = useForm<Production>()
  const [key, setKey] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [editingKey, setEditingKey] = React.useState('')
  const [data, setData] = React.useState<Production[]>([])
  const isEditing = (production: Production) => production.id === editingKey
  const [chooseProductions, setChooseProductions] = React.useState<Production[]>([])
  const [pagination, setPagination] = React.useState<TablePaginationConfig>({ current: 1, total: 0, pageSize: 4, onChange: handlePageChange, position: ['bottomCenter'] })
  const edit = (item: Production) => {
    form.setFieldsValue({ ...item });
    setEditingKey(item.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (item: Production) => {
    let isEditable = false
    try {
      let prop: keyof Production
      const values = await form.validateFields()
      for (prop in values) {
        if (item[prop] != values[prop]) {
          isEditable = true
          console.log(item[prop], values[prop]);
        }
      }
      if (isEditable) {
        await ProductionServices.edit(item.poster, item.id, values)
        await fetchData()
      }
    } catch (error) {
      message.warning('请输入必填项')
    } finally {
      setEditingKey('')
    }
  };

  React.useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    setLoading(true)
    const list = await ProductionServices.fetch()
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
      width: 100,
      title: '型号',
      editable: true,
      align: 'center',
      dataIndex: 'series',
      render: (_) => <Tag color='blue' children={_} />
    },
    {
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
      render: (_) => ((+_) ?? null)
    },
    {
      align: 'center',
      title: '操作',
      fixed: 'right',
      width: 120,
      dataIndex: 'id',
      render: (_, production) => {
        return isEditing(production) ? (
          <Space>
            <Button size='small' onClick={() => save(production)}>
              保存
            </Button>
            <Popconfirm title="确定要取消保存嘛？" cancelText="取消" okText="确定" onConfirm={() => setEditingKey('')}>
              <Button size='small'>取消</Button>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Button disabled={editingKey !== ''} onClick={() => edit(production)} type="default" size="small">编辑</Button>
            <Popconfirm disabled={editingKey !== ''} placement='bottom' cancelText="取消" okText="确定" title="真的要删除嘛？" onConfirm={async () => {
              await ProductionServices.remove(_)
              await fetchData()
              message.success('删除成功')
            }}>
              <Button disabled={editingKey !== ''} danger size="small">删除</Button>
            </Popconfirm>
          </Space>
        );
      }
    }
  ]
  const columnsMerge: any = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (item: Production) => {
        return {
          record: item,
          title: col.title,
          dataIndex: col.dataIndex,
          editing: isEditing(item),
          type: col.dataIndex === 'poster' ? 'file' : 'text',
        }
      }
    }
  })
  const rowSelection: TableRowSelection<Production> = {
    onChange(keys, rowKeys, info) {
      if (rowKeys.length) {
        setChooseProductions(rowKeys)
      }
    },
    columnWidth: 33
  }
  const handleOperation = async (type: 'pop' | 'push' | 'delete') => {
    if (!chooseProductions.length) {
      message.info('请选择商品', 0.6)
      return
    }
    switch (type) {
      case 'delete':
        await ProductionServices.removes(chooseProductions)
        await fetchData()
        message.success('成功删除商品' + chooseProductions.length + '件')
        setChooseProductions([])
        break;
      case 'pop':
        setKeys(['pop'])
        message.info('已选择出货数量' + chooseProductions.length + '件')
        onPopProduction && onPopProduction(chooseProductions)
        break
      case 'push':
        setKeys(['push'])
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
        if (prop === 'poster' || prop === 'id') {
          continue
        }
        if ((production[prop]).toString().toLocaleLowerCase().includes(key)) {
          newState.add(production);
        }
      }
    }
    setTimeout(() => {
      setLoading(false)
      setData([...newState])
    }, 300);
  }
  const title = (): React.ReactNode => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Space size={8} align="center" direction="horizontal">
          <Tag color='blue' icon={<ScheduleOutlined />}>产品</Tag>
          <Button size='small' onClick={() => handleOperation('push')}>入库</Button>
          <Button size='small' onClick={() => handleOperation('delete')}>删除</Button>
        </Space>
        <div>
          <Space>
            <Input
              value={key}
              onChange={(e) => {
                setKey(e.target.value)

              }}
              onPressEnter={handleSearch}
              style={{ width: '10em' }}
              placeholder='请输入关键字'
            />
            <Button onClick={() => {
              fetchData()
            }}>重置</Button>
          </Space>
        </div>
      </div>
    )
  }
  const list = StoreListContainer<Production>({ data, loading, pagination, columns: columnsMerge, rowSelection, EditableCell: EditableCell, title })
  return (
    <Form form={form} component={false}>
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
          if (typeof produc.size === 'undefined') {
            // @ts-ignore
            produc.size = ""
          }
          produc.size = +produc.size
          try {
            const result = await ProductionServices.save(produc)
            const current: number = Math.ceil(pagination.total! / pagination.pageSize!)
            setPagination({ ...pagination, current },)
            return result
          } catch (error) {
            return false
          }

        }} formItem={formItem}></StoreForm>
      {list}
    </Form>
  )
}

export default ProductionList