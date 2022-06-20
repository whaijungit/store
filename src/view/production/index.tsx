import React from 'react';
import FormProduction from './form';
import {
  Tag,
  Form,
  Image,
  Space,
  Table,
  message,
  Typography,
  Popconfirm,
} from 'antd';
import base64 from '@/services/base64';
import EditableCell from './editableCell';
import { useForm } from 'antd/lib/form/Form';
import StoreServices from '@/services/store-services';
import { CheckCircleOutlined } from '@ant-design/icons';
import { CustmizerColumnType, resetLabel } from '../common';

interface ProductionListProps {
  title: LOCA_KEY;
}

const App: React.FC<ProductionListProps> = (props) => {
  const [form] = useForm<Production>();
  const [data, setData] = React.useState<Production[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [editingKey, setEditingKey] = React.useState<string>('');
  const isEditing = (prodction: Production) => prodction.id === editingKey;
  const fetchData = async () => {
    const datas = await StoreServices.get<Production>(props.title);
    setData(datas);
    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  const handleSubmitCatch = () => {
    message.error('数据录入失败');
  };
  const handleSubmitSuccess = async (data: Production): Promise<boolean> => {
    return await StoreServices.set<Production>('production', data).then(
      ({ status, data, total }) => {
        if (status) {
          message.success(<Tag>{'添加成功,已经存储' + total + '条'}</Tag>);
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
          fetchData();
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
  const handleDelete = async (data: Production) => {
    setLoading(true);
    const result = await StoreServices.delete('production', data);
    if (result) {
      message.success('删除成功');
      setData(await StoreServices.get<Production>('production'));
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const handleVildataError = () => {
    message.warning('数据验证失败');
  };
  const columns: CustmizerColumnType<Production>[] = [
    {
      title: '图片',
      align: 'center',
      type: 'file',
      width: 150,
      required: true,
      ediable: true,
      dataIndex: 'poster',
      render(url) {
        return <Image placeholder="预览" width={50} height={50} src={url} />;
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
      width: 120,
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
                onConfirm={() => handleDelete(recrod)}
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
        onSubmitCatch={handleSubmitCatch}
        onValidateError={handleVildataError}
        onSumit={handleSubmitSuccess}
        formFields={columns}
      ></FormProduction>
      <Table
        bordered
        rowKey={'id'}
        className="editable-row"
        loading={loading}
        dataSource={data}
        columns={mergedColumns}
        scroll={{ x: 400, y: 600 }}
        pagination={{ pageSize: 5, position: ['bottomCenter'] }}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        title={() => (
          <Tag
            icon={<CheckCircleOutlined />}
            color={'blue'}
            children={resetLabel(props.title)}
          />
        )}
      ></Table>
    </Form>
  );
};

export default App;
