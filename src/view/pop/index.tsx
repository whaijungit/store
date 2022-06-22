import React from 'react';
import FormProduction from './form';
import { Input, Table, Tag } from 'antd';
import { CustmizerColumnType } from '../common';
import StoreServices from '@/services/store-services';
import { CheckCircleOutlined } from '@ant-design/icons';

export interface AppProps {
  title: LOCA_KEY;
  production: Production | Production[];
}

const App: React.FC<AppProps> = (props) => {
  const [data, setData] = React.useState<PopProduction[]>([]);
  const [searchData, setSearchData] = React.useState<PopProduction[]>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setLoading(true);
    StoreServices.get<PopProduction>('pop_store').then((pops) => {
      setTimeout(() => {
        setLoading(false);
        setData(pops);
      }, 500);
    });
  }, []);
  const handleSearch = (value: string) => {};
  const columns: CustmizerColumnType<PopProduction>[] = [
    {
      title: '单号',
      fixed: 'left',
      align: 'center',
      dataIndex: 'order',
      width: 150,
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: '产品',
      fixed: 'left',
      align: 'center',

      dataIndex: 'production',
      width: 150,
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: '时间',
      align: 'center',
      width: 100,
      type: 'timer',
      dataIndex: 'timer',
      render(_, recrod) {
        return (
          recrod.timer.year + '/' + recrod.timer.month + '/' + recrod.timer.deay
        );
      },
    },
    {
      align: 'center',
      title: '数量',
      width: 100,
      dataIndex: 'number',
    },
    {
      align: 'center',
      title: '地址&联系人',
      className: 'order',
      width: 150,
      dataIndex: 'receivingAddressOrConcat',
      render(_, recrod) {
        // return ''
        return recrod.address + ' ' + recrod.concat;
      },
    },
    {
      align: 'center',
      title: '运费',
      width: 100,
      dataIndex: 'cost',
      render(_, recrod) {
        return recrod.cost;
      },
    },
    {
      align: 'center',
      title: '结算',
      width: 100,
      dataIndex: 'settlement',
      render(_, recrod) {
        return recrod.settlement;
      },
    },
    {
      align: 'center',
      title: '贷款',
      width: 100,
      dataIndex: 'loan',
      render(_, recrod) {
        return recrod.loan;
      },
    },
    {
      align: 'center',
      title: '发货地',
      width: 100,
      dataIndex: 'publishAddress',
      render(_, recrod) {
        return recrod.publishAddress;
      },
    },
    {
      align: 'center',
      title: '签收时间',
      width: 150,
      dataIndex: 'signingTimer',
      type: 'timer',
      render(_, recrod) {
        const timer = recrod.signingTimer;
        return timer.year + '/' + timer.month + '/' + timer.deay;
      },
    },
    {
      align: 'center',
      title: '备注',
      width: 100,
      dataIndex: 'description',
      render(_, recrod) {
        return recrod.nickName + ' ' + recrod.phone;
      },
    },
  ];
  return (
    <>
      <FormProduction formFields={columns}></FormProduction>
      <Table
        bordered
        rowKey={'id'}
        className="editable-row"
        loading={loading}
        dataSource={searchData.length ? searchData : data}
        columns={columns}
        scroll={{ x: 375, y: 600 }}
        pagination={{ pageSize: 5, position: ['bottomCenter'] }}
        components={{
          body: {
            // cell: EditableCell,
          },
        }}
        title={() => (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Tag
                style={{ height: 25 }}
                icon={<CheckCircleOutlined />}
                color={'blue'}
                children={'出货'}
              />
              <div className="" style={{ width: '200px' }}>
                <Input.Search
                  placeholder="请输入关键字"
                  onPressEnter={(e) => handleSearch((e.target as any).value)}
                />
              </div>
            </div>
          </>
        )}
      ></Table>
    </>
  );
};

export default App;
