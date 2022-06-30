import './index.less'
import Aside from './Aside'
import Header from './Header'
import { message } from 'antd'
import Content from './Content'
import React, { useState } from 'react'
import Production from '../store/production'
import CollapseLayout from '@/views/components/Layouts/collapse.layout'

const getContent = (index: number) => {
  switch (index) {
    case 0:
      return <Production   />
    case 1:
      return '出货';
    case 2:
      return '入货'
    case 3:
      return '一号仓库'
    case 4:
      return '二号仓库'
    case 5:
      return '三号仓库'
    case 6:
      return '四号仓库'
    case 7:
      return '五号仓库'
    case 8:
      return '六号仓库'
    case 9:
      return '七号仓库'
    case 10:
      return '八号仓库'
    case 11:
      return '其他仓库'
  }
}

const Launch: React.FC = () => {
  const [index, setIndex] = useState(0)
  const [collapse, setCollapse] = useState(false);
  const handleCollapse = () => {
    setCollapse(!collapse)
  }
  const handlePageChange = (index: number) => {
    setIndex(index)
  }
  const handleLoginOut = () => {
    message.success('待开发....')
  }
  return (
    <CollapseLayout
      collapse={collapse}
      aside={<Aside onClick={handlePageChange} />}
      header={<Header onLoginOut={handleLoginOut} onCollapse={handleCollapse} />}
    >
      <Content>
        {getContent(index)}
      </Content>
    </CollapseLayout>
  );
};

export default Launch;
