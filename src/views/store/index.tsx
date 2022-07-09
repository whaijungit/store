import './index.less'
import React from 'react'
import Aside from './Aside'
import PopList from './pop'
import Header from './Header'
import Content from './Content'
import Production from './production'
import { ipcRenderer } from 'electron'
import avatar from '../../../public/avatar.png'
import CollapseLayout from '@/views/components/Layouts'

export type ReactKeys = 'production' | 'pop' | 'push' | "store1" | "store2" | 'store3' | 'store4' | "store5" | 'store6' | 'store7' | "store8" | "store_other"

const Launch: React.FC = () => {
  const [collapse, setCollapse] = React.useState(true);
  const [key, setkey] = React.useState<ReactKeys[]>(['production'])
  const [component, setComponent] = React.useState<React.ReactNode>(<Production setKeys={setkey}></Production>)
  const handleCollapse = () => {
    setCollapse(!collapse)
  }
  const handlePopProduction = (productions: Production[]) => {
    setkey(['pop'])
    setComponent(<PopList></PopList>)
  }
  const handlePushStore = (productions: Production[]) => {
    setkey(['push'])
    setComponent('store')
  }
  const handlePageChange = (key: ReactKeys) => {
    setkey([key])
    switch (key) {
      case 'production':
        setComponent(<Production setKeys={setkey} onPushProduction={handlePushStore} onPopProduction={handlePopProduction} />)
        break;
      case 'pop':
        setComponent(<PopList></PopList>)
        break
      case 'push':
        setComponent(<>push</>)
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
    ipcRenderer.send('exit', 0)
  }
  return (
    <CollapseLayout
      collapse={collapse}
      aside={<Aside value={key} switchPage={(key) => {
        handlePageChange(key)
      }} />}
      header={<Header avatar={avatar} onLoginOut={handleLoginOut} onCollapse={handleCollapse} />}
    >
      <Content>
        {component}
      </Content>
    </CollapseLayout>
  );
};

export default Launch;
