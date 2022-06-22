import React from 'react';
import FormProduction from './form';
import Store from '@/services/store';
import base64 from '@/services/base64';
import EditableCell from './editableCell';
import { useForm } from 'antd/lib/form/Form';
import StoreServices from '@/services/store-services';
import { CheckCircleOutlined } from '@ant-design/icons';
import { CustmizerColumnType, resetLabel } from '../common';
import {
  Tag,
  Form,
  Image,
  Space,
  Table,
  Input,
  message,
  Typography,
  Popconfirm,
  Button,
} from 'antd';
import { RowSelectMethod, TableRowSelection } from 'antd/lib/table/interface';


const { Text } = Typography

interface ProductionListProps {
  title: LOCA_KEY;
  onOperation:(type: LOCA_KEY,prodction: Production|Production[])=>void
}

const App: React.FC<ProductionListProps> = (props) => {
  const [form] = useForm<Production>();
  const [keyWorld, setKeyWorld] = React.useState('');
  const [data, setData] = React.useState<Production[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [editingKey, setEditingKey] = React.useState<string>('');
  const [chooseProductions, setChooseProductions] = React.useState<
    Production[]
    >([]);
  React.useEffect(() => {
    const fetch = async () => {
      fetchData(await getDatas());
    };
    fetch();
  }, []);
  const getDatas = async () => {
    return await StoreServices.get<Production>(props.title);
  };
  const isEditing = (prodction: Production) => prodction.id === editingKey;
  // 重新设置data
  const fetchData = async (datas: Production[]) => {
    setTimeout(() => {
      setData(datas);
      setLoading(false);
    }, 300);
  };

  const handleSubmitCatch = () => {
    message.error('数据录入失败');
  };
  const handleSubmitSuccess = async (data: Production): Promise<boolean> => {
    return await Store.set<Production>('production', data).then(
      ({ status, data }) => {
        if (status) {
          message.success(<Tag>{'添加成功,已经存储' + data.length + '条'}</Tag>);
          setData(data);
        }
        return status;
      }
    );
  };
  const handleEditSave = async (key: string, recrod: Production) => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      if ((values.poster as any).file.originFileObj) {
        values.poster = await base64((values.poster as any).file.originFileObj);
        values.size = +values.size;
        const { status } = await StoreServices.edit('production', key, values);
        if (status) {
          message.success('修改成功');
          fetchData(await getDatas());
        }
      }
    } catch (err) {
      message.warning('请输入必填项');
    } finally {
      setEditingKey('');
      setLoading(false);
    }
  };
  const edit = (prodction: Production) => {
    form.setFieldsValue({ ...prodction });
    setEditingKey(prodction.id);
  };
  const cancel = () => {
    setEditingKey('');
  };
  // 删除全部商品
  const handleDeleteAll = async () => {
    if (chooseProductions.length) {
       setLoading(true)
      const result = await Store.delete<Production>('id', props.title, chooseProductions)
      await fetchData(result.data)
      const number = (result.item as any).length
      message.success(`已删除所选${number}个产品`)
      setChooseProductions([])
      return
    }
    message.warn('请选择产品')
   
  };

  const handleDeleteOne = async (prodction: Production) => {
    setLoading(true);
    const result = await Store.delete('id', props.title, prodction);
    console.log(result);
    if (result.status) {
      message.success('删除了 1 条数据');
      fetchData(await getDatas());
      return;
    }
    message.error('删除失败');
    setLoading(false);
  };
  // form 验证出现问题
  const handleVildataError = () => {
    message.warning('请输入必填项');
  };
  const handleSelection = (chooseRows:Production[],type: RowSelectMethod) => {
    if (type === 'all') {
      setChooseProductions(chooseRows)
    } else if (type === 'single') {
      setChooseProductions(chooseRows)
    }
  }
  
  const handleSearch = async (value: string) => {
    setLoading(true);
    const newState: Set<Production> = new Set<Production>;
    const list = await Store.get<Production>(props.title);
    for (const production of list) {
      for (const key in production) {
        if (production[key] == value) {
          newState.add(production);
        }
      }
    }
    setTimeout(() => {
      setData([...newState]);
      setLoading(false);
      setKeyWorld('');
    }, 500);
  };

  const selection: TableRowSelection<Production> = {
    onChange(r,rows,{type}) {
      handleSelection(rows, type)
      setChooseProductions(rows)
    },
  }
  const columns: CustmizerColumnType<Production>[] = [
    {
      title: '图片',
      align: 'center',
      type: 'file',
      width: 100,
      required: true,
      ediable: true,
      dataIndex: 'poster',
      render(url) {
        return (
          <Image placeholder="点击预览" width={50} height={50} src={url} />
        );
      },
    },
    {
      title: '型号',
      width: 100,
      required: true,
      ediable: true,
      align: 'center',
      dataIndex: 'series',
    },
    {
      title: '名称',
      width: 100,
      required: true,
      ediable: true,
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: '尺寸',
      width: 100,
      ediable: true,
      align: 'center',
      dataIndex: 'size',
    },
    {
      title: '颜色',
      width: 100,
      required: true,
      ediable: true,
      align: 'center',
      dataIndex: 'color',
    },
    {
      title: '材质',
      width: 100,
      align: 'center',
      ediable: true,
      required: true,
      dataIndex: 'textureMaterial',
    },
    {
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 110,
      dataIndex: 'id',
      render(_, recrod) {
        const editable = isEditing(recrod);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => handleEditSave(recrod.id, recrod)}
              style={{ marginRight: 8 }}
            >
              保存
            </Typography.Link>
            <Typography.Link onClick={cancel} style={{ marginRight: 8 }}>
              取消
            </Typography.Link>
          </span>
        ) : (
          <Space>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(recrod)}
            >
              编辑
            </Typography.Link>
            <Typography.Link disabled={editingKey !== ''}>
              <Popconfirm
                style={{ width: 100 }}
                placement="top"
                title={'确定要删除嘛?'}
                onConfirm={async () => handleDeleteOne(recrod)}
                okText="确定"
                  cancelText="取消"
              >
                删除
              </Popconfirm>
            </Typography.Link>
          </Space>
        );
      },
    },
  ];
  const mergedColumns: any[] = columns.map((col) => {
    if (!col.ediable) {
      return col;
    }
    return {
      ...col,
      onCell: (prodction: Production) => ({
        recrod: prodction,
        title: col.title,
        required: col.required,
        dataIndex: col.dataIndex,
        editing: isEditing(prodction),
        type: col.dataIndex === 'poster' ? 'file' : '',
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <FormProduction
        formFields={columns}
        onSumit={handleSubmitSuccess}
        onSubmitCatch={handleSubmitCatch}
        onValidateError={handleVildataError}
      ></FormProduction>
      <Table
        bordered
        rowKey={'id'}
        loading={loading}
        dataSource={data}
        columns={mergedColumns}
        className="editable-row"
        rowSelection={selection}
        scroll={{ x: 375, y: 600 }}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        title={() => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Tag
                style={{ flex: '0 0 10px', height: 22 }}
                icon={<CheckCircleOutlined />}
                color={'blue'}
                children={resetLabel(props.title)}
              />
              <Space className="contorls" style={{ flex: '1 1 1' }}>
                <Button
                  size="small"
                  onClick={() => {
                    props.onOperation&&props.onOperation('pop_store',chooseProductions)
                  }}
                >
                  出货
                </Button>
                 <Button
                  size="small"
                  onClick={() => {
                    props.onOperation&&props.onOperation('push_store',chooseProductions)
                  }}
                >
                  入货
                </Button>
                <Popconfirm
                style={{ width: 100 }}
                placement="top"
                title={'确定要删除嘛?'}
                onConfirm={handleDeleteAll}
                okText="确定"
                cancelText="取消"
              >
                <Button
                  size="small"
                  children="删除"
                />
              </Popconfirm>
              </Space>
              <Input
                
                value={keyWorld}
                placeholder="请输入查询关键字"
                style={{ flex: '0 0 30%' }}
                onChange={async (e) => {
                  setKeyWorld(e.target.value);
                }}
                onPressEnter={(e) => {
                  handleSearch((e.target as any).value);
                }}
              ></Input>
            </div>
        )}
        pagination={{ pageSize: 5, position: ['bottomCenter'] }}
      ></Table>
    </Form>
  );
};

export default App;
