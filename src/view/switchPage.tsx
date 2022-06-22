import { Tabs } from 'antd';
import React from 'react';
import PopProduction from './pop';
import PushProduction from './push';
import Production from './production';

const { TabPane } = Tabs;

const SwtichPage: React.FC = () => {
  const [title, setTitle] = React.useState<LOCA_KEY>('production');
  const [production, setProduction] = React.useState<Production[]>([]);
  const handleOperation = (
    type: LOCA_KEY,
    productions: Production | Production[]
  ) => {
    if (Array.isArray(productions)) {
      setProduction(productions);
    } else {
      setProduction([{ ...productions }]);
    }
    setTitle(type);
  };
  return (
    <Tabs
      animated
      centered
      tabPosition="top"
      defaultActiveKey={title}
      key={title}
      style={{ width: '100%', height: '100%' }}
      onChange={(key) => {
        setTitle(key as any);
      }}
    >
      <TabPane tab="产品" tabKey="prodction" key="production">
        <div
          className=""
          style={{
            padding: '0 5',
            height: 90 + 'vh',
            overflow: 'auto',
            overflowX: 'hidden',
          }}
        >
          <Production onOperation={handleOperation} title={title} />
        </div>
      </TabPane>
      <TabPane tab="出货" tabKey={'pop_store'} key="pop_store">
        <div
          className=""
          style={{
            padding: '0 5',
            height: 90 + 'vh',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <PopProduction title={title} production={production} />
        </div>
      </TabPane>
      <TabPane tab="入货" tabKey={'push_store'} key="push_store">
        <div
          className=""
          style={{
            padding: '0 5',
            height: 90 + 'vh',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <PushProduction title={title} production={production} />
        </div>
      </TabPane>
    </Tabs>
  );
};

export default SwtichPage;
