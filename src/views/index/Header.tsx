import React from 'react'
import { Avatar, Button, Popconfirm, Space } from 'antd'
import { LoginOutlined, MenuOutlined } from '@ant-design/icons'

interface HeaderProps {
  onCollapse: () => void
  onLoginOut: () => void
  avatar?: string
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="header-container container-center">
      <div className="collapse">
        <Button size='large' onClick={props.onCollapse} icon={<MenuOutlined />} />
      </div>
      <div className="setting">
        <Space>
          <Popconfirm style={{ width: 200 }} placement={'bottom'} title={'确认要退出登录嘛!'} onConfirm={props.onLoginOut} okText="确认" cancelText="取消">
            <Button size='large' icon={<LoginOutlined />} />
          </Popconfirm>
          <Avatar size={'large'} shape='circle' src={'C:\\Users\\whaij\\Pictures\\Saved Pictures\\avatar.jpg'} />
        </Space>
      </div>
    </div>
  )
}

export default Header;