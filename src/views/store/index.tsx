import './index.less'
import React from 'react'
import Aside from './aside'
import Header from './header'
import PushStore from './push'
import { message } from 'antd'
import Content from './content'
import Production from './production'
import { ipcRenderer } from 'electron'
import avatar from '@/assets/avatar.png'
import CollapseLayout from '@/views/components/Layouts'

const handleExit = () => {
  ipcRenderer.send('exit', 0)
}

const Launch: React.FC = () => {
  const [collapse, setCollapse] = React.useState(true);
  const [key, setkey] = React.useState<ReactKeys>(['production'])
  const [chooseProductions, setChooseProductions] = React.useState<Production[]>([])
  const handlePushStore = (productions: Production[]) => {
    setkey(['push'])
    setChooseProductions(productions)
    setComponent(<PushStore chooseProductions={productions} />)
  }
  const handleCollapse = () => {
    setCollapse(!collapse)
  }
  const [component, setComponent] = React.useState<React.ReactNode>(<Production onPushProduction={handlePushStore} setKeys={setkey} />)
  const handleSwitchPage = (key: ReactKeys) => {
    setkey(key)
    const keyWord = key[0]
    switch (keyWord) {
      case 'production':
        setComponent(<Production onPushProduction={handlePushStore} setKeys={setkey} />)
        break;
      case 'push':
        message.info('正在开发中....')
        setComponent(<PushStore chooseProductions={chooseProductions} />)
        break
      default:
        message.info('待开发.....')
        setComponent('')
        break;
    }
  }
  return (
    <CollapseLayout
      collapse={collapse}
      aside={<Aside value={key} switchPage={handleSwitchPage} />}
      header={<Header avatar={avatar} onLoginOut={handleExit} onCollapse={handleCollapse} />}
    >
      <Content>
        {component}
      </Content>
    </CollapseLayout>
  );
};

export default Launch;
