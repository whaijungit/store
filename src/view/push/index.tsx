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
  const [data, setData] = React.useState<PushProduction[]>([]);
  const [searchData, setSearchData] = React.useState<PushProduction[]>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setLoading(true);
    StoreServices.get<PushProduction>('pop_store').then((pops) => {
      setTimeout(() => {
        setLoading(false);
        setData(pops);
      }, 500);
    });
  }, []);
  const handleSearch = (value: string) => {};
  const columns: CustmizerColumnType<PushProduction>[] = [
    {
      title: '入货时间',
      dataIndex: 'timer',
      align: 'center',
      render(_, recrod) {
        return (
          recrod.timer.year + '/' + recrod.timer.month + '/' + recrod.timer.deay
        );
      },
    },
    {
      title: '数量',
      dataIndex: 'number',
      align: 'center',
    },
    {
      title: '到达时间',
      dataIndex: 'dist',
      align: 'center',
    },
    {
      title: '产品',
      dataIndex: 'production',
      align: 'center',
      render(_, recrod) {
        return recrod.production.series;
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
