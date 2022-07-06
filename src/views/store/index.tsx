import './index.less'
import React from 'react'
import Aside from './Aside'
import Header from './Header'
import { message } from 'antd'
import Content from './Content'
import Production from './production'
import CollapseLayout from '@/views/components/Layouts'

export type ReactKeys = 'production' | 'pop' | 'push' | "store1" | "store2" | 'store3' | 'store4' | "store5" | 'store6' | 'store7' | "store8" | "store_other"

const Launch: React.FC = () => {
  const [collapse, setCollapse] = React.useState(false);
  const [component, setComponent] = React.useState<React.ReactNode>(<Production />)
  const [key, setkey] = React.useState<ReactKeys[]>(['production'])
  const handleCollapse = () => {
    setCollapse(!collapse)
  }
  const handlePopProduction = (productions: Production[]) => {
    setkey(['pop'])
    setComponent('pop')
  }
  const handlePushProduction = (productions: Production[]) => {
    setkey(['push'])
    setComponent('push')
  }
  const handlePageChange = (key: ReactKeys) => {
    setkey([key])
    switch (key) {
      case 'production':
        setComponent(<Production onPushProduction={handlePushProduction} onPopProduction={handlePopProduction} />)
        return
      case 'pop':
        setComponent("pop")
        break
      case 'push':
        setComponent("push")
        break
      case 'store1':
        setComponent("store1")
        break
      case 'store2':
        setComponent("store2")
        break
      case 'store3':
        setComponent("store3")
        break;
      case 'store4':
        setComponent("store4")
        break;
      case 'store5':
        setComponent('store5')
        break;
      case 'store6':
        setComponent('store6')
        break
      case 'store7':
        setComponent('store7')
        break
      case 'store8':
        setComponent('store8')
        break
    }
  }
  const handleLoginOut = () => {
    message.success('待开发....')
  }
  return (
    <CollapseLayout
      collapse={collapse}
      aside={<Aside value={key} switchPage={handlePageChange} />}
      header={<Header onLoginOut={handleLoginOut} onCollapse={handleCollapse} />}
    >
      <Content>
        {component}
      </Content>
    </CollapseLayout>
  );
};

export default Launch;
